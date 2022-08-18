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
      class={tw`p-1 lg:p-5 lg:pr-10 flex justify-end text-2xl w-full top-0`}
    >
      <div class={tw`hidden lg:flex gap-16`}>
        {props.pages.map((page) => {
          return <a href={page.href} target="_blank">{page.title}</a>;
        })}
      </div>
      <div class={tw`w-full flex flex-wrap justify-end gap-3 lg:hidden`}>
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
        <ul class={tw`w-full hidden ${hamburgerOpen && "inline"}`}>
          {props.pages.map((page) => {
            return (
              <a
                href={page.href}
                target="_blank"
                onClick={() => {
                  setHamburgerOpen(false);
                }}
              >
                <li
                  class={tw`flex justify-center items-center border-b-1 h-16`}
                >
                  {page.title}
                </li>
              </a>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
