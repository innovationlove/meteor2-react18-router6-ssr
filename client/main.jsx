import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { App } from '/imports/ui/App';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = hydrateRoot(container, <App />);
});
