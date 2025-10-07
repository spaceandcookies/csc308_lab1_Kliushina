import express from "express";
import cors from "cors";


const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());


const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};


app.get("/", (req, res) => {
  res.send("Hello World! My name is space_and_cookies!");
});


app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
   if (name === undefined && job === undefined) {
    res.send(users);
   } else {
    let result = findUsersByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
   }
});


const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);


const findUsersByNameAndJob = (name, job) => {
  return users["users_list"].filter((user) => {
    return (
      (name === undefined || user.name === name) &&
      (job === undefined || user.job === job)
    );
  });
};


app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});


const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};


app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = generateId();
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});


function generateId() {
  var result = '';
  var chars = 'abcdefghijklmnopqrstuvwxyz';
  for (var i = 0; i < 3; i++){
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }


  const numbers = Math.floor(Math.random() * 900 + 100); //looked up --> random*900 gives range of 0-900 and adding 100 shifts it to produce 100-999
  return result + numbers;
}


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

const deleteUserById = (id) => {
  const index = users["users_list"].findIndex((user) => user.id === id);
  if (index !== -1) {
    users["users_list"].splice(index, 1); // remove 1 item at index
    return true;
  }
  return false;
};

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const success = deleteUserById(id);
  if (success) {
    res.status(204).send(); // 204 No Content
  } else {
    res.status(404).send({ message: "User not found" });
  }
});
