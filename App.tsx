import * as React from 'react';
import './style.css';

declare const ml5: any;

const DATA = [
  { a: 0, b: 0, output: 0 },
  { a: 1, b: 0, output: 1 },
  { a: 0, b: 1, output: 1 },
  { a: 1, b: 1, output: 0 },
];

const OPTIONS = {
  task: 'regression', // classification regression
  debug: true,
  inputs: 2,
  outputs: 1,
  learningRate: 0.25,
};

const NN = ml5.neuralNetwork(OPTIONS);

DATA.forEach((item) => {
  NN.addData([item.a, item.b], [item.output]);
});

export default function App() {
  function train() {
    const trainingOptions = {
      epochs: 50,
      // batchSize: 1,
      // shuffle: true,
    };
    NN.normalizeData()
    NN.train(trainingOptions, () => {
      console.log('trainedd');
    });
  }

  const test = React.useCallback(({ a, b }) => {
    NN.predict([a, b], handleResults);
  }, []);

  const handleResults = React.useCallback((error, result) => {
    // console.log(error, result);
    console.log(result)
    if (result) {
      console.log(result[0][0]);
    }
  }, []);

  return (
    <React.Fragment>
      <button onClick={train}>train</button>
      <button
        onClick={() => {
          test({ a: 0, b: 0 });
        }}
      >
        0, 0
      </button>
      <button
        onClick={() => {
          test({ a: 1, b: 0 });
        }}
      >
        1, 0
      </button>
      <button
        onClick={() => {
          test({ a: 0, b: 1 });
        }}
      >
        0, 1
      </button>
      <button
        onClick={() => {
          test({ a: 1, b: 1 });
        }}
      >
        1, 1
      </button>
    </React.Fragment>
  );
}
