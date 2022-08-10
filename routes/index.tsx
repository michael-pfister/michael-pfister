/** @jsx h */
import { h } from "preact";
import {Head} from "$fresh/runtime.ts";

const sytles = {
    root: {
    }
}

const title = "🔥 Michael Pfister - Full Stack Web Developer";

export default function Home() {
  return (
    <div style={sytles.root}>
      <Head>
        <title>{title}</title>
        <link rel="stylesheet" href="/normalize.css" />
        <link rel="stylesheet" href="/skeleton.css" />
      </Head>
      <h1>hello</h1>
    </div>
  );
}
