import React, { useState } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import DraggableItem from './draggable-item.component';
import { StyledIcon } from './draggable-item.style';

const DropTarget = ({ children }) => {
  const [, drop] = useDrop({ accept: 'draggableItem' });

  return <div ref={ drop }>{children}</div>;
};

const DraggableContainer = ({ children, getOrder }) => {
  const [draggableItems, setDraggableItems] = useState(React.Children.toArray(children));

  const findItem = (id) => {
    const draggableItem = draggableItems.filter((item) => {
      return `${item.props.id}` === id;
    })[0];

    return {
      draggableItem,
      index: draggableItems.indexOf(draggableItem)
    };
  };

  const moveItem = (id, atIndex) => {
    const { draggableItem, index } = findItem(id);
    const copyOfDraggableItems = [...draggableItems];

    copyOfDraggableItems.splice(index, 1);
    copyOfDraggableItems.splice(atIndex, 0, draggableItem);
    setDraggableItems(copyOfDraggableItems);
  };

  const getItemsId = () => {
    if (!getOrder) {
      return;
    }

    const tempArray = [];
    draggableItems.forEach((draggableItem) => {
      return tempArray.push(draggableItem.props.id);
    });

    getOrder(tempArray);
  };

  return (
    <DndProvider backend={ Backend }>
      <DropTarget>
        {draggableItems.map(item => (
          React.cloneElement(
            item,
            {
              id: `${item.props.id}`,
              findItem,
              moveItem,
              getOrder: getItemsId
            },
            [
              item.props.children,
              <StyledIcon key={ item.props.id } type='drag' />
            ]
          )
        ))}
      </DropTarget>
    </DndProvider>
  );
};

DraggableContainer.propTypes = {
  getOrder: PropTypes.func,
  children: (props, propName, componentName) => {
    const prop = props[propName];
    let error;

    React.Children.forEach(prop, (child) => {
      if (DraggableItem.displayName !== child.type.displayName) {
        error = new Error(`\`${componentName}\` only accepts children of type \`${DraggableItem.displayName}\`.`);
      }
    });

    return error;
  }
};

DropTarget.propTypes = {
  children: PropTypes.node.isRequired
};

export default DraggableContainer;
