import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect, Suspense, lazy } from 'react';

const Navigation = lazy(() => import('./Navigation'));

const Info = () => {
  const [links, setLinks] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLinks =  () => Meteor.call('getLinks', null, (error, result) => {
    if (error) {
      alert(error);
    } else if (result?.links) {
      setLinks(result.links);
      setLoading(false);
    }
  })

  useEffect(() => { getLinks(); }, []);

  return (
    <>
      <Suspense fallback={<div>Suspense Loading...</div>}>
        <Navigation />
      </Suspense>
      <div>
        <h2>Learn Meteor!</h2>
        {loading && "Loading links..."}
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