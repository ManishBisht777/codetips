import ProfileUpdateForm from "@/components/profile-update-form";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React, { use } from "react";

type Props = {};

const EditProfile = async (props: Props) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const data = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  return (
    <div>
      <h3 className="text-2xl md:text-4xl font-bold">Profile</h3>
      <p className="text-slate-400 md:mt-2">See and Edit Profile as you like</p>
      <ProfileUpdateForm
        user={{ id: user.id, name: user.name || "", bio: data?.bio || "" }}
      />
    </div>
  );
};

export default EditProfile;
