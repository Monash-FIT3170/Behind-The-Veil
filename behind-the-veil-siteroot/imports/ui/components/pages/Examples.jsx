import React from "react";
import Button from '../button/Button'

/**
 * Page to showcase examples
 * TODO: once routing is set up, move this behind a /examples route
 */
const Examples = () => {
  // Example buttons
  return (
    <div className="flex flex-col gap-5 p-10">
      Example buttons:
      <Button>Unstyled button</Button>
      <Button className="bg-main-blue hover:bg-main-blue-hover">
        Main blue with hover
      </Button>
      <Button className="bg-gradient-to-r from-bg-gradient-start to-bg-gradient-end">
        Background gradient
      </Button>
    </div>
  );
};

export default Examples;
