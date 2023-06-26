import React from "react";

function Note({ title, content, id, handleDelete }) {
  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button
        onClick={(e) => {
          handleDelete(id);
          e.preventDefault();
        }}
      >
        DELETE
      </button>
    </div>
  );
}

export default Note;
