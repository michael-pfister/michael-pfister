/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";
import { Head } from "https://deno.land/x/fresh@1.0.2/runtime.ts";
import Terminal from "../islands/Terminal.tsx";

function Hero() {
  return (
    <div
      className={tw`flex justify-center items-center content-center flex-wrap gap-16 m-5 h-screen`}
    >
      <Terminal
        terminalCommand={`echo "Hi I'm Michael, a Web Developer"`}
        terminalOutput={`Hi I'm Michael, a Web Developer`}
      />
      <img
        class={tw`w-[400px] rounded-full`}
        src="/profile_picture.png"
        alt="me"
      />
    </div>
  );
}

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Michael Pfister - Web Developer</title>
      </Head>
      <Hero />
    </Fragment>
  );
}
