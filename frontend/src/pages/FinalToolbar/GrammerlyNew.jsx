import React, { useEffect, useRef, useState } from "react";
import useContent from "../../hooks/useContent";
import toast from "react-hot-toast";

const GrammerlyNew = () => {
  const [text, setText] = useState(""); // State for editor text
  const [countText,setCountText] = useState(0)
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [positions1, sePositions1] = useState("0px");
  const [positon2, setPositioin2] = useState("0px");
  const textAreaRef = useRef(null); // Ref for text area element
  const [textSelected, setTextSelected] = useState("");
  const [savedRange, setSavedRange] = useState(null);

  const [actionButon, setActionButton] = useState("rewrite");

  const [suggestions, setSuggestions] = useState([]);
  const { searchContent, loading, content,setContent } = useContent();

  const handleSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    setContent([]);
    if (!selectedText.trim()) {
      setDropdownVisible(false);
      setTextSelected("");
      return;
    }
    setTextSelected(selectedText);
    // Save the range and store it in state
    const range = saveSelection();
    setSavedRange(range);

    const textarea = textAreaRef.current;
    textarea.focus();
    const rect = selection.getRangeAt(0).getBoundingClientRect();
    // console.log('rect', rect)
    sePositions1(`${rect.bottom}px`);
    setPositioin2(`${rect.left}px`);
    // setSuggestions(["Iphone", "Android"]); // Replace with your actual suggestion logic

    setDropdownVisible(true);
  };

  const handleTextChange = (event) => {
    const contentEditableDiv = textAreaRef.current;
    // console.log("contentEditable", contentEditableDiv.innerText);
    // console.log("event", event.target.innerText);
    setCountText(contentEditableDiv.innerText)
    // setText(event.target)
  };

  // Helper to save the selection range
  const saveSelection = () => {
    const selection = window.getSelection();
    // console.log("selection.getRangeAt(0", selection.getRangeAt(0));
    if (selection.rangeCount > 0) {
      return selection.getRangeAt(0);
    }
    return null;
  };

  // Helper to restore the selection range
  const restoreSelection = (range) => {
    // console.log("range", range);
    if (range) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  // Helper to set caret at the end of the node
  const setCaretAtEnd = (node) => {
    const selection = window.getSelection();
    // console.log('node', node)
    // range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(node);
  };

  const handleSuggestionClick = (event, suggestion) => {
    event.preventDefault();
    event.stopPropagation();
    setDropdownVisible(false);

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
    setCaretAtEnd(savedRange);
    // Update the state to reflect the changes in the contentEditable div
    // console.log('come here')
    // setText(contentEditableDiv.innerHTML);
    // console.log('back here here')
    // Hide the dropdown
    setDropdownVisible(false);
  };

  const searchRewrite = async (types, api) => {
    setActionButton(types);
    if(!textSelected){
        toast.error("Text is not selected");
        return
    }
    setDropdownVisible(true);
    
    // setLoading(true)
    await searchContent(textSelected, `/api/grammer-correction/${api}`);
    // setSuggestions(["Iphone", "Android"]); // Replace with your actual suggestion logic
  };

//   console.log('loading', countText.length)

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
      {/* Main content area */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="ibm-h1 mb-6">Enhance Your Writing</h1>
          <p className="ibm-paragraph mb-8">
            Use our advanced AI to improve your grammar, style, and clarity.
          </p>
          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => searchRewrite("rewrite", "rephrase")}
              className={actionButon === "rewrite"?`bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`:
                `bg-gray-100 text-gray-900 px-4 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`
              }
            >
              Rewrite
            </button>
            <button
             onClick={() => searchRewrite("formal", "professional")}
             className={actionButon === "formal"?`bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`:
               `bg-gray-100 text-gray-900 px-4 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`
             }
            >
              Formal
            </button>
            <button 
            onClick={() => searchRewrite("Casual", "normal")}
            className={actionButon === "Casual"?`bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`:
                `bg-gray-100 text-gray-900 px-4 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`
              }>
              Casual
            </button>
            <button 
            onClick={() => searchRewrite("Expand", "broader")}
            className={actionButon === "Expand"?`bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`:
                `bg-gray-100 text-gray-900 px-4 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`
              }>
              Expand
            </button>
            <button 
            onClick={() => searchRewrite("Shorten", "narrow")}
            className={actionButon === "Shorten"?`bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`:
                `bg-gray-100 text-gray-900 px-4 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`
              }>
              Shorten
            </button>
            <button className="bg-gray-100 text-gray-900 px-4 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              Continue writing
            </button>
          </div>
          <h2 className="ibm-h2 mb-4">Your Text</h2>
          {/* Text area */}
          <div className="bg-white border border-gray-300 rounded-md shadow-sm">
            {/* <textarea
              className="block w-full border-0 p-4 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              style={{
                maxHeight: 500,
                minHeight: 400,
                height: "auto",
                overflowY: "auto",
                resize: "vertical",
              }}
              placeholder="Start writing or paste your text here..."
              defaultValue={""}
            /> */}
            <div
              id="text-editor"
              ref={textAreaRef}
              className="block w-full border-0 p-4 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              style={{
                maxHeight: 500,
                minHeight: 400,
                height: "auto",
                overflowY: "auto",
                resize: "vertical",
              }}
              contentEditable="plaintext-only"
              suppressContentEditableWarning={true}
              data-placeholder="Start writing or paste your text here..."
                onInput={handleTextChange} // Use onInput instead of onChange for contentEditable
              //   value={text}
              //   onSelect={handleSelect}
              dangerouslySetInnerHTML={{ __html: text }} // Render HTML correctly
              // onKeyDown={handleKeyDown}
            ></div>
            {dropdownVisible && (
              <div
                style={{
                  position: "absolute",
                  left: positon2,
                  top: positions1,
                }}
                id="suggestion-dropdown"
                className="dropdown"
              >
                <div className="flex flex-wrap gap-2 m-2">
                  <button onClick={() => searchRewrite("rewrite", "rephrase")}
                    className={`h-5 px-2 ${
                      actionButon === "rewrite" ? `bg-orange-600 text-white text-sm  rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2` : 
                      `bg-gray-100 text-gray-900 text-sm rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`
                    }`}
                    >
                    Rewrite
                  </button>
                  <button
                    onClick={() => searchRewrite("formal", "professional")}
                    className={`h-5 px-2 ${
                      actionButon === "formal" ? `bg-orange-600 text-white text-sm rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2` : 
                      `bg-gray-100 text-gray-900 text-sm rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`
                    }`}
                  >
                    Formal
                  </button>
                  <button 
                  onClick={() => searchRewrite("Casual", "normal")}
                  className={`h-5 px-2 ${
                    actionButon === "Casual" ? `bg-orange-600 text-white text-sm rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2` : 
                    `bg-gray-100 text-gray-900 text-sm rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`
                  }`}>
                    Casual
                  </button>
                  <button 
                 onClick={() => searchRewrite("Expand", "broader")}
                 className={`h-5 px-2 ${
                   actionButon === "Expand" ? `bg-orange-600 text-white text-sm rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2` : 
                   `bg-gray-100 text-gray-900 text-sm rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`
                 }`}>
                    Expand
                  </button>
                  <button 
                   onClick={() => searchRewrite("Shorten", "narrow")}
                   className={`h-5 px-2 ${
                     actionButon === "Shorten" ? `bg-orange-600 text-white text-sm rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2` : 
                     `bg-gray-100 text-gray-900 text-sm rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`
                   }`}>
                    Shorten
                  </button>
                  <button 
                  className="h-5 px-2 bg-gray-100 text-gray-900 text-sm rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    Continue writing
                  </button>
                </div>
                {/* Display suggestions here */}
                {loading==true ? (
                  <div className="suggestion">Loading ....</div>
                ) : (
                  content?.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion"
                      onClick={(e) => handleSuggestionClick(e, suggestion.text)}
                    >
                      {suggestion.text}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          {/* Bottom toolbar */}
          <div className="mt-4 flex justify-end items-center">
            {/* <div className="flex space-x-4">
              <button className="text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
              <button className="text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            </div> */}
            <div className="ibm-caption text-gray-500">{countText.length==undefined?countText:countText.length} <span className="text-lg text-gray-900 font-bold">words</span></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default GrammerlyNew;
