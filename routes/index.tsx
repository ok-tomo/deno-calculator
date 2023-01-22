import { Head } from "$fresh/runtime.ts";

// Components
import Calculator from "../islands/Calculator.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Deno Calc with fresh</title>
      </Head>
      <main class="w-screen h-screen flex justify-center items-center">
        <Calculator />
      </main>
    </>
  );
}
