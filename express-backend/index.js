import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));


const app = express();

const port = 8000;

app.use(cors());
app.use(express.json());

const findUserByName = (name) => {
    return userService.findUserByName(name);
};

const getUsers = (name, job) => {
  return userService.getUsers(name, job);
};

const findUserById = (id) => {
  return userService.findUserById(id);
}

const addUser = (user) => {
  return userService.addUser(user);
  };

const findUserByJob = (job) => {
  return userService.findUserByJob(job);
}

const findUserByNameAndJob = (name, job) => {
  return userService.findUserByNameAndJob(name, job);
};

const deleteUser = (userToDelete) => {
  console.log(userToDelete._id);
  const t = userService.deleteUserById(userToDelete._id);
  console.log(t);
  return t;
};
  
app.post("/users", async (req, res) => {
  const userToAdd = req.body;
  console.log('Received user to add:', userToAdd);

  try {
    const addedUser = await addUser(userToAdd);
    const userWithMongoId = {
      ...addedUser.toObject()
    };

    res.status(201).json(userWithMongoId);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.get("/users", async (req, res) => {
    const name = req.query.name;
    const job = req.query.job
    try {
      const users = await getUsers(name, job);
      res.send({ users_list: users });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Internal server error" });
    } 
});

app.delete("/users", async (req, res) => { 
  const userToDelete = req.body;
  try{
    const wasDeleted = await deleteUser(userToDelete);
  } catch (err){
    console.error(err)
    res.status(500).send({ error: "Internal server error" });
  }
});

app.get("/users/:id", (req, res) => {
    const id = req.params._id; 
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