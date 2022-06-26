import Number from "./Number";
import React from "react";

const Persons = ({ persons, newFilter, handleClick }) => {
  if (newFilter !== "") {
    const newpersons = persons.filter((person) =>
      person.name.toUpperCase().includes(newFilter.toUpperCase())
    );
    return newpersons.map((person) => (
      <Number key={person.name} person={person} handleClick={handleClick} />
    ));
  } else {
    return persons.map((person) => (
      <Number key={person.name} person={person} handleClick={handleClick} />
    ));
  }
};

export default Persons;
