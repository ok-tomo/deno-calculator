import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Deno Calc with fresh</title>
      </Head>
      <div>
        <Counter start={3} />
      </div>
    </>
  );
}
