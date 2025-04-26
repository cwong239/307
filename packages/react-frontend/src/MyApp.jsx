// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
  
function MyApp() {

  // creates a blank state that will be filled over user input
  const [characters, setCharacters] = useState([]);

  // updates the above state when given a user input
  function updateList(person) {
    setCharacters([...characters, person]);
  }

  // removes a character from the state dependant on the user input
    // the index refers to the location of the 'delete button' on the table, and that character will be removed
  function removeOneCharacter(index) {
    const userToDelete = characters[index];
    deleteUser(userToDelete._id)
      .then((res) => {
        if (res.status !== 204) {
          throw new Error("Failed to delete user");
        }
        return fetchUsers();
      })
      .then(res => res.json())
      .then(data => {
        setCharacters(data["users_list"]);
      });
  }

  function deleteUser(userId){
    return fetch("http://localhost:8000/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: userId }),
    });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    });
  
    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then(res => {
        if (res.status !== 201){ throw new Error("Not 201")}
        else { return res.json()}
      })
      .then((person) => setCharacters([...characters, person]))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}
  

export default MyApp;