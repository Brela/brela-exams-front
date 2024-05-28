import { useEffect, useState } from "react";
import { getLetterOption } from "./utils";
import { Stats } from "../Home";

const test1 = [
  {
    question:
      "What rare mineral in Minecraft is used primarily for crafting tools and armor?",
    options: ["Iron", "Gold", "Diamond", "Coal"],
    answerIndex: 2,
  },
  {
    question:
      "Which creature in the game can explode, potentially causing great damage to players and structures?",
    options: ["Zombie", "Creeper", "Enderman", "Skeleton"],
    answerIndex: 1,
  },
  {
    question:
      "What fictional dimension can players access via a portal in Minecraft?",
    options: ["The Overworld", "The End", "The Nether", "Skylands"],
    answerIndex: 2,
  },
  {
    question: "Which tool is required to mine diamonds?",
    options: [
      "Wooden Pickaxe",
      "Stone Pickaxe",
      "Iron Pickaxe",
      "Gold Pickaxe",
    ],
    answerIndex: 2,
  },
  {
    question: "What do players need to make to sleep through the night?",
    options: ["Table", "Chair", "Bed", "Tent"],
    answerIndex: 2,
  },
  {
    question: "What can you use to safely harvest beehives and bee nests?",
    options: ["Shears", "Sword", "Campfire", "Axe"],
    answerIndex: 2,
  },
  {
    question: "Which item is used to cure a zombie villager?",
    options: ["Golden Carrot", "Potion of Weakness", "Golden Apple", "Milk"],
    answerIndex: 1,
  },
  {
    question: "What animal in Minecraft provides wool?",
    options: ["Cow", "Chicken", "Sheep", "Pig"],
    answerIndex: 2,
  },
  {
    question: "Which enchantment increases mining speed?",
    options: ["Efficiency", "Fortune", "Unbreaking", "Sharpness"],
    answerIndex: 0,
  },
  {
    question: "Which plant-based food source can be used to breed chickens?",
    options: ["Wheat", "Carrots", "Seeds", "Potatoes"],
    answerIndex: 2,
  },
];

const Test = ({ closeTest }: { closeTest: (stats: Stats) => void }) => {
  const [currentQuestIdx, setCurrentQuestIdx] = useState(0);
  const [currentQuest, setCurrentQuest] = useState(test1[currentQuestIdx]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const handleOptionClick = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === currentQuest.options[currentQuest.answerIndex]) {
      setScore((prev) => prev + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  useEffect(() => {
    setCurrentQuest(test1[currentQuestIdx]);
  }, [currentQuestIdx]);
  return (
    <>
      <section className="game-section">
        <div>
          <h4>{currentQuest.question}</h4>
          <div className="answer-options">
            {currentQuest.options.map((option, index) => (
              <div
                key={index}
                className={`answer-option ${
                  selectedAnswer === option
                    ? isCorrect
                      ? "correct"
                      : "wrong"
                    : ""
                }`}
                onClick={() => {
                  // if its correct already, don't allow a select
                  if (!isCorrect) {
                    handleOptionClick(option);
                  }
                }}
              >
                <div>{`${getLetterOption(index)})`}</div>
                <div>{option}</div>
              </div>
            ))}
          </div>
        </div>
        {selectedAnswer ? (
          isCorrect ? (
            <div className="display-correct-or-wrong">Correct!</div>
          ) : null
        ) : null}

        <section className="prev-next-buttons-section">
          <button
            className={currentQuestIdx === 0 ? "prev-button-hidden" : ""}
            onClick={() => {
              setSelectedAnswer(null);
              setIsCorrect(false);
              setCurrentQuestIdx((prevVal) => prevVal - 1);
            }}
          >
            Previous
          </button>
          {test1.length - 1 === currentQuestIdx ? (
            <button
              onClick={() => {
                setSelectedAnswer(null);
                setIsCorrect(false);
                closeTest({ score: score, numOfQuestions: test1.length });
              }}
            >
              Finish Test
            </button>
          ) : (
            <button
              onClick={() => {
                setSelectedAnswer(null);
                setIsCorrect(false);
                setCurrentQuestIdx((prevVal) => prevVal + 1);
              }}
            >
              Next
            </button>
          )}
        </section>
      </section>
      {/*  <div
        className="unstyled-button"
        onClick={() =>
          closeTest({ score: score, numOfQuestions: test1.length })
        }
      >
        Close Test
      </div> */}
    </>
  );
};

export default Test;
