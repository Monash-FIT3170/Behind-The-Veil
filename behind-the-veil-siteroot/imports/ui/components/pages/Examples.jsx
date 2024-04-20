import React from "react";
import Button from "../button/Button";

/**
 * Page to showcase examples
 * TODO: once routing is set up, move this page behind a /examples route
 */
const Examples = () => {
  // Example buttons
  return (
    <div className="flex flex-col gap-5 p-10">
      <div className="title-text">Examples</div>
      <div className="large-text">Example buttons:</div>
      <Button>Unstyled button</Button>
      <Button className="bg-main-blue hover:bg-main-blue-hover">
        Main blue with hover
      </Button>
      <Button className="bg-gradient-to-r from-bg-gradient-start to-bg-gradient-end">
        Background gradient
      </Button>
      <Button onClick={() => console.log("Hello")}>
        Click me and look at your console
      </Button>
      <div className="large-text">Font styles:</div>
      <div className="title-text">title-text</div>
      <div className="main-text">main-text</div>
      <div className="large-text">large-text</div>
      <div className="medium-text">medium-text</div>
      <div className="small-text">small-text</div>
      <div className="large-number-text">large-number-text</div>
      <div className="logo-text">logo-text</div>
      <div className="message-tag-text">message-tag-text</div>
      <div className="message-receiver-name-text">
        message-receiver-name-text
      </div>
      <div className="message-read-text">message-read-text</div>
      <div className="message-unread-text">message-unread-text</div>
      <div className="message-name-read-text">message-name-read-text</div>
      <div className="message-name-unread-text">message-name-unread-text</div>
    </div>
  );
};

export default Examples;
