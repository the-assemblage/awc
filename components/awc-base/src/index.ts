import { css } from "lit-element";

// These are the shared styles needed by this element.
import { SharedStylesButton } from "./shared-styles-button";
import { SharedStylesColor } from "./shared-styles-color";
import { SharedStylesForm } from "./shared-styles-form";
import { SharedStylesLayout } from "./shared-styles-layout";
import { SharedStylesText } from "./shared-styles-text";

export const SharedStyles = [
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

    .circle {
      display: block;
      width: 64px;
      height: 64px;
      margin: 0 auto;
      text-align: center;
      border-radius: 50%;
      background: var(--app-color-primary);
      color: var(--app-text-color-light);
      font-size: 30px;
      line-height: 64px;
    }
  `
];
