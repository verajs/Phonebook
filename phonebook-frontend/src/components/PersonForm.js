import React from "react";

const PersonForm = ({
  addName,
  newName,
  handleInput,
  newNumber,
  handleNumber,
}) => {
  return (
    <div>
      <h2>add a new:</h2>
      <div className="formtable">
        <form
          // This onSubmit handles what happens when the person clicks the button (type="submit")
          onSubmit={addName}
        >
          <tr>
            <td>
              name
              <input
                // Value is whats inside the form, in this case its empty.
                value={newName}
                // Whenever it changes we want to change newName
                onChange={handleInput}
              />
            </td>
          </tr>

          <tr>
            <td>
              number
              <input value={newNumber} onChange={handleNumber} />
            </td>
          </tr>

          <tr>
            <td>
              <button className="formbutton" type="submit">
                submit
              </button>
            </td>
          </tr>
        </form>
      </div>
    </div>
  );
};

export default PersonForm;
