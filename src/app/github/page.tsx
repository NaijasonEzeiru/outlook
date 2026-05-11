import Footer from "./footer";

export default function GitHubPage() {
  return (
    <div className="application-main bg-[#0d1117] text-white flex items-center flex-col min-h-screen">
      <main className="p-4 w-full gap-4 flex flex-col sm:w-96 mx-auto">
        <div className="text-center pt-8">
          <div className="mb-3 size-24 rounded-full flex justify-center items-center bg-white mx-auto">
            <img
              className="max-w-7/12 max-h-6/12 h-auto"
              alt="Microsoft-Corporation logo"
              width="50"
              height="50"
              src="https://avatars.githubusercontent.com/oa/681659?s=120&amp;u=5ece5e24b504743451c921c17fe20ca31d71c90f&amp;v=4"
            />
          </div>
          <p className="mb-2.5">
            Sign in to <strong>GitHub</strong>
            <br />
            to continue to <strong>Microsoft-Corporation</strong>
          </p>
        </div>
        <form className="flex flex-col gap-4 text-sm w-full">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="login_field">
              Username or email address{" "}
            </label>
            <input
              type="text"
              name="login"
              id="login_field"
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="username"
              className="w-full h-10 text-lg border border-[#3d444d] bg-[#0d1117] px-3 py-1 rounded-md"
              required={true}
            />
          </div>

          <div className="relative">
            <label className="block mb-1 font-semibold" htmlFor="password">
              Password{" "}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full h-10 text-lg border border-[#3d444d] bg-[#0d1117] px-3 py-1 rounded-md"
              autoComplete="current-password"
              required={true}
            />
            <a
              className="absolute text-[#4493f8] top-0 right-0"
              id="forgot-password"
              href="/password_reset"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="button"
            className="w-full bg-green-700 hover:bg-green-600 focus:outline-none h-10 px-3 py-1 rounded-md"
          >
            Sign in
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
