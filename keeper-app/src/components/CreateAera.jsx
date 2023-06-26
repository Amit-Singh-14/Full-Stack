import React, { useState } from "react";

function CreateArea({ handleSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [edit, setEdit] = useState(false);

  const expand = () => {
    setEdit(true);
  };
  return (
    <div>
      <form>
        {edit && (
          <input
            name="title"
            placeholder="Title"
            autoFocus={edit}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        )}
        <textarea
          name="content"
          placeholder="Take a note..."
          rows={edit ? 3 : 1}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          onClick={expand}
        />
        <button
          style={{ display: !edit && "none" }}
          onClick={(e) => {
            handleSubmit(title, content);
            setTitle("");
            setContent("");
            e.preventDefault();
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
