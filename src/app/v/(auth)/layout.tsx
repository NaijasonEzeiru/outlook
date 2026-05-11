// app/(auth)/layout.tsx
"use client";

import { LayoutGroup } from "framer-motion";
import AnimatedWrapper from "./AnimatedWrapper";
import { ReactNode } from "react";
import Footer from "@/components/footer";
import { FullPageLoading } from "@/components/loading";
import { useMutationState } from "@tanstack/react-query";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pendingMutations = useMutationState({
    filters: {
      status: "pending",
    },
  });

  const isPending = pendingMutations.length > 0;
  return (
    <LayoutGroup>
      <div className="flex flex-col flex-1 items-center text-foreground sm:justify-center bg-zinc-50 font-sans dark:bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("https://aadcdn.msauth.net/shared/1.0/content/images/backgrounds/4_eae2dd7eb3a55636dc2d74f4fa4c386e.svg")`,
          }}
        ></div>
        <div className="w-full relative sm:bottom-10">
          <div className="space-y-4 bg-white mx-auto sm:shadow-lg max-w-110 w-full sm:w-[calc(100vw-20px)] p-6 sm:h-auto sm:p-11 min-w-[320px] relative">
            {isPending && <FullPageLoading message="" />}
            <img
              role="img"
              src="https://aadcdn.msauth.net/shared/1.0/content/images/microsoft_logo_564db913a7fa0ca42727161c6d031bef.svg"
              alt="Microsoft"
              width={100}
              height={100}
              className="max-w-[256px] h-6"
            />
            <AnimatedWrapper>{children}</AnimatedWrapper>
          </div>
        </div>
        <Footer />
      </div>
    </LayoutGroup>
  );
}
