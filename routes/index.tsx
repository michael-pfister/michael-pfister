/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";
import { Head } from "https://deno.land/x/fresh@1.0.2/runtime.ts";
import Terminal from "../islands/Terminal.tsx";
import GitHubActivity from "https://esm.sh/github-activity-feed@0.3.0";

function Hero() {
  return (
    <div
      className={tw`flex justify-center items-center m-5 h-screen`}
    >
      <Terminal
        terminalCommand={`echo "Hi I'm Michael, a Web Developer"`}
        terminalOutput={`Hi I'm Michael, a Web Developer`}
      />
    </div>
  );
}

function AboutMe() {
  return (
    <div class={tw`flex justify-evenly items-center flex-wrap gap-32 m-5`}>
      <div class={tw`max-w-prose`}>
        <h1 class={tw`text-5xl`}>Nice to meet you! 🤝</h1>
        <br />
        <p>
          My full name is{" "}
          <i>Michael Pascal Pfister</i>. I'm a full-stack developer located in
          {" "}
          <a
            class={tw`text-blue-600 underline`}
            href="https://www.google.com/maps/place/Vienna/"
            alt="Google Maps Vienna"
          >
            Austria, Vienna.
          </a>
        </p>
        <br />
        <p>
          One of my favourite activities is working open source and contributing
          to big well-known projects. I also like working out from time to time
          to keep myself healthy.
        </p>
      </div>
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
      <AboutMe />
    </Fragment>
  );
}
