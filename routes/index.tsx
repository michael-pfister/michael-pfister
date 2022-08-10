/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import {Head} from "$fresh/runtime.ts";

const sytles = {
    hero: {
      marginTop: "10%",
      display: "flex",
      alignItems: "center",
      gap: "5rem",
      flexWrap: "wrap",
    }
}

const title = "🔥 Michael Pfister - Full Stack Web Developer";

export default function Home() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="stylesheet" href="/normalize.css" />
        <link rel="stylesheet" href="/skeleton.css" />
      </Head>
      <section class="container" style={sytles.hero}>
        <h1>
          Hi,<br />
          I'm Michael Pfister.
        </h1>
        <img src="snapshot.png" alt="a picture of me" width="400px"/>
      </section>
    </>
  );
}
