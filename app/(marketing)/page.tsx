import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="container">
      <section className="min-h-[calc(100vh-8rem)] text-center gap-2 flex justify-center items-center flex-col">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          Share your code
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Beautifully designed components that you can copy and paste into your
          apps. Accessible. Customizable. Open Source.
        </p>
        <div className="mt-3 flex gap-4">
          <button className={cn(buttonVariants())}>Get started</button>
          <button className={cn(buttonVariants({ variant: "outline" }))}>
            <Icons.gitHub className="mr-2 w-4" />
            Github
          </button>
        </div>
      </section>
    </div>
  );
};

export default page;
