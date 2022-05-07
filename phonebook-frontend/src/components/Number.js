import React from "react";

const Number = ({ person, handleClick }) => {
  return (
    <div>
      <table className="numberstable">
      <tr>
      <td>{person.name}</td>
      </tr> 
      <tr>
      <td>{person.number}</td>
      </tr>
      <button onClick={() => handleClick(person.id, person.name)}>
        remove
      </button>
      </table>
    </div>
  );
};

export default Number;
