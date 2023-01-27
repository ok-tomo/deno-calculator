import { Head } from "$fresh/runtime.ts";

// Islands
import Calculator from "../islands/Calculator.tsx";
import SplashScreen from "../islands/SplashScreen.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Deno Calc with fresh</title>
        <link rel="stylesheet" href="/main.css"></link>
      </Head>
      <main class="w-screen h-screen flex justify-center items-center">
        {/* <SplashScreen /> */}
        <Calculator />
      </main>
    </>
  );
}
