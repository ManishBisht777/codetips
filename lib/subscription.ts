//@ts-nocheck

import { UserSubscriptionPlan } from "@/types";
import { prisma } from "./db";
import { freePlan, proPlan } from "@/config/subscription";

export async function getCurrentUserPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPro =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd &&
    user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now();

  const plan = isPro ? proPlan : freePlan;

  return {
    ...plan,
    ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime() as number,
    isPro,
  };
}
