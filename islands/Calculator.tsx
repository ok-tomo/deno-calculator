import { JSX } from "preact/jsx-runtime";
import { useMemo, useState } from "preact/hooks";

// Components
import { Display } from "../components/Display.tsx";
import { Button } from "../components/Button.tsx";

interface valueSet {
  value: string;
  isNegative: boolean;
}

const MAX_LENGTH_NUMBER = 13;
const buttonStyle = "w-20 h-20 border-4 border-neutral-700";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState<valueSet>(
    { value: "0", isNegative: false },
  );
  const [beforeValue, setBeforeValue] = useState<valueSet>(
    { value: "0", isNegative: false },
  );
  const [operand, setOperand] = useState<string | null>(null);

  const onClickNumberHandler = (
    event: JSX.TargetedMouseEvent<HTMLButtonElement>,
  ) => {
    const targetValue: string = (event?.target as HTMLElement).textContent!;
    setDisplayValue((preValue) => {
      const newValue = (preValue.value !== "0")
        ? preValue.value + targetValue
        : targetValue;
      const adjustedValue: string = (newValue.length > MAX_LENGTH_NUMBER)
        ? newValue.slice(1, MAX_LENGTH_NUMBER + 1)
        : newValue;
      const zeroCheckValue = parseFloat(adjustedValue).toString();
      return { ...preValue, value: zeroCheckValue };
    });
  };

  const onClickEqualHandler = (
    event: JSX.TargetedMouseEvent<HTMLButtonElement>,
  ) => {
    if (operand !== null) {
      // 演算子が選択されている場合は計算
      const bNega = (beforeValue.isNegative) ? "-" : "";
      const dNega = (displayValue.isNegative) ? "-" : "";
      const formula =
        `return ${bNega}${beforeValue.value}${operand}${dNega}${displayValue.value};`;
      const ans = Function(formula)();

      // 計算結果の表示
      setDisplayValue((preValue) => {
        return { value: (ans < 0) ? -ans : ans, isNegative: (ans < 0) };
      });

      // 演算子の初期化
      setOperand(null);
    } else {
      // 演算子が選択されていない場合は何もしない or アラート
    }
  };

  const onClickOperandHandler = (
    event: JSX.TargetedMouseEvent<HTMLButtonElement>,
  ) => {
    if (operand !== null) {
      onClickEqualHandler(event);
    } else {
      setOperand((event.target as HTMLElement).textContent!);
      setDisplayValue((preValue) => {
        setBeforeValue(preValue);
        return { value: "0", isNegative: false };
      });
    }
  };

  const allClear = () => {
    setDisplayValue({ value: "0", isNegative: false });
    setBeforeValue({ value: "0", isNegative: false });
    setOperand(null);
  };

  const invertPositiveNegative = () => {
    setDisplayValue((preValue) => {
      return { ...preValue, isNegative: !preValue.isNegative };
    });
  };

  const convertPercentage = () => {
    setDisplayValue((preValue) => {
      const newValue = (parseFloat(preValue.value) / 100).toString();
      return { ...preValue, value: newValue };
    });
  };

  // 電卓のボタン
  const calculatorButtons = () => {
    const functionButtons = [
      { name: "AC", onClick: allClear },
      { name: "+/-", onClick: invertPositiveNegative },
      { name: "%", onClick: convertPercentage },
    ].map((btn, index) => {
      return (
        <Button class={buttonStyle} onClick={btn.onClick}>{btn.name}</Button>
      );
    });

    const operandButtons = [
      {
        name: "+",
        onClick: (event: JSX.TargetedMouseEvent<HTMLButtonElement>) =>
          onClickOperandHandler(event),
      },
      { name: "-", onClick: onClickOperandHandler },
      { name: "*", onClick: onClickOperandHandler },
      { name: "/", onClick: onClickOperandHandler },
      { name: "=", onClick: onClickEqualHandler },
    ].map((btn, index) => {
      return (
        <Button class={buttonStyle} onClick={btn.onClick}>{btn.name}</Button>
      );
    });

    const numberButtons = [...Array(10).keys()].map((value) => {
      const colSpan = (value === 0) ? "col-span-2" : "w-20";
      return (
        <Button
          class={colSpan + buttonStyle.slice(4)}
          onClick={onClickNumberHandler}
        >
          {value}
        </Button>
      );
    }).reverse();

    const concatenateButtons = [
      ...functionButtons,
      ...numberButtons,
      <Button class={buttonStyle} onClick={onClickNumberHandler}>.</Button>,
    ];

    operandButtons.map((btn, index) => {
      concatenateButtons.splice(3 * (index + 1) + index, 0, btn);
    });

    return <div class={"grid grid-cols-4 gap-2"}>{concatenateButtons}</div>;
  };

  return (
    <div id="calculator" class="grid grid-cols-1 gap-2">
      <Display
        class={"grid col-span-full h-20 border-4 border-neutral-700"}
        value={displayValue.value}
        isNegative={displayValue.isNegative}
      />
      {calculatorButtons()}
    </div>
  );
};

export default Calculator;
