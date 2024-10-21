import toast from "react-hot-toast";
// import QuileEditor from "../QuileEditor/QuileEditor";

const LeftSide = ({
  isAWord,
  handleContentButton,
  contents,
  handleSelection,
  handleInputChange,
  textareaRef,
  cont,
}) => {
  const handleErrors = () => {
    toast.error("select one word to get the synonym");
  };

  const handleSynonym = () => {
    toast.error("select the whole sentence");
  };

const handle = (e) => {
  console.log('e', e.target.textContent)
}
  return (
    <>
  {/* Toolbar */}
  <div className="p-4 flex flex-wrap gap-2 text-white">
    <button className="btn flex items-center">
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
</>

    // <div className="column-3 w-col w-col-8 w-col-stack">
    //   <div className="div-block-10">
    //     <div className="div-block-8">
    //       <div className="w-layout-grid toolbar_transparent">
    //       <a
    //         onClick={() =>
    //           isAWord==true?handleSynonym():handleContentButton(
    //             "Rephrase",
    //             contents,
    //             "/api/grammer-correction/rephrase"
    //           )
    //         }
    //         className="button w-button"
    //       >
    //           Casual
    //         </a>
    //         <a
    //         id="w-node-ebeaf508-1e7f-b2bd-41d3-dcfcfceb7aa5-6682bf28"
    //         onClick={() =>
    //           isAWord==true?handleSynonym():handleContentButton(
    //             "Conversational",
    //             contents,
    //             "/api/grammer-correction/normal"
    //           )
    //         }
    //         className="button w-button"
    //       >
    //           Conversational
    //         </a>
    //         <a
    //         id="w-node-_27fcbe8f-3225-96c3-e7aa-c25a9d8c14cf-6682bf28"
    //         onClick={() =>
    //           isAWord==true?handleSynonym():handleContentButton(
    //             "Professional",
    //             contents,
    //             "/api/grammer-correction/professional"
    //           )
    //         }
    //         className="button w-button"
    //       >
    //           Professional
    //         </a>
    //         <a
    //         id="w-node-_294c0929-14ac-a32c-516e-cfea499948a0-6682bf28"
    //         className="button w-button"
    //       >
    //           Simple
    //         </a>
    //         <a
    //           id="w-node-_1668c155-3056-1fce-81bc-4ce18e57a286-6682bf28"
    //           href="#"
    //           className="button w-button"
    //         >
    //           Creative
    //         </a>
    //         <a
    //         id="w-node-_294c0929-14ac-a32c-516e-cfea499948a0-6682bf28"
    //         onClick={() =>
    //           isAWord==true?handleSynonym():handleContentButton(
    //             "Narrow",
    //             contents,
    //             "/api/grammer-correction/narrow"
    //           )
    //         }
    //         className="button w-button"
    //       >
    //           Narrow
    //         </a>
    //         <a
    //         id="w-node-_3b5178a1-6177-7f64-55ba-aacc0ed27bd4-6682bf28"
    //         onClick={() =>
    //           isAWord==true?handleSynonym():handleContentButton(
    //             "Broader",
    //             contents,
    //             "/api/grammer-correction/broader"
    //           )
    //         }
    //         className="button w-button"
    //       >
    //           Broader
    //         </a>
    //       </div>
    //       <div className="w-layout-grid toolbar_extra">
    //       <a
    //       aria-disabled
    //         onClick={() =>
    //           isAWord==false?handleErrors():handleContentButton(
    //             "Synonym",
    //             contents,
    //             "/api/grammer-correction/synony"
    //           )
    //         }
    //         className="button w-button"
    //       >
    //           Synonym
    //         </a>
    //       </div>
    //     </div>
    //     <div className="text-block-2">
    //       <div onInput={(e) => handle(e)} onInputCapture={(e) => console.log('ecapture', e)} contenteditable="true" data-placeholder="Write/paste your text here, or generate with AI"></div>
    //     </div>
    //     <div />
    //   </div>
    // </div>
  );
};

export default LeftSide;
