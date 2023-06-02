import React from "react";
import { Icons } from "../icons";
import { siteConfig } from "@/config/site";

type Props = {};

function Footer({}: Props) {
  return (
    <footer className="container flex gap-4 p-6">
      <Icons.logo />
      <p className="flex gap-1">
        Built by
        <a
          href={siteConfig.links.twitter}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          manish bisht
        </a>
        Inspired By
        <a
          href="https://twitter.com/shadcn"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          shadcn.
        </a>
        Hosted on
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          Vercel.
        </a>
        Illustrations by
        <a
          href="https://popsy.co"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          Popsy.
        </a>
        The source code is available on
        <a
          href={siteConfig.links.github}
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
