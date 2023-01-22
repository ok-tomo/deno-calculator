import { JSX } from "preact/jsx-runtime";
import { useMemo, useState } from "preact/hooks";

// Components
import { Button } from "../components/Button.tsx";
import { Display } from "../components/Display.tsx";

const MAX_LENGTH_NUMBER = 13;

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
  const calcButtonsNumber = useMemo(() => {
    return (
      <div class={"grid grid-cols-3 gap-2"} dir={"rtl"}>
        {[...Array(10).keys()].map((value) => {
          const colSpan = (value === 0) ? "col-span-full " : "w-20 ";
          return (
            <Button
              key={`${value}`}
              name={`Numpad${value}`}
              class={colSpan + "h-20 border-4 border-neutral-700"}
              onClick={onClick}
            >
              {value}
            </Button>
          );
        }).reverse()}
      </div>
    );
  }, []);

  console.log(count);
  return (
    <div id="calculator" class={"grid grid-cols-1 gap-2"}>
      <Display
        class={"grid col-span-full h-20 border-4 border-neutral-700"}
        value={count}
      />
      {calcButtonsNumber}
    </div>
  );
};

export default Calculator;
