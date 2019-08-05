import { css } from "lit-element";

// These are the shared styles needed by this element.
import { SharedStylesButton } from "./shared-styles-button";
import { SharedStylesColor } from "./shared-styles-color";
import { SharedStylesForm } from "./shared-styles-form";
import { SharedStylesLayout } from "./shared-styles-layout";
import { SharedStylesModernNormalize } from "./shared-styles-modern-normalize";
import { SharedStylesText } from "./shared-styles-text";

export const SharedStyles = [
  SharedStylesModernNormalize,
  SharedStylesButton,
  SharedStylesColor,
  SharedStylesForm,
  SharedStylesLayout,
  SharedStylesText,
  css`
    /*
   * Breakpoints: 768px, 1024px, 1440px, 1920px
   */

    [loading] {
      color: blue;
      place-self: center;
    }
  `
];
