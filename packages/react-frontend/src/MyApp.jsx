// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table"
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );


  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function updateList(person) { 
    postUser(person)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          throw new Error("Failed to create user");
        }
      })

      .then((newUser) => setCharacters([...characters, newUser]))
      .catch((error) => {
        console.log(error);
      })
  }

  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" })
    .then((res) => {
      if (res.status === 204){
        setCharacters(characters.filter((character) => character.id !== id));
      } else if (res.status === 404) {
        console.log("User not found");
      }
    })
    .catch((error) => {
      console.log("Error deleting user:", error);
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