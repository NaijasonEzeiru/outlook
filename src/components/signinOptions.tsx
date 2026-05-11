import Image from "next/image";

export default function SigninOptions() {
  return (
    <div className=" bg-white mx-auto sm:shadow-lg max-w-110 w-full sm:w-[calc(100vw-20px)] p-6 h-90 sm:h-auto sm:p-11 min-w-[320px] relative overflow-hidden">
      <img
        role="img"
        src="https://aadcdn.msauth.net/shared/1.0/content/images/microsoft_logo_564db913a7fa0ca42727161c6d031bef.svg"
        alt="Microsoft"
        width={100}
        height={100}
        className="max-w-[256px] h-6"
      />
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
      <button className="ml-auto mt-6 bg-black/30 text-foreground py-1 px-3 block hover:bg-black/40 min-w-27 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Back
      </button>
    </div>
  );
}
