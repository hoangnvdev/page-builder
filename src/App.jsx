import React from "react";

import { useSelector } from "react-redux";

import { Editor } from "./components/Editor";
import { TemplateGallery } from "./components/TemplateGallery";

function App() {
  const mode = useSelector((state) => state.builder.mode);

  return (
    <>
      {mode === "gallery" && <TemplateGallery />}
      {mode === "editor" && <Editor />}
    </>
  );
}

export default App;
