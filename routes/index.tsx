/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { Head } from "https://deno.land/x/fresh@1.0.2/runtime.ts";
import Terminal from "../islands/Terminal.tsx";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import PullRequestActivityFeed from "../components/PullRequestActivityFeed.tsx";
import AppBar from "../islands/AppBar.tsx";

export interface GitHubPullRequest {
  node: {
    pullRequest: {
      baseRepository: {
        owner: {
          login: string;
        };
        name: string;
        url: string;
      };
      id: string;
      title: string;
      url: string;
      additions: number;
      deletions: number;
      publishedAt: string;
    };
  };
}

export const handler: Handlers<Array<GitHubPullRequest> | undefined> = {
  async GET(_, ctx) {
    const resp = await fetch("https://api.github.com/graphql", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${
          Deno.env.get("GitHubAccessToken") || config().GitHubAccessToken
        }`,
      },

      body: JSON.stringify({
        query: `{
          user(login: "michael-pfister") {
            contributionsCollection {
              pullRequestContributions(first: 3) {
                edges{
                  node{
                    pullRequest{
                      baseRepository {
                        owner{
                          login
                        }
                        name
                        url
                      }
                      id
                      title
                      url
                      additions
                      deletions
                      publishedAt
                    }
                  }
                }
              }
            }
          }
        }`,
      }),
    });
    const events: any = await resp.json();
    return ctx.render(
      events.data.user.contributionsCollection.pullRequestContributions.edges,
    );
  },
};

const pages = [
  {
    title: "About Me",
    href: "#about-me",
  },
  {
    title: "Latest Activity",
    href: "#latest-activity",
  },
  {
    title: "Resume",
    href: "/Michael_Pfister_-_Web_Developer.pdf",
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/michael-pascal-pfister/",
  },
  {
    title: "Twitter",
    href: "https://twitter.com/ScaredToCompile",
  },
  {
    title: "GitHub",
    href: "https://github.com/michael-pfister",
  },
];

function Hero() {
  return (
    <section
      className={tw`flex justify-center items-center m-5 h-screen`}
    >
      <Terminal
        terminalCommand={`echo "Hi I'm Michael, a Web Developer"`}
        terminalOutput={`Hi I'm Michael, a Web Developer`}
      />
    </section>
  );
}

function AboutMe() {
  return (
    <section
      id="about-me"
      class={tw`flex justify-evenly items-center flex-wrap gap-16 pt-[100px] pb-[100px] pr-10 pl-10 bg-black text-white`}
    >
      <div class={tw`max-w-prose`}>
        <h1 class={tw`text-3xl md:text-5xl`}>Nice to meet you! 🤝</h1>
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
        class={tw`w-[200px] md:w-[400px] rounded-full`}
        src="/profile_picture.png"
        alt="me"
      />
    </section>
  );
}

function LatestActivity(
  props: { githubPullRequests: Array<GitHubPullRequest> },
) {
  return (
    <section
      id="latest-activity"
      class={tw`flex justify-center flex-wrap mt-[100px]`}
    >
      <h1 class={tw`text-3xl md:text-5xl w-full text-center m-3`}>
        My Latest Activity
      </h1>
      <PullRequestActivityFeed githubPullRequests={props.githubPullRequests} />
    </section>
  );
}

export default function Home(props: PageProps) {
  return (
    <Fragment>
      <Head>
        <title>Michael Pfister - Web Developer</title>
        <meta name="description" content="Michael Pfister Web Developer"></meta>
        <link
          rel="stylesheet"
          href="https://unpkg.com/octicons@4.4.0/build/font/octicons.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/github-activity-feed@latest/dist/github-activity.min.css"
        />

        <script
          type="text/javascript"
          src="https://unpkg.com/mustache@4.2.0/mustache.min.js"
        >
        </script>
        <script
          type="text/javascript"
          src="https://unpkg.com/github-activity-feed@latest/dist/github-activity.min.js"
        >
        </script>

        <link
          rel="stylesheet"
          href="https://unpkg.com/github-activity-feed@latest/dist/github-activity.dark.min.css"
        >
        </link>
      </Head>
      <AppBar pages={pages} />
      <Hero />
      <AboutMe />
      <LatestActivity githubPullRequests={props.data} />
    </Fragment>
  );
}
