// components/Logo.tsx
"use client";

import { motion } from "framer-motion";

export default function Logo() {
  return (
    <img
      src="https://aadcdn.msauth.net/shared/1.0/content/images/microsoft_logo_564db913a7fa0ca42727161c6d031bef.svg"
      alt="Microsoft Logo"
      //   layoutId="shared-logo"
      width={100}
      height={100}
      className="max-w-[256px] h-6 w-min px-6 sm:px-11 block"
    />
  );
}
