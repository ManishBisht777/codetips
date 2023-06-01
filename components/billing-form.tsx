"use client";

import { cn, formatDate } from "@/lib/utils";
import React, { FormEvent } from "react";
import { buttonVariants } from "./ui/button";
import { UserSubscriptionPlan } from "@/types";
import { toast } from "./ui/use-toast";
import { Icons } from "./icons";

interface BillingProps {
  subscriptionPlan: UserSubscriptionPlan & {
    isCanceled: boolean;
  };
}

const BillingForm = ({ subscriptionPlan }: BillingProps) => {
  const [isLoading, setIsLoading] = React.useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(!isLoading);

    // Get a Stripe session URL.
    const response = await fetch("/api/user/stripe");

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Please refresh the page and try again.",
        variant: "destructive",
      });
    }

    // Redirect to the Stripe session.
    const session = await response.json();
    if (session) {
      window.location.href = session.url;
    }
  }

  return (
    <div className="mt-4 border rounded-sm p-4 flex flex-col items-start">
      <h3 className="text-lg md:text-xl font-bold">Subscription Plan</h3>
      <p className="text-slate-400 text-sm">
        You are currently on the{" "}
        <span className="mx-[.15rem] font-bold">{subscriptionPlan.name} </span>
        plan.
      </p>
      <p className="my-4">{subscriptionPlan.description}</p>
      <form
        action=""
        onSubmit={onSubmit}
        className="flex justify-between items-center w-full"
      >
        <button type="submit" className={cn(buttonVariants())}>
          {isLoading && <Icons.spinner className="mr-1 animate-spin w-4 h-4" />}
          {subscriptionPlan.isPro ? "Manage Subscription" : "Upgrade to PRO"}
        </button>
        {subscriptionPlan.isPro ? (
          <p className="rounded-full text-xs font-medium mt-2">
            {subscriptionPlan.isCanceled
              ? "Your plan will be canceled on "
              : "Your plan renews on "}
            {formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.
          </p>
        ) : null}
      </form>
    </div>
  );
};

export default BillingForm;
