"use client";

import React from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Icons } from "./icons";
import { userSchema } from "@/lib/validation/user";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "./ui/use-toast";
import { User } from "@prisma/client";

interface ProfileUpdateFormProps {
  user: Pick<User, "id" | "name">;
}

type FormData = z.infer<typeof userSchema>;

const ProfileUpdateForm = ({ user }: ProfileUpdateFormProps) => {
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || "",
    },
  });

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api/user/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
      }),
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your name was not updated. Please try again.",
        variant: "destructive",
      });
    }

    toast({
      description: "Your name has been updated.",
    });
  }

  return (
    <form
      className="w-full p-4 border rounded-sm flex flex-col gap-2 items-start mt-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="">
        <label className="font-semibold text-lg" htmlFor="name">
          Your Name
        </label>
        <p>
          Please enter your full name or a display name you are comfortable with
        </p>
        <Input id="name" className="mt-2" {...register("name")} />
      </div>
      <div className="">
        <label className="font-semibold text-lg" htmlFor="bio">
          Your Bio
        </label>
        <p>Please enter your full Bio to show who you are</p>
        <Textarea id="bio" className="mt-2" />
      </div>
      <button type="submit" className={cn(buttonVariants(), "mt-6 px-6")}>
        {isSaving && <Icons.spinner className="w-4 h-4 animate-spin mr-1" />}
        Save
      </button>
    </form>
  );
};

export default ProfileUpdateForm;
