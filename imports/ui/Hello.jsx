import React, { useState, Suspense, lazy } from 'react';

const Navigation = lazy(() => import('./Navigation'));

const Hello = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <>
      <Suspense fallback={<div>Suspense Loading...</div>}>
        <Navigation />
      </Suspense>
      <div>
        <button onClick={increment}>Click Me</button>
        <p>You've pressed the button {counter} times.</p>
      </div>
    </>
  );
};

export default Hello;