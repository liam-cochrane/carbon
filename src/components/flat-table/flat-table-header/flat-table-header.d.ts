import * as React from "react";
import { TableBorderSize } from "..";
import { PaddingProps } from "styled-system";

export interface FlatTableHeaderProps extends PaddingProps {
  /** Content alignment */
  align?: "left" | "center" | "right";
  /** If true sets alternative background color */
  alternativeBgColor?: boolean;
  children?: React.ReactNode | string;
  /** Number of columns that a header cell should span */
  colspan?: number | string;
  /** Number of rows that a header cell should span */
  rowspan?: number | string;
  /** Sets a custom vertical right border */
  verticalBorder?: TableBorderSize;
  /** Column width, pass a number to set a fixed width in pixels */
  width?: number;
}

declare function FlatTableHeader(props: FlatTableHeaderProps): JSX.Element;

export default FlatTableHeader;
