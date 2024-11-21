import React, { useState, useRef, useEffect } from "react";
// import "./styles.css"; // Import your CSS file
import useContent from "../hooks/useContent";

const Grammerly = () => {
  const [text, setText] = useState(""); // State for editor text
  const [suggestions, setSuggestions] = useState([]); // State for suggestions
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
  const [positions1, sePositions1] = useState("0px");
  const [positon2, setPositioin2] = useState("0px");
  const textAreaRef = useRef(null); // Ref for text area element
  const [textSelected, setTextSelected] = useState("");
  const [savedRange, setSavedRange] = useState(null);

  const {searchContent, loading,content} = useContent()

  const handleTextChange = (event) => {
    const contentEditableDiv = textAreaRef.current;
    console.log('contentEditable', contentEditableDiv)
    console.log('event', event.target)
    // setText(event.target)
  };
  
  // console.log('text', text)

  const handleSelect = () => {
    const selection = window.getSelection();
    console.log("selection teeel", selection.toString());
    // setTextSelected(selection.toString());
  };

  const handleSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (!selectedText.trim()) {
      setDropdownVisible(false);
      return;
    }
    setTextSelected(selectedText)
    // Save the range and store it in state
    const range = saveSelection();
    setSavedRange(range);

    const textarea = textAreaRef.current;
    textarea.focus();
    const rect = selection.getRangeAt(0).getBoundingClientRect();
    console.log('rect', rect)

    sePositions1(`${rect.bottom}px`);
    setPositioin2(`${rect.left}px`);
    // setSuggestions(["Iphone", "Android"]); // Replace with your actual suggestion logic

    // setDropdownVisible(true);
  };

  // Helper to save the selection range
  const saveSelection = () => {
    const selection = window.getSelection();
    console.log("selection.getRangeAt(0", selection.getRangeAt(0));
    if (selection.rangeCount > 0) {
      return selection.getRangeAt(0);
    }
    return null;
  };

  // Helper to restore the selection range
  const restoreSelection = (range) => {
    console.log("range", range);
    if (range) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  // Helper to set caret at the end of the node
  const setCaretAtEnd = (node) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStartAfter(node);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  };
  
  const searchRewrite = async() => {
    setDropdownVisible(true);
   await searchContent(textSelected,"/api/grammer-correction/rephrase")
    // setSuggestions(["Iphone", "Android"]); // Replace with your actual suggestion logic
    
  }

  const handleSuggestionClick = (event, suggestion) => {
    event.preventDefault();
    event.stopPropagation();

    if (!savedRange) return;

    const contentEditableDiv = textAreaRef.current;
    contentEditableDiv.focus();

    // Restore the saved selection
    restoreSelection(savedRange);

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    // Delete the selected text
    range.deleteContents();

    // Create a text node with the suggestion
    const textNode = document.createTextNode(suggestion);
    range.insertNode(textNode);

    // Move the caret to the end of the inserted text
    range.setStartAfter(textNode);
    range.collapse(true);

    // Clear the selection range and update it
    selection.removeAllRanges();
    selection.addRange(range);

    // Set the caret position after the inserted text
    setCaretAtEnd(textNode);
    // Update the state to reflect the changes in the contentEditable div
    setText(contentEditableDiv.innerHTML);

    // Hide the dropdown
    setDropdownVisible(false);
  };

console.log('content', content)
  // const handleOutsideClick = (event) => {
  //   if (!textAreaRef.current.contains(event.target) && dropdownVisible) {
  //     setDropdownVisible(false);
  //   }
  // };
  useEffect((e) => {
    // handleSelection(e);
    const elements = document.querySelectorAll("#text-editor");
    elements.forEach((element) => {
      element.addEventListener("mouseup", handleSelection);
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener("mouseup", handleSelection);
      });
    };
  }, []);

  return (
    <>
      <div className="toolbar">
        <div className="p-4 flex flex-wrap gap-2 text-white">
          <button onClick={searchRewrite} className="btn flex items-center">
            <i className="ri-magic-line mr-1" /> Rewrite
          </button>
          <button className="btn flex items-center">
            <i className="ri-file-text-line mr-1" /> Formal
          </button>
          <button className="btn flex items-center">
            <i className="ri-chat-smile-2-line mr-1" /> Casual
          </button>
          <button className="btn flex items-center">
            <i className="ri-arrow-left-right-line mr-1" /> Expand
          </button>
          <button className="btn flex items-center">
            <i className="ri-arrow-left-right-line mr-1" /> Shorten
          </button>
          <button className="btn flex items-center">
            <i className="ri-link" />
          </button>
          <button className="btn flex items-center">
            <i className="ri-quill-pen-line mr-1" /> Continue writing
          </button>
          <button className="btn flex items-center">
            <i className="ri-more-fill" />
          </button>
          <button className="btn flex items-center ml-auto">
            <i className="ri-sun-line" />
          </button>
        </div>
      </div>
      <div id="editor-container" className="flex flex-col">
        <div
          id="text-editor"
          ref={textAreaRef}
          className="flex-grow p-4 bg-white"
          contentEditable
          suppressContentEditableWarning={true}
          data-placeholder="Write/paste your text here, or generate with AI"
          onInput={handleTextChange} // Use onInput instead of onChange for contentEditable
          onSelect={handleSelect}
          dangerouslySetInnerHTML={{ __html: text }} // Render HTML correctly
          // onKeyDown={handleKeyDown}
          
        >
          {/* {text} */}
        </div>
        {dropdownVisible && (
          <div
            style={{ position: "absolute", left: positon2, top: positions1 }}
            id="suggestion-dropdown"
            className="dropdown"
          >
            {/* Display suggestions here */}
            {loading?
            <div
            className="suggestion"
          >
            Loading ....
          </div>
            :content?.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion"
                onClick={(e) => handleSuggestionClick(e, suggestion.text)}
              >
                {suggestion.text}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bottom-toolbar">
        <>
          {/* Bottom Toolbar */}
          <div className="p-4 flex items-center text-black">
            <button className="mr-4">
              <i className="ri-h-1" />
            </button>
            <button className="mr-4">
              <i className="ri-h-2" />
            </button>
            <button className="mr-4">
              <i className="ri-h-3" />
            </button>
            <button className="mr-4">
              <i className="ri-list-unordered" />
            </button>
            <button className="mr-4">
              <i className="ri-list-ordered" />
            </button>
            <button className="mr-4">
              <i className="ri-quotation-left" />
            </button>
            <button className="mr-4">
              <i className="ri-bold" />
            </button>
            <button className="mr-4">
              <i className="ri-italic" />
            </button>
            <button className="mr-4">
              <i className="ri-underline" />
            </button>
            <button className="mr-4">
              <i className="ri-font-size" />
            </button>
            <div className="ml-auto flex items-center">
              <button className="mr-2">
                <i className="ri-arrow-go-back-line" />
              </button>
              <button className="mr-2">
                <i className="ri-arrow-go-forward-line" />
              </button>
              <span className="text-sm">0 Words</span>
              <button className="ml-2">
                <i className="ri-arrow-down-s-line" />
              </button>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default Grammerly;
