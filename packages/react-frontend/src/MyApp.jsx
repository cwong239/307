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
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
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