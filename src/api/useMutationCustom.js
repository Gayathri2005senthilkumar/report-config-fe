// src/api/useMutationCustom.js
import { useMutation } from "@tanstack/react-query";
import apiFunction from "./apiFunction";

const useMutationCustom = (options, mutationFn = apiFunction) => {
  return useMutation({
    mutationFn,
    ...options,
  });
};

export default useMutationCustom;

