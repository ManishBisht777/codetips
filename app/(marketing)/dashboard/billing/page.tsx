import BillingForm from "@/components/billing-form";
import { Icons } from "@/components/icons";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { stripe } from "@/lib/stripe";
import { getCurrentUserPlan } from "@/lib/subscription";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const Billing = async (props: Props) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const subscriptionPlan = await getCurrentUserPlan(user.id);

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false;
  if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

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

      <BillingForm
        subscriptionPlan={{
          ...subscriptionPlan,
          isCanceled,
        }}
      />
    </div>
  );
};

export default Billing;
