import React from "react";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getCurrentUserPlan } from "@/lib/subscription";

interface profileCardProps {}

const ProfileCard = async (props: profileCardProps) => {
  const session = await getSession();

  if (!session)
    return (
      <div className="border flex flex-col gap-6 p-2 pb-6 items-center">
        <div className="flex flex-col gap-4 items-center">
          <div className="w-full  top-0 h-16 bg-slate-100"></div>
          <div className="w-14 h-14 bg-black rounded-full -mt-10"></div>
          <div className="text-center">
            <p className="font-semibold ">Login Please</p>
            <p className="text-sm text-slate-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
              ipsum dolor sit.
            </p>
          </div>
        </div>
        <div className="text-sm text-slate-600">
          <span className="text-slate-900 font-semibold"> 210</span> Followers{" "}
          <span className="text-slate-900 font-semibold">513 </span> Following
        </div>
        <div className="flex justify-center gap-4 border-t pt-4 w-full">
          <div className="w-1/2 h-10 bg-slate-100 rounded-sm"></div>
          <div className="w-1/2 h-10 bg-slate-100 rounded-sm"></div>
        </div>
      </div>
    );

  const data = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  const subscriptionPlan = await getCurrentUserPlan(data?.id || "");

  return (
    <div className="border flex flex-col gap-6 p-2 pb-6">
      <div className="flex flex-col gap-4 items-center">
        <div className="w-full  top-0 h-16 bg-slate-100"></div>
        <Avatar className="w-16 h-16 -mt-10">
          <AvatarImage
            className="rounded-full overflow-hidden h-fit"
            src={data?.image || ""}
          />
          <AvatarFallback>{data?.name}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <p
            className={cn(
              "font-semibold",
              subscriptionPlan.isPro ? "text-purple-500" : "text-slate-500"
            )}
          >
            {session.user.name}
          </p>
          <p className="text-sm text-slate-600">{data?.bio}</p>
        </div>
        <div className="text-sm text-slate-600">
          <span className="text-slate-900 font-semibold"> 210</span> Followers{" "}
          <span className="text-slate-900 font-semibold">513 </span> Following
        </div>
      </div>

      <div className="flex justify-center gap-4 border-t pt-4">
        <Link
          className={cn(buttonVariants({ variant: "secondary" }))}
          href="/dashboard/edit"
        >
          <Icons.write className="mr-2 w-4" />
          Profile
        </Link>
        <Link
          className={cn(buttonVariants({ variant: "outline" }))}
          href="/dashboard/billing"
        >
          <Icons.billing className="mr-2 w-4" />
          Plan
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
