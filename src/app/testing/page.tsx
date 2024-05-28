'use client';

import './home.css';
import { useState } from 'react';
import { Button } from '@mantine/core';
import TestTaking from './TestTaking/Test';
import './TestTaking/test.css';

export type Stats = {
  score: number;
  numOfQuestions: number;
};

function Home() {
  const [testInProgress, setTestInProgress] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);
  const closeTest = (stats: Stats) => {
    setTestInProgress(false);

    if (stats) {
      const percentage = (100 / stats.numOfQuestions) * stats.score;
      setCalculatedScore(percentage);
    }
  };

  return (
    <>
      <div className="home-container">
        <>
          <h2>{`Breland's Guessing Game`}</h2>
          {testInProgress ? (
            <TestTaking closeTest={closeTest} />
          ) : (
            <Button
              onClick={() => {
                setTestInProgress(true);
                setCalculatedScore(null);
              }}
            >
              start test
            </Button>
          )}
          {calculatedScore && (
            <div>{`You scored ${calculatedScore}% of questions correct! Great job!`}</div>
          )}
        </>
      </div>
    </>
  );
}

export default Home;
