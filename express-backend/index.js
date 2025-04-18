import express from "express";
import cors from "cors";

const app = express();

const port = 8000;

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
const idSet = new Set("xyz789", "abc123", "ppp222", "yat999", "zap555");

app.use(cors());
app.use(express.json());

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
      (user) => user["name"] === name && user["job"] === job
  );
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };

const deleteUser = (userToDelete) => {
  const index = users["users_list"].findIndex(user => user["id"] === userToDelete.id);
  if (index !== -1) {
    users["users_list"].splice(index, 1);
    idSet.delete(userToDelete.id);
    return true;
  }
  return false;
};
  
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    let userId;
    do {
      userId = Math.floor(Math.random() * 1000).toString();
    } while (idSet.has(userId));
    userToAdd.id = userId;
    idSet.add(userId)
    res.status(201).json(addUser(userToAdd))
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});

app.delete("/users", (req, res) => {
  const userToDelete = req.body;
  const wasDeleted = deleteUser(userToDelete);

  if (!wasDeleted) {
    res.status(404).send({ error: "user not found" });
  } else {
    res.status(204).send();
  }
});

// get all users that match a given name and a given job
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined) {
      let result = findUserByNameAndJob(name, job);
      result = { users_list: result };
      res.send(result);
  } else {
      res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});
  
app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});