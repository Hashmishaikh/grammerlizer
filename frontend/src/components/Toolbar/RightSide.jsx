import React from "react";

const RightSide = ({ suggestionSelected, content, loading }) => {
  return (
    <div className="column-4 w-col w-col-4 w-col-stack">
      <div className="div-block-14">
        <div className="div-block-13">
          <div>
            <h5 className="heading-2">Suggestions appear here </h5>
            <div className="subheading">
              Enter at least 25 words to see suggested options.
              <br />
            </div>
          </div>
          <div className="count">
            {content.length == 0 ? 0 : content.length}
            <br />
          </div>
        </div>
        <ul
          role="list"
          className="list"
          style={{ overflowY: "auto", maxHeight: "700px" }}
        >
          {loading ? (
            <li className="list-item-2">
              <a className="div-block-11 w-inline-block">
                <p className="paragraph-2">Loading....</p>
              </a>
            </li>
          ) : content.length === 0 ? null : (
            content.map((res, index) => (
              <li key={index} className="list-item-2">
                <a
                  onClick={() => suggestionSelected(res?.text)}
                  className="div-block-11 w-inline-block"
                  style={{cursor:"pointer"}}
                >
                  <p className="paragraph-2">{res.text}</p>
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default RightSide;
