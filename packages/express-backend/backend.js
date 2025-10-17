import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userService from "./user-services.js";

const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World! My name is space_and_cookies!");
});


app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userService
    .getUsers(name, job)
    .then((users) => res.send({ users_list: users }))
    .catch((error) => res.status(500).send({ error: error.message }));
});


app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  userService
    .findUserById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "User not found" });
      } else {
        res.send(user);
      }
    })
    .catch((error) => res.status(500).send({ error: error.message }));
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userService
    .addUser(userToAdd)
    .then((user) => res.status(201).send(user))
    .catch((error) => res.status(400).send({ error: error.message }));
});

app.listen(port, () => {
  console.log(
    `Server listening at http://localhost:${port}`
  );
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  userService
    .deleteUserById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({ message: "User not found" });
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => res.status(500).send({ error: error.message }));
});