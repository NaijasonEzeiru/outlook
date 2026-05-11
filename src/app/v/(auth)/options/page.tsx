"use client";

import { useRouter } from "next/navigation";

export default function SigninOptions() {
  const router = useRouter();
  return (
    <div className="">
      <h1 className="text-2xl font-semibold text-gray-900 my-3">
        Sign-in options
      </h1>

      <button className="py-3 flex items-center w-full hover:bg-gray-200">
        <img
          className="relative size-12"
          role="presentation"
          src="https://aadcdn.msauth.net/shared/1.0/content/images/credentialoptions/cred_option_github_fa3dbea07d478da8facde73b44f90b02.svg"
          width={48}
          height={48}
          alt="GitHub"
        />
        <p className="px-3 word">Sign in with GitHub</p>
      </button>
      <button className="py-3 flex items-center w-full hover:bg-gray-200">
        <img
          className="relative size-12"
          role="presentation"
          src="https://aadcdn.msauth.net/shared/1.0/content/images/picker_account_aad_c5cbcbb43e61b1347b12589901000621.png"
          width={48}
          height={48}
          alt="GitHub"
        />
        <div className="px-3 text-left">
          <p>Sign in to an organization</p>
          <p className="text-xs">
            Search for a company or an organization you&apos;re working with.
          </p>
        </div>
      </button>
      <button
        className="ml-auto mt-6 bg-black/30 text-foreground py-1 px-3 block hover:bg-black/40 min-w-27 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => router.back()}
      >
        Back
      </button>
    </div>
  );
}
