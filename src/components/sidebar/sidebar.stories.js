import React, { useState } from "react";
import { boolean, select, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Sidebar from ".";
import Button from "../button";
import { SIDEBAR_ALIGNMENTS, SIDEBAR_SIZES } from "./sidebar.config";

export default {
  title: "Sidebar/Test",
  component: Sidebar,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
  },
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(true);

  const enableBackgroundUI = boolean(
    "enableBackgroundUI",
    Sidebar.defaultProps.enableBackgroundUI
  );
  const position = select(
    "position",
    SIDEBAR_ALIGNMENTS,
    Sidebar.defaultProps.position
  );
  const size = select("size", SIDEBAR_SIZES, Sidebar.defaultProps.size);

  const onCancel = () => {
    setIsOpen(false);
    action("cancel")();
  };

  const openSidebar = () => {
    setIsOpen(true);
  };

  const headerChildren = text("header", "");
  return (
    <>
      <Button onClick={openSidebar}>Open sidebar</Button>
      <Sidebar
        enableBackgroundUI={enableBackgroundUI}
        open={isOpen}
        position={position}
        size={size}
        onCancel={onCancel}
        header={headerChildren}
      >
        <div>
          <Button as="primary">Test</Button>
          <Button as="secondary" ml={2}>
            Last
          </Button>
        </div>
        <div style={{ marginBottom: 3000 }}>Main content</div>
      </Sidebar>
    </>
  );
};

Default.story = {
  name: "default",
};
