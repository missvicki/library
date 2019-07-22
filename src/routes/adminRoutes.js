const express = require("express");
const { MongoClient } = require("mongodb");
const debug = require("debug")("app:adminRoutes");

const adminRouter = express.Router();
const books = [
  {
    title: "War and Peace",
    genre: "Historical Fiction",
    author: "Leo Nikolayevich Tolstoy",
    bookId: 656,
    read: false
  },
  {
    title: "Les Miserables",
    genre: "Historical Fiction",
    author: "Victor Hugo",
    bookId: 24280,
    read: false
  },
  {
    title: "The Time Machine",
    genre: "Science Fiction",
    author: "H. G. Wells",
    bookId: 2493,
    read: false
  },
  {
    title: "A journey into the Center of the Earth",
    genre: "Science Fiction",
    author: "Jules Verne",
    bookId: 8200488,
    read: false
  },
  {
    title: "A Tale of Two Cities",
    genre: "HIstoric Fiction",
    author: "Charles Dickens",
    bookId: 16258,
    read: false
  },
  {
    title: "Life on the Mississippi",
    genre: "History",
    author: "Mark Twain",
    bookId: 99152,
    read: false
  },
  {
    title: "The Wind in the Willows",
    genre: "Fantasy",
    author: "Kenneth Grahame",
    bookId: 5659,
    read: false
  },
  {
    title: "Childhood",
    genre: "Biography",
    author: "Leo Nikolayevich Tolstoy",
    bookId: 2359878,
    read: false
  }
];

function router(nav) {
  adminRouter.route("/").get((req, res) => {
    const url = "mongodb://localhost:27017";
    const dbName = "libraryApp";

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("Connected correctly to the server");

        const db = client.db(dbName);
        const response = await db.collection("books").insertMany(books);
        res.json(response);
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    })();
  });
  return adminRouter;
}
module.exports = router;
