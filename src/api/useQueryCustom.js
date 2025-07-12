import { useQuery } from "@tanstack/react-query";
import apiFunction from "./apiFunction";

const useQueryCustom = (props, mutationFn=apiFunction) => {
    return useQuery({
    mutationFn: mutationFn,
    ...props
  });
}
export default useQueryCustom;