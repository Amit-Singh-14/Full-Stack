// import notes from "./Note";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Note from "./components/Note";
import CreateArea from "./components/CreateAera";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  const handleSubmit = (title, content) => {
    const addItem = {
      title: title,
      content: content,
    };
    setNotes((prev) => {
      return [...prev, addItem];
    });
  };
  const handleDelete = (id) => {
    setNotes((prev) => {
      return prev.filter((value, index) => {
        return index !== id;
      });
    });
  };

  return (
    <>
      <Header />
      <CreateArea
        notes={notes}
        setNotes={setNotes}
        handleSubmit={handleSubmit}
      />
      {notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            handleDelete={handleDelete}
          />
        );
      })}
      <Footer />
    </>
  );
}

export default App;
