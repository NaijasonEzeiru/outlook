import { useMutation } from "@tanstack/react-query";
import { logUserData, registerUser } from "./fetchers";

export function useRegisterUser() {
  return useMutation({
    mutationFn: registerUser,
  });
}

export function useLogUserData() {
  return useMutation({
    mutationFn: logUserData,
  });
}
