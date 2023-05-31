import Image from "next/image";
import React from "react";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

interface profileCardProps {}

const ProfileCard = (props: profileCardProps) => {
  return (
    <div className="border flex flex-col gap-6 p-2 pb-6">
      <div className="flex flex-col gap-4 items-center">
        {/* <Image src={} /> */}
        <div className="w-full  top-0 h-16 bg-slate-100"></div>
        <div className="w-14 h-14 bg-black rounded-full -mt-10"></div>
        <div className="text-center">
          <p className="font-semibold ">Manish Bisht</p>
          <p className="text-sm text-slate-600">
            Frontend Developer | open souce enthusiast | Freelance Web Developer
            @Fiverr | Hackathons
          </p>
        </div>
        <div className="text-sm text-slate-600">
          <span className="text-slate-900 font-semibold"> 210</span> Followers{" "}
          <span className="text-slate-900 font-semibold">513 </span> Following
        </div>
      </div>

      <div className="flex justify-center gap-4 border-t pt-4">
        <Link
          className={cn(buttonVariants({ variant: "secondary" }))}
          href="/profile"
        >
          <Icons.write className="mr-2 w-4" />
          Profile
        </Link>
        <Link className={cn(buttonVariants({ variant: "outline" }))} href="/">
          <Icons.billing className="mr-2 w-4" />
          Plan
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
