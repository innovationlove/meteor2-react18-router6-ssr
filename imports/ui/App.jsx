import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Info = lazy(() => import('./Info'));
const Hello = lazy(() => import('./Hello'));

const Body = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <Suspense fallback={<div>Suspense Loading...</div>}>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/links" element={<Info />} />
      </Routes>
    </Suspense>
  </div>
)

export const App = () => {
  if (Meteor.isClient) {
    return (
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  }

  return <Body />;
}
