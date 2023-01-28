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

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState<valueSet>(
    { value: "0", isNegative: false },
  );
  const [beforeValue, setBeforeValue] = useState<valueSet>(
    { value: "0", isNegative: false },
  );
  const [operand, setOperand] = useState<string | null>(null);
  const buttonStyle = "w-20 h-20 border-4 border-neutral-700";

  const numberButtonClickHandler = (
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

  const equalButtonClickHandler = (
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

  const operandButtonClickHandler = (
    event: JSX.TargetedMouseEvent<HTMLButtonElement>,
  ) => {
    if (operand !== null) {
      equalButtonClickHandler(event);
    } else {
      setOperand((event.target as HTMLElement).textContent!);
      setDisplayValue((preValue) => {
        setBeforeValue(preValue);
        return { value: "0", isNegative: false };
      });
    }
  };

  const allClearButtonClickHandler = () => {
    setDisplayValue({ value: "0", isNegative: false });
    setBeforeValue({ value: "0", isNegative: false });
    setOperand(null);
  };

  const reverseSignsButtonClickHandler = () => {
    setDisplayValue((preValue) => {
      return { ...preValue, isNegative: !preValue.isNegative };
    });
  };

  const percentageButtonClickHandler = () => {
    setDisplayValue((preValue) => {
      const newValue = (parseFloat(preValue.value) / 100).toString();
      return { ...preValue, value: newValue };
    });
  };

  return (
    <div id="calculator" class="grid grid-cols-1 gap-2">
      <Display
        class={"grid col-span-full h-20 border-4 border-neutral-700"}
        value={displayValue.value}
        isNegative={displayValue.isNegative}
      />
      <div class="grid grid-cols-4 gap-2">
        <Button class={buttonStyle} onClick={allClearButtonClickHandler}>
          AC
        </Button>
        <Button class={buttonStyle} onClick={reverseSignsButtonClickHandler}>
          +/-
        </Button>
        <Button class={buttonStyle} onClick={percentageButtonClickHandler}>
          %
        </Button>
        <Button class={buttonStyle} onClick={operandButtonClickHandler}>
          +
        </Button>
      </div>
      <div class="grid grid-cols-4 gap-2">
        <Button class={buttonStyle} onClick={numberButtonClickHandler}>
          7
        </Button>
        <Button class={buttonStyle} onClick={numberButtonClickHandler}>
          8
        </Button>
        <Button class={buttonStyle} onClick={numberButtonClickHandler}>
          9
        </Button>
        <Button class={buttonStyle} onClick={operandButtonClickHandler}>
          -
        </Button>
      </div>
      <div class="grid grid-cols-4 gap-2">
        <Button class={buttonStyle} onClick={numberButtonClickHandler}>
          4
        </Button>
        <Button class={buttonStyle} onClick={numberButtonClickHandler}>
          5
        </Button>
        <Button class={buttonStyle} onClick={numberButtonClickHandler}>
          6
        </Button>
        <Button class={buttonStyle} onClick={operandButtonClickHandler}>
          *
        </Button>
      </div>
      <div class="grid grid-cols-4 gap-2">
        <Button class={buttonStyle} onClick={numberButtonClickHandler}>
          1
        </Button>
        <Button class={buttonStyle} onClick={numberButtonClickHandler}>
          2
        </Button>
        <Button class={buttonStyle} onClick={numberButtonClickHandler}>
          3
        </Button>
        <Button class={buttonStyle} onClick={operandButtonClickHandler}>
          /
        </Button>
      </div>
      <div class="grid grid-cols-4 gap-2">
        <Button
          class={"col-span-2" + buttonStyle.slice(4)}
          onClick={numberButtonClickHandler}
        >
          0
        </Button>
        <Button class={buttonStyle} onClick={numberButtonClickHandler}>
          .
        </Button>
        <Button class={buttonStyle} onClick={equalButtonClickHandler}>=</Button>
      </div>
    </div>
  );
};

export default Calculator;
