import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import request from "./services/requestline";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [newNotif, setNewNotif] = useState(null);

  const hook = () => {
    request.getAll().then((originalState) => {
      setPersons(originalState);
    });
  };

  useEffect(hook, []);

  const handleClick = (id, name) => {
    const result = window.confirm(`Delete ${name}?`);
    if (result === true) {
      request.deletePerson(id).then((dedata) => {
        const postDelete = persons.filter((person) => person.id !== id);
        setPersons(postDelete);
        setNewNotif(`${name} has been deleted from the phonebook`);
        setTimeout(() => {
          setNewNotif(null);
        }, 4000);
      });
    }
  };

  const addName = (event) => {
    event.preventDefault();

    // Declaring object whose text will be equal to whats written on the form
    const personObject = {
      name: newName,
      number: newNumber,
    };

    // If the object already exists, send an alert, else add it to the Numbers list.
    if (
      persons.some((person) => person.name === personObject.name) &&
      persons.some((person) => person.number === personObject.number)
    ) {
      window.alert(
        `${personObject.name} and ${personObject.number} are already added to phonebook`
      );
      setNewName("");
      setNewNumber("");
    } else if (
      persons.some(
        (person) =>
          person.name.toUpperCase() === personObject.name.toUpperCase()
      )
    ) {
      const targetindex = persons.findIndex(
        (person) =>
          person.name.toUpperCase() === personObject.name.toUpperCase()
      );
      const personNameInArray = persons.find(
        (person) =>
          person.name.toUpperCase() === personObject.name.toUpperCase()
      );
      const idofName = personNameInArray.id;
      const nameofName = personNameInArray.name;
      const confirmation = window.confirm(
        `${personObject.name} is already added to the phonebook, do you want to replace the old number with a new one?`
      );
      if (confirmation === true) {
        request.replacePerson(idofName, nameofName, personObject.number);
        const newState1 = persons.map((person, index) => {
          if (index === targetindex) {
            person.number = personObject.number;
            return person;
          } else {
            return person;
          }
        });
        setPersons(newState1);
        setNewName("");
        setNewNumber("");
        setNewNotif(
          `${nameofName}'s number has been updated to ${personObject.number}`
        );
        setTimeout(() => {
          setNewNotif(null);
        }, 4000);
      }
    } else if (
      persons.some((person) => person.number === personObject.number)
    ) {
      const targetindex = persons.findIndex(
        (person) => person.number === personObject.number
      );
      const personNumberInArray = persons.find(
        (person) => person.number === personObject.number
      );
      const idofNumber = personNumberInArray.id;
      const numberofNumber = personNumberInArray.number;
      const confirmation1 = window.confirm(
        `${personObject.number} is already added to the phonebook, do you want to replace the old name with a new one?`
      );
      if (confirmation1 === true) {
        request.replacePerson(idofNumber, personObject.name, numberofNumber);
        const newState2 = persons.map((person, index) => {
          if (index === targetindex) {
            person.name = personObject.name;
            return person;
          } else {
            return person;
          }
        });
        setPersons(newState2);
        setNewNumber("");
        setNewName("");
        setNewNotif(
          `${personNumberInArray.number}'s contact name has been updated to ${personObject.name}`
        );
        setTimeout(() => {
          setNewNotif(null);
        }, 4000);
      }
    } else {
      request.addPerson(personObject).then((newData) => {
        setPersons(persons.concat(newData));
        setNewName("");
        setNewNumber("");
        setNewNotif(`${personObject.name} has been added to the phonebook`);
        setTimeout(() => {
          setNewNotif(null);
        }, 3000);
      });
    }
  };

  // newName will be equal to whatever is written in the form
  const handleInput = (event) => {
    setNewName(event.target.value);
  };

  // newNumber will be equal to whatever is written in the form

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  // newFilter will be equal to whatever is written in the form
  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div className="divposition">
      <Notification message={newNotif} />
      <h1 className="logo">Phonebook</h1>
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <PersonForm
        addName={addName}
        newName={newName}
        handleInput={handleInput}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <div className="grid">
      <Persons
        persons={persons}
        newFilter={newFilter}
        handleClick={handleClick}
      />
      </div>
      <form action="https://github.com/verajs" method="get" target="_blank">
      <button className="footerbutton"> made by @verajs for FullStackOpen</button>
      </form>
    </div>
  );
};

export default App;
