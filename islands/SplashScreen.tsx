import { JSX } from "preact/jsx-runtime";

// Components
import { SplashScreenIcon } from "../components/SplashScreenIcon.tsx";

const SplashScreen = () => {
  const onAnimationEndHandler = (
    event: JSX.TargetedAnimationEvent<HTMLDivElement>,
  ) => {
    const target: Element = event.target as HTMLElement;

    // スプラッシュ画面のアニメーションが終了後、要素を削除
    if (target.id === "splashscreen") {
      target.parentNode?.removeChild(target);
    }
  };

  return (
    <div id="splashscreen" onAnimationEnd={onAnimationEndHandler}>
      <SplashScreenIcon />
    </div>
  );
};

export default SplashScreen;
