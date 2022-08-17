/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { GitHubPullRequest } from "../routes/index.tsx";

export default function PullRequestActivityFeed(
  props: { githubPullRequests: Array<GitHubPullRequest> },
) {
  return (
    <div class={tw`m-5`}>
      {props.githubPullRequests.map((githubPullRequest) => {
        return (
          <div
            key={githubPullRequest.node.pullRequest.id}
            class={tw`mb-10 flex flex-wrap items-center gap-3 justify-center sm:justify-start`}
          >
            <a href="https://github.com/michael-pfister">
              <img
                class={tw`w-16 rounded-full`}
                src="/screenfetch.png"
                alt="my github profile"
              />
            </a>
            <ul class={tw`list-none text-center sm:text-left`}>
              <li>
                <a
                  class={tw`underline text-2xl`}
                  href={githubPullRequest.node.pullRequest.baseRepository.url}
                >
                  {githubPullRequest.node.pullRequest.baseRepository.owner
                    .login}/{githubPullRequest.node.pullRequest.baseRepository
                    .name}
                </a>
              </li>
              <li>
                <a href={githubPullRequest.node.pullRequest.url}>
                  {githubPullRequest.node.pullRequest.title}{" "}
                  ({new Date(githubPullRequest.node.pullRequest.publishedAt)
                    .toLocaleDateString()})
                </a>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
