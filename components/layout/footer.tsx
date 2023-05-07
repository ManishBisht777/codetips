import React from "react";
import { Icons } from "../icons";

type Props = {};

function Footer({}: Props) {
  return (
    <footer className="container flex gap-4 p-6">
      <Icons.logo />
      <p className="flex gap-1">
        Built by
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          manish bisht
        </a>
        Inspired By
        <a
          href=""
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          shadcn.
        </a>
        Hosted on
        <a
          href=""
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          Vercel.
        </a>
        Illustrations by
        <a
          href=""
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          Popsy.
        </a>
        The source code is available on
        <a
          href=""
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          Github.
        </a>
      </p>
    </footer>
  );
}

export default Footer;
