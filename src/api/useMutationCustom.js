import { useMutation } from "@tanstack/react-query";
import apiFunction from "./apiFunction";

const useMutationCustom = (props, mutationFn=apiFunction) => {
    return useMutation({
    mutationFn: mutationFn,
    ...props
  });
}
export default useMutationCustom;