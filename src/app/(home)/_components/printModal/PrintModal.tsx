import { Modal, Button, Box, Notification } from '@mantine/core';
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
            <div>{question.question}</div>
            <div className="options">
              {question.options.map((option, i) => (
                <div key={i}>{option}</div>
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
            <div>
              <strong>Question {index + 1}:</strong> {question.answer}
            </div>
          </div>
        ))}
      </Box>
      <Notification title="Warning" color="orange" className="py-3 my-5" withCloseButton={false}>
        This Print Feature Needs Work, Check back soon to make use of it!
      </Notification>
      <Button onClick={handlePrint} className="no-print">
        Confirm and Print
      </Button>
    </Modal>
  );
};

export default PrintModal;
