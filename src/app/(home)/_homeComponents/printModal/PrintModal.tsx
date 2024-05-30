import { Modal, Button, Box } from '@mantine/core';
import { FC, useEffect } from 'react';
import { Question } from '@/types';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
}

const PrintModal: FC<PrintModalProps> = ({ isOpen, onClose, questions }) => {
  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const questionElements = document.querySelectorAll('.question');
    questionElements.forEach((el, index) => {
      if ((index + 1) % 4 === 0) {
        el.classList.add('page-break');
      }
    });
  }, [questions]);

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Print Questions"
      size="xl"
      className="printable-content"
    >
      <Box className="questions">
        {questions.map((question, index) => (
          <div key={index} className="question pb-5">
            <p>{question.question}</p>
            <div className="options">
              {question.options.map((option, i) => (
                <p key={i}>{option}</p>
              ))}
            </div>
          </div>
        ))}
      </Box>
      <div className="page-break" />
      <Box className="answers">
        <h2>Answer Key</h2>
        {questions.map((question, index) => (
          <div key={index} className="answer">
            <p>
              <strong>Question {index + 1}:</strong> {question.answer}
            </p>
          </div>
        ))}
      </Box>
      <Button onClick={handlePrint} className="no-print">
        Confirm and Print
      </Button>
    </Modal>
  );
};

export default PrintModal;
