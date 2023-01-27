import { JSX } from "preact/jsx-runtime";
import { useMemo, useState } from "preact/hooks";

// Components
import { Display } from "../components/Display.tsx";
import { Button } from "../components/Button.tsx";

const MAX_LENGTH_NUMBER = 13;
const buttonStyle = "w-20 h-20 border-4 border-neutral-700";

const Calculator = () => {
  const [count, setCount] = useState<string>("0");

  const onClick = (
    event: JSX.TargetedMouseEvent<HTMLButtonElement>,
  ) => {
    const targetValue: string = (event?.target as HTMLElement).textContent!;
    setCount((preValue) => {
      const newValue = (preValue !== "0")
        ? preValue.toString() + targetValue
        : targetValue;
      const adjustedValue: string = (newValue.length > MAX_LENGTH_NUMBER)
        ? newValue.slice(1, MAX_LENGTH_NUMBER + 1)
        : newValue;
      return parseInt(adjustedValue).toString();
    });
  };

  // Numpad 0-9
  const calculatorButtons = useMemo(() => {
    const functionButtons = ["AC", "+/-", "%"].map((f, index) => {
      return <Button class={buttonStyle}>{f}</Button>;
    });

    const operandButtons = ["+", "-", "*", "/", "="].map((f, index) => {
      return <Button class={buttonStyle}>{f}</Button>;
    });

    const numberButtons = [...Array(10).keys()].map((value) => {
      const colSpan = (value === 0) ? "col-span-3" : "w-20";
      return (
        <Button class={colSpan + buttonStyle.slice(4)} onClick={onClick}>
          {value}
        </Button>
      );
    }).reverse();

    const concatenateButtons = [
      ...functionButtons,
      ...numberButtons,
    ];

    operandButtons.map((btn, index) => {
      concatenateButtons.splice(3 * (index + 1) + index, 0, btn);
    });

    console.log(concatenateButtons);
    return <div class={"grid grid-cols-4 gap-2"}>{concatenateButtons}</div>;
  }, []);

  return (
    <div id="calculator" class="grid grid-cols-1 gap-2">
      <Display
        class={"grid col-span-full h-20 border-4 border-neutral-700"}
        value={count}
      />
      {calculatorButtons}
    </div>
  );
};

export default Calculator;
