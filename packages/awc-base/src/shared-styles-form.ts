// import { Icon } from "@material/mwc-icon";
import { css } from "lit-element";

export const SharedStylesForm = css`
  /* Layout */

  form {
    align-content: center;
    align-items: start;
    display: grid;
    gap: 1rem;
    grid-column-gap: var(--grid-column-gap, 1rem);
    grid-row-gap: 1rem;
    grid-template-columns: var(--grid-template-columns, 1fr);
  }

  /*
  form {
    align-items: start;
    grid-column-gap: var(--grid-column-gap, 1rem);
    grid-row-gap: 1rem;
    grid-template-columns: var(--grid-template-columns, 1fr);
    width: 100%;
  }
  */

  /*
  form:not(.horizontal-labels) label,
  form:not(.show-labels) .radio-item label {
    display: inline-grid;
  }
  */

  /*
  form:not(.show-labels) label {
    height: 1px;
    left: -10000px;
    overflow: hidden;
    position: absolute;
    top: auto;
    width: 1px;
  }

  form:not(.show-labels) label:focus {
    height: auto;
    position: static;
    width: auto;
  }
  */

  fieldset {
    border: none;
    /*
    display: contents;
    */
    margin: 0;
    padding: 0;
  }

  fieldset header {
    grid-column: 1 / span 2;
  }

  .form-group {
    align-items: center;
    display: grid;
    margin-bottom: 1rem;
    /* grid-template-columns: repeat(2, 1fr); */
    grid-template-columns: 2fr 3fr;
  }

  /*
  fieldset:last-of-type {
    margin-bottom: 1rem;
  }
  */

  form button,
  form input,
  form select,
  form textarea {
    -webkit-appearance: none;
    appearance: none;
    padding: 1rem;
  }

  form input,
  form label,
  form select,
  form span,
  form textarea {
    width: 100%;
  }

  form label,
  form span {
    padding-left: 0;
  }

  select {
    background-image: url(/images/icons/baseline-arrow_drop_down-24px.svg);
    background-position: calc(100% - 0.75rem);
    background-repeat: no-repeat;
    padding-right: 3.25rem;
    z-index: 5;
  }

  [dir="rtl"] select {
    background-position: 1rem;
  }

  input[type="checkbox"] {
  }

  input[type="radio"] {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 1rem;
    display: block;
    height: 1rem;
    width: 1rem;
  }

  .radio-item .guidance,
  .radio-item .validation-error {
    order: 100000;
  }

  .radio-item {
    align-items: center;
    display: grid;
    grid-column-gap: 0.5rem;
    grid-template-columns: min-content 1fr;
    justify-content: start;
  }

  .radio-item input,
  .radio-item label {
    margin-bottom: 0.25rem;
    margin-top: 0.25rem;
    padding: 0;
  }

  .guidance,
  .validation-error {
    font-size: 0.75rem;
    padding-top: 0.25rem;
  }

  /* Colour */

  button,
  input,
  select,
  textarea {
    border: 1px solid black;
    border-radius: 0;
  }

  /* Text */

  button,
  input::placeholder,
  label,
  legend,
  textarea,
  .label {
    text-transform: capitalize;
  }

  input::placeholder {
    font-size: 0.75rem;
  }

  legend {
    border-bottom-color: var(--app-color-secondary);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    width: 100%;
  }

  button {
    font-size: 1rem;
  }

  @media (max-width: 767px) {
    form label,
    form span {
      padding-bottom: 0.25rem;
    }

    .form-group {
      grid-template-columns: 1fr;
    }

    .radio-item {
      grid-auto-flow: column;
    }
  }

  @media (min-width: 768px) {
    .form-group > label {
      grid-row: 1;
    }

    .form-group > .guidance,
    .form-group > .validation-error {
      grid-row: 3;
    }

    .radio-item input {
    }

    .radio-item label {
      padding: 0;
    }

    .form-group > button,
    .form-group > input,
    .form-group > label,
    .form-group > select,
    .form-group > textarea {
      grid-row: 1;
    }

    form.show-labels .form-group {
      grid-template-columns: 2fr 3fr;
      grid-template-areas: "label field" "description feedback";
    }

    form.show-labels .form-group > label {
      grid-column: 1;
    }

    form .form-group > .guidance,
    form .form-group > .validation-error {
      grid-column: 2;
    }

    form.show-labels .radio-item input[type="radio"],
    form.show-labels .radio-item mwc-radio {
      grid-column: 1;
      order: -1;
    }

    form.show-labels .radio-item label {
      grid-column: 2;
    }

    form.show-labels .radio-item .guidance,
    form.show-labels .radio-item .validation-error {
      grid-column: 1 / span 2;
    }

    form.show-labels .form-group > button,
    form.show-labels .form-group > input,
    form.show-labels .form-group > select,
    form.show-labels .form-group > textarea {
      grid-column: 2;
    }
  }

  form input:focus,
  form textarea:focus,
  form select:focus {
    border-color: #0000ff !important;
    border-offset: 0;
  }

  form :checked {
    background-color: #000;
    border-color: #000;
    border-style: solid;
    border-width: 5px;
  }

  select:required:invalid {
    color: gray;
  }

  select option[value=""][disabled] {
    display: none;
  }

  select option {
    color: black;
  }

  form
    input:not([type="checkbox"]):not([type="date"]):not([type="radio"]):in-range:not(:placeholder-shown),
  form
    textarea:not([type="checkbox"]):not([type="date"]):not([type="radio"]):in-range:not(:placeholder-shown),
  form
    select:not([type="checkbox"]):not([type="date"]):not([type="radio"]):in-range:not(:placeholder-shown) {
    border-color: #008000 !important;
  }

  form
    input:invalid:not([type="checkbox"]):not([type="date"]):not([type="radio"]):not(:placeholder-shown),
  form
    textarea:invalid:not([type="checkbox"]):not([type="date"]):not([type="radio"]):not(:placeholder-shown),
  form
    select:invalid:not([type="checkbox"]):not([type="date"]):not([type="radio"]):not(:placeholder-shown) {
    border-color: #dc143c !important;
  }

  form
    input:out-of-range:not([type="checkbox"]):not([type="date"]):not([type="radio"]):not(:placeholder-shown),
  form
    textarea:out-of-range:not([type="checkbox"]):not([type="date"]):not([type="radio"]):not(:placeholder-shown),
  form
    select:out-of-range:not([type="checkbox"]):not([type="date"]):not([type="radio"]):not(:placeholder-shown) {
    border-color: #dc143c !important;
  }

  form input:optional,
  form textarea:optional {
    border-style: dashed;
  }

  form input:read-only,
  form textarea:read-only {
    border-color: #333 !important;
  }

  form input:read-write,
  form textarea:read-write {
    border-color: #000 !important;
  }

  form input:required,
  form textarea:required {
    border-style: solid;
  }

  form
    input:not([type="checkbox"]):not([type="date"]):not([type="radio"]):valid:not(:placeholder-shown),
  form
    textarea:not([type="checkbox"]):not([type="date"]):not([type="radio"]):valid:not(:placeholder-shown),
  form
    select:not([type="checkbox"]):not([type="date"]):not([type="radio"]):valid:not(:placeholder-shown) {
    border-color: #008000 !important;
  }

  /*
  form :valid:not([type="checkbox"]):not([type="date"]):not([type="radio"]):not(:placeholder-shown) + p::before {
    content: "✓";
    display: block;
  }
  */

  button[type="submit"] {
    grid-column: var(--button_grid-column, 1);
  }
`;
