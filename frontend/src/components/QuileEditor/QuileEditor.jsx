import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuileEditor = ({textareaRef,cont,handleInputChange,handleSelection}) => {
    const [values,setValues] = useState("")
    console.log('cont', cont);
    // const hanleSelet = (range, source, editor) => {
    //     console.log('editor', editor);
    //     if (range && range.length > 0) {
    //         const selectedText = editor.getText(range);
    //         const newText = 'Your replacement text'; // Replace with your desired text
      
    //         // Get the content as a Delta object
    //         const delta = editor.getContents();
      
    //         // Modify the Delta to replace the selected text
    //         delta.ops[range.index].insert = newText;
    //         delta.ops[range.index].delete = selectedText.length;
      
    //         // Set the new content and restore the selection
    //         editor.setContents(delta);
    //         editor.setSelection(range.index + newText.length, 0);
    //       }
    // }
  return (
    <ReactQuill ref={textareaRef} theme="snow" value={cont} onChange={handleInputChange} onChangeSelection={hanleSelet}  />
  )
}

export default QuileEditor