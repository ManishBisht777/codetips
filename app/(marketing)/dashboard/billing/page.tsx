import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

const Billing = (props: Props) => {
  return (
    <div>
      <h3 className="text-xl md:text-4xl font-bold">Billing</h3>
      <p className="text-slate-400 mt-2">
        Manage billing and subscription plan
      </p>

      <div className="flex gap-4 p-4 border rounded-sm mt-4">
        <Icons.warning className="w-8 h-8" />
        <div>
          <p>This is a demo app.</p>
          <div>
            <span className="font-bold mr-1">Tipsycode</span> app is a demo app
            using a Stripe test environment. You can find a list of test card
            numbers on the
            <a
              className="font-bold underline underline-offset-1 mx-1"
              href="https://stripe.com/docs/testing#cards"
            >
              Stripe docs.
            </a>
          </div>
        </div>
      </div>

      <div className="mt-4 border rounded-sm p-4 flex flex-col items-start">
        <h3 className="text-lg md:text-xl font-bold">Subscription Plan</h3>
        <p className="text-slate-400 text-sm">
          You are currently on the{" "}
          <span className="mx-[.15rem] font-bold">Free </span>
          plan.
        </p>
        <p className="my-4">
          The free plan is limited to 3 posts. Upgrade to the PRO plan for
          unlimited posts.
        </p>
        <button className={cn(buttonVariants())}>Upgrade To Pro</button>
      </div>
    </div>
  );
};

export default Billing;
