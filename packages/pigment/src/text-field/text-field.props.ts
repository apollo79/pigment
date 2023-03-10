import { TextField as KTextField } from "@kobalte/core";
import { ComponentProps, JSX, Ref } from "solid-js";

import { TextFieldWrapperVariants } from "./text-field.styles";

export interface TextFieldProps
  extends Omit<KTextField.TextFieldRootProps, "ref" | "validationState">,
    Omit<TextFieldWrapperVariants, "isFocused" | "isDisabled"> {
  /** A ref to the inner `<input>` element. */
  ref: Ref<HTMLInputElement>;

  /** The type of content handled by the text field. */
  type?: "text" | "email" | "tel" | "password" | "url" | "number" | "date" | string;

  /** The placeholder displayed when the text field is empty. */
  placeholder?: string;

  /** Whether the description should appear above or below the input. */
  descriptionPlacement?: "top" | "bottom";

  /** Additional props to be spread on the inner `<input>` element. */
  inputProps?: ComponentProps<"input">;

  /** The label that gives the user information on the text field. */
  label?: JSX.Element;

  /** The description that gives the user more information on the text field. */
  description?: JSX.Element;

  /** The error message that gives the user information about how to fix a validation error on the text field. */
  error?: JSX.Element;

  /** Whether an asterisk should appear next to the label when the text field is required. */
  hasRequiredIndicator?: boolean;

  /** Whether an icon should appear next to the error message. */
  hasErrorIcon?: boolean;

  /** The icon to show next to the error message. */
  errorIcon?: JSX.Element;

  /** The icon to show before the text field content. */
  startIcon?: JSX.Element;

  /** The icon to show after the text field content. */
  endIcon?: JSX.Element;

  /** The section to show before the text field start icon and content. */
  startSection?: JSX.Element;

  /** The section to show after the text field end icon and content. */
  endSection?: JSX.Element;
}

export type TextFieldSlots =
  | "root"
  | "label"
  | "wrapper"
  | "input"
  | "startIcon"
  | "endIcon"
  | "description"
  | "error"
  | "errorIcon";