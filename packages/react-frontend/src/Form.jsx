// src/Form.jsx
import React, { useState } from "react";

function Form(props) {
  // creates a blank state to be later filled with variables from the user
  const [person, setPerson] = useState({
    name: "",
    job: ""
  });

  // hanles the user inputs--the user will input variables that changes the state
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "job")
      setPerson({ name: person["name"], job: value });
    else setPerson({ name: value, job: person["job"] });
  }

  // when the user clicks the submitForm, the state of the main table will be changed and the local state here will be reset
  function submitForm() {
    props.handleSubmit(person);
    setPerson({ name: "", job: "" });
  }
  

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange}
      />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}

export default Form;