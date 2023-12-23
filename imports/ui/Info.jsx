import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect, Suspense, lazy, use } from 'react';

const Navigation = lazy(() => import('./Navigation'));

const Info = () => {
  const { links } = use(Meteor.callAsync('getLinks'));

  return (
    <>
      <Suspense fallback={<div>Nav Suspense Loading...</div>}>
        <Navigation />
      </Suspense>
      <div>
        <h2>Learn Meteor!</h2>
        {links?.length && <ul>{links.map(
          link => <li key={link._id}>
            <a href={link.url} target="_blank">{link.title}</a>
          </li>
        )}</ul>}
      </div>
    </>
  );
};

export default Info;