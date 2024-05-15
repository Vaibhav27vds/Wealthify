"use client";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
export function TypewriterEffect() {
  const words = [ 
    {
      text: "Lets",
    },
    {
      text: "See",
    },
    {
      text: "The",
    },
    {
      text: "Data",
    },
    {
      text: "Visually.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className=" flex justify-center  ">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
