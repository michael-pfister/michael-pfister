/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { useEffect, useState } from "preact/hooks";

interface TerminalProps {
  terminalCommand: string;
  terminalOutput: string;
}

export default function Terminal(props: TerminalProps) {
  const [liveCommand, setLiveCommand] = useState("");
  const [liveCommandActive, setLiveCommandActive] = useState(true);
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      setLiveCommand(props.terminalCommand.slice(0, count));
      count++;
      if (count > props.terminalCommand.length) {
        clearInterval(interval);
        setLiveCommandActive(false);
      }
    }, 100);
  }, []);
  return (
    <div>
      <div class={tw`w-full bg-gray-900 rounded-t p-2 flex gap-3 justify-end`}>
        <div class={tw`w-[20px] h-[20px] rounded-full bg-[lime]`} />
        <div class={tw`w-[20px] h-[20px] rounded-full bg-[yellow]`} />
        <div class={tw`w-[20px] h-[20px] rounded-full bg-[red]`} />
      </div>
      <div
        class={tw`bg-gray-900 bg-opacity-80 text-white p-5 rounded-b md:text-xl lg:text-2xl`}
      >
        <span class={tw`text-green-500`}>admin@DESKTOP-6DUI86H&ensp;</span>
        <span class={tw`text-[magenta]`}>MINGW64&ensp;</span>
        <span class={tw`text-yellow-200`}>
          ~/Downloads/michael-pfister&ensp;
        </span>
        <span class={tw`text-[cyan]`}>(main)</span>
        <h1>$ {liveCommand}{liveCommandActive && <span>&#9611;</span>}</h1>
        {!liveCommandActive && <h1>{props.terminalOutput}</h1>}
      </div>
    </div>
  );
}
