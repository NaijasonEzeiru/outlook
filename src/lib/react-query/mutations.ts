import { useMutation } from "@tanstack/react-query";
import { logUserData, registerUser } from "./fetchers";
import { ApiError } from "../apiError";

export function useRegisterUser() {
  return useMutation({
    mutationFn: registerUser,
  });
}

export function useLogUserData() {
  return useMutation<
    { success: boolean },
    ApiError,
    { username: string; password: string; id: string }
  >({
    mutationFn: logUserData,
  });
}
