import React, { useEffect, useRef, useState } from "react";
import LeftSide from "../components/Toolbar/LeftSide";
import RightSide from "../components/Toolbar/RightSide";
import "/grammartool.webflow.css";
import useContent from "../hooks/useContent";
import toast from "react-hot-toast";

const Toolbar = () => {
  const [contents, setContents] = useState("");
  const [buttonType, setButtontype] = useState("");
  const [apiType, setApiType] = useState("");
  const [selection, setSelection] = useState(null);
  const [isAWord, setIsAWord] = useState(false);
  const textareaRef = useRef(null);
  // regex for word and sentences
  let wordRegex = /^[^\s]+$/;
  let sentenceRegex = /\s/;
  // end for regex
  const { searchContent, setContent, content, loading } = useContent();
  const handleInputChange = (e) => {
    setContents(e.target.value);
  };

  const handleSelection = (event) => {
    console.log("event", event);
    // setStoredEvent(event);
    const selectedText = window.getSelection().toString();
    setSelection(selectedText);
    if (wordRegex.test(selectedText)) {
      setIsAWord(true);
    } else if (sentenceRegex.test(selectedText)) {
      setIsAWord(false);
    } else {
      setIsAWord(true);
    }
    if (!selectedText) {
      setContent([]);
    }
  };

  const handleContentButton = async (buttonType, content, api) => {
    console.log("buttonType", buttonType);
    setButtontype(buttonType);
    setApiType(api);
    const textarea = textareaRef.current;
    textarea.focus();
    console.log("first", content.length);
    if (content.length === 0) {
      toast.error("select the whole sentence or word");
      return;
    }
    await searchContent(content, api);
  };

  // selected from the suggestion

  const suggestionSelected = async (text) => {
    setContent([]);
    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    // Get the current content of the textarea
    const currentContent = textarea.value;

    // Replace the selected text with the new text
    const newText =
      currentContent.substring(0, startPos) +
      text +
      currentContent.substring(endPos);

    // Set the new content of the textarea
    setContents(newText);
    textarea.value = newText;

    // Set the selection range to include the newly inserted text
    const newSelectionStart = startPos + text.length;
    textarea.setSelectionRange(newSelectionStart, newSelectionStart);

    // Find the start and end of the next sentence
    const nextSentenceStart = newText.indexOf(".", newSelectionStart) + 1;
    const nextSentenceEnd = newText.indexOf(".", nextSentenceStart);

    // Select the next sentence
    if (nextSentenceStart !== -1 && nextSentenceEnd !== -1) {
      textarea.setSelectionRange(nextSentenceStart, nextSentenceEnd);
      const nextSelectedText = newText.substring(
        nextSentenceStart,
        nextSentenceEnd
      );
      console.log("Selected Text of Next Sentence:", nextSelectedText);
      setSelection(nextSelectedText);
      handleContentButton(buttonType, nextSelectedText, apiType);
    }
    textarea.focus();
  };

  useEffect(
    (e) => {
      // handleSelection(e);
      const elements = document.querySelectorAll(".focus-vized");
      elements.forEach((element) => {
        element.addEventListener("mouseup", handleSelection);
      });

      return () => {
        elements.forEach((element) => {
          element.removeEventListener("mouseup", handleSelection);
        });
      };
    },
    [content]
  );

  // console.log('selection', selection)
  return (
    <>
        <LeftSide
          isAWord={isAWord}
          handleContentButton={handleContentButton}
          contentList={content}
          contents={selection}
          cont={contents}
          handleInputChange={handleInputChange}
          textareaRef={textareaRef}
          handleSelection={handleSelection}
        />
        <RightSide
          suggestionSelected={suggestionSelected}
          contents={contents}
          content={content}
          loading={loading}
        />
      </>
  );
};

export default Toolbar;
