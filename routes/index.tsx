/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";
import { Head } from "https://deno.land/x/fresh@1.0.2/runtime.ts";
import Terminal from "../islands/Terminal.tsx";
import GitHubActivity from "https://esm.sh/github-activity-feed@0.3.0";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import GithubActivityFeed from "https://esm.sh/v91/github-activity-feed@0.3.0/deno/github-activity-feed.js";
import PullRequestActivityFeed from "../components/PullRequestActivityFeed.tsx";

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
        "Authorization": `token ${config().GitHubAccessToken}`,
      },

      body: JSON.stringify({
        query: `{
          user(login: "michael-pfister") {
            contributionsCollection {
              pullRequestContributions(last: 3) {
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
    <section class={tw`flex justify-evenly items-center flex-wrap gap-16 m-5`}>
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
    </section>
  );
}

function LatestActivity(
  props: { githubPullRequests: Array<GitHubPullRequest> },
) {
  return (
    <section class={tw`flex justify-center flex-wrap mt-[200px]`}>
      <h1 class={tw`text-5xl w-full text-center`}>My Latest Activity</h1>
      <PullRequestActivityFeed githubPullRequests={props.githubPullRequests} />
    </section>
  );
}

export default function Home(props: PageProps) {
  return (
    <Fragment>
      <Head>
        <title>Michael Pfister - Web Developer</title>
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
      <Hero />
      <AboutMe />
      <LatestActivity githubPullRequests={props.data} />
    </Fragment>
  );
}
