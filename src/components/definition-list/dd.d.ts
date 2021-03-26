import * as React from "react";
import { SpacingProps } from "../../utils/helpers/options-helper";
export interface DdProps extends SpacingProps {
  /** Prop for what will render in the `<Dd></Dd>` tags */
  children: React.ReactNode;
}

declare function DdComponent(props: DdProps): JSX.Element;

export default DdComponent;
