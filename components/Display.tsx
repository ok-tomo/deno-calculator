import { JSX } from "preact/jsx-runtime";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface DisplayProps {
  class: string;
  value: string;
  isNegative: boolean;
  disabled?: boolean;
}

export const Display = (props: DisplayProps) => {
  return (
    <div
      class={props.class}
      disabled={!IS_BROWSER || props.disabled}
      id="display"
    >
      <p class={"text-3xl text-right my-auto mx-2.5"}>
        {(props.isNegative) ? "-" : ""}
        {props.value}
      </p>
    </div>
  );
};
