/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";

export default function AppBar(
  props: { pages: Array<{ title: string; href: string }> },
) {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <header
      class={tw`p-1 lg:p-5 pr-5 lg:pr-10 flex justify-end text-2xl border-b-2 fixed w-screen top-0 bg-white`}
    >
      <div class={tw`hidden lg:flex gap-16`}>
        {props.pages.map((page) => {
          return <a href={page.href}>{page.title}</a>;
        })}
      </div>
      <div class={tw`flex gap-3 lg:hidden`}>
        <ul class={tw`hidden ${hamburgerOpen && "inline"}`}>
          {props.pages.map((page) => {
            return (
              <li>
                <a href={page.href}>{page.title}</a>
              </li>
            );
          })}
        </ul>
        <button
          onClick={() => {
            setHamburgerOpen(!hamburgerOpen);
          }}
        >
          <img
            class={tw`w-[50px]`}
            src="/hamburger_menu.svg"
            alt="hamburger menu"
          />
        </button>
      </div>
    </header>
  );
}
