import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import {
  filterStyledSystemMarginProps,
  filterStyledSystemPaddingProps,
} from "../../style/utils";
import { Input, InputPresentation } from "../../__internal__/input";
import InputIconToggle from "../../__internal__/input-icon-toggle";
import FormField from "../../__internal__/form-field";
import withUniqueIdProps from "../../utils/helpers/with-unique-id-props";
import { InputBehaviour } from "../../__internal__/input-behaviour";
import StyledPrefix from "./__internal__/prefix.style";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

// Padding props filtering is a temporary solution until FormField and all related components are refactored
// FIXME FE-3370
const paddingPropTypes = filterStyledSystemPaddingProps(
  styledSystemPropTypes.space
);
const filterOutPaddingProps = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => !paddingPropTypes[key])
  );

const Textbox = ({
  children,
  inputIcon,
  leftChildren,
  formattedValue,
  value,
  childOfForm,
  isOptional,
  iconOnClick,
  iconOnMouseDown,
  iconTabIndex,
  validationOnLabel,
  labelWidth,
  inputWidth,
  prefix,
  adaptiveLabelBreakpoint,
  required,
  positionedChildren,
  inputRef,
  ...props
}) => {
  return (
    <InputBehaviour>
      <FormField
        childOfForm={childOfForm}
        isOptional={isOptional}
        {...filterOutPaddingProps(props)}
        useValidationIcon={validationOnLabel}
        labelWidth={labelWidth}
        adaptiveLabelBreakpoint={adaptiveLabelBreakpoint}
        isRequired={required}
      >
        <InputPresentation
          type="text"
          {...removeParentProps(props)}
          inputWidth={inputWidth || 100 - labelWidth}
          positionedChildren={positionedChildren}
        >
          {leftChildren}
          {prefix ? (
            <StyledPrefix data-element="textbox-prefix">{prefix}</StyledPrefix>
          ) : null}
          <Input
            {...(required && { required })}
            {...removeParentProps(props)}
            placeholder={
              props.disabled || props.readOnly ? "" : props.placeholder
            }
            aria-invalid={!!props.error}
            inputRef={inputRef}
            value={visibleValue(value, formattedValue)}
          />
          {children}
          <InputIconToggle
            {...removeParentProps(props)}
            useValidationIcon={!validationOnLabel}
            onClick={iconOnClick || props.onClick}
            onMouseDown={iconOnMouseDown}
            inputIcon={inputIcon}
            iconTabIndex={iconTabIndex}
          />
        </InputPresentation>
      </FormField>
    </InputBehaviour>
  );
};

function removeParentProps(props) {
  delete props["data-element"];
  delete props["data-component"];
  delete props["data-role"];
  delete props.className;
  return props;
}

function visibleValue(value, formattedValue) {
  return typeof formattedValue === "string" ? formattedValue : value;
}

Textbox.propTypes = {
  /** Filtered styled system margin props */
  ...marginPropTypes,
  /**
   * An optional alternative for props.value, this is useful if the
   * real value is an ID but you want to show a human-readable version.
   */
  formattedValue: PropTypes.string,
  /** The value of the Textbox */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array, // Allows the textbox to be used in the Multi-Select component
  ]),
  /** The unformatted value  */
  rawValue: PropTypes.string,
  /** If true, the component will be disabled */
  disabled: PropTypes.bool,
  /** If true, the component will be read-only */
  readOnly: PropTypes.bool,
  /** Event handler for the change event */
  onChange: PropTypes.func,
  /** Event handler for the keyDown event */
  onKeyDown: PropTypes.func,
  /** Defered callback called after the onChange event */
  onChangeDeferred: PropTypes.func,
  /** Integer to determine timeout for defered callback */
  deferTimeout: PropTypes.number,
  /** Label */
  label: PropTypes.string,
  /** Inline label alignment */
  labelAlign: PropTypes.oneOf(["left", "right"]),
  /** Text applied to label help tooltip */
  labelHelp: PropTypes.node,
  /** When true, label is placed in line an input */
  labelInline: PropTypes.bool,
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing: PropTypes.oneOf([1, 2]),
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth: PropTypes.number,
  /** Width of an input in percentage. Works only when labelInline is true */
  inputWidth: PropTypes.number,
  /** Help content to be displayed under an input */
  fieldHelp: PropTypes.node,
  /** Type of the icon that will be rendered next to the input */
  children: PropTypes.node,
  /**
   * <a href="https://brand.sage.com/d/NdbrveWvNheA/foundations#/icons/icons" target="_blank">List of supported icons</a>
   *
   * Icon to display inside of the Textbox
   * */
  inputIcon: PropTypes.string,
  /** Additional child elements to display before the input */
  leftChildren: PropTypes.node,
  /** Flag to configure component when in a Form */
  childOfForm: PropTypes.bool,
  /** [Legacy] Flag to configure component as optional in Form */
  isOptional: PropTypes.bool,
  /** Indicate that error has occurred
  Pass string to display icon, tooltip and red border
  Pass true boolean to only display red border */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate that warning has occurred
  Pass string to display icon, tooltip and orange border
  Pass true boolean to only display orange border */
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate additional information
  Pass string to display icon, tooltip and blue border
  Pass true boolean to only display blue border */
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel: PropTypes.bool,
  /** Size of an input */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /** Placeholder string to be displayed in input */
  placeholder: PropTypes.string,
  /**
   * Container for DatePicker or SelectList components
   * @private
   * @ignore
   *
   */
  positionedChildren: PropTypes.node,
  /** Optional handler for click event on Textbox icon */
  iconOnClick: PropTypes.func,
  /** Optional handler for mousedown event on Textbox icon */
  iconOnMouseDown: PropTypes.func,
  /** Overrides the default tabindex of the component */
  iconTabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Handler for onClick events */
  onClick: PropTypes.func,
  /** Emphasized part of the displayed text */
  prefix: PropTypes.string,
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint: PropTypes.number,
  /** Flag to configure component as required */
  required: PropTypes.bool,
  /** A callback to retrieve the input reference */
  inputRef: PropTypes.func,
};

Textbox.defaultProps = {
  labelWidth: 30,
  size: "medium",
  validationOnLabel: false,
};

export { Textbox as OriginalTextbox };
export default withUniqueIdProps(Textbox);
