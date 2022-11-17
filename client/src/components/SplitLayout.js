import React from "react";

const SplitLayout = ({ imageUrl, contentLayout, children }) => {
  const image = <img className="sl-image" src={imageUrl} alt="login" />;

  return (
    <div className="sl-container">
      <div className={contentLayout === "left" ? "sl-content" : ""}>
        {contentLayout === "left" ? children : image}
      </div>

      <div className={contentLayout === "left" ? "" : "sl-content"}>
        {contentLayout === "left" ? image : children}
      </div>
    </div>
  );
};

export default SplitLayout;
