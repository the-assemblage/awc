import { css } from "lit-element";

export const SharedStylesButton = css`
  button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: inherit;
    vertical-align: middle;
  }

  button:hover svg {
    fill: var(--app-color-primary);
  }
`;
