import ProfileUpdateForm from "@/components/profile-update-form";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const EditProfile = async (props: Props) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <div>
      <h3 className="text-xl md:text-4xl font-bold">Profile</h3>
      <p className="text-slate-400 mt-2">See and edit profile as you like</p>
      <ProfileUpdateForm user={{ id: user.id, name: user.name || "" }} />
    </div>
  );
};

export default EditProfile;
