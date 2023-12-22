import { Meteor } from 'meteor/meteor';
import { onPageLoad } from "meteor/server-render";

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import { LinksCollection } from '/imports/api/links';
import { App } from '../imports/ui/App';

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
  if (await LinksCollection.find().countAsync() === 0) {
    await insertLink({
      title: 'Do the Tutorial',
      url: 'https://react-tutorial.meteor.com/simple-todos/01-creating-app.html',
    });

    await insertLink({
      title: 'Follow the Guide',
      url: 'https://guide.meteor.com',
    });

    await insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
    });

    await insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com',
    });
  }

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("links", function () {
    return LinksCollection.find();
  });

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Methods
  Meteor.methods({
    async getLinks() {
      await sleep(1000);
      return { links: LinksCollection.find().fetch() };
    }
  });

  // Server Render
  onPageLoad((sink) => {
    const Content = (
      <StaticRouter location={sink.request.url}>
        <App />
      </StaticRouter>
    );

    sink.renderIntoElementById(
      "react-target",
      renderToString(Content)
    );
  });
});
