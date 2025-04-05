// src/MyApp.jsx
import React, { useState } from "react";
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