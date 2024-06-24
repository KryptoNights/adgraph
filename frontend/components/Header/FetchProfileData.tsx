import { useCallback } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { ABI, CONTRACT } from "@/utils/transitions";

function useFetchProfileData({ profile }: { profile: any }) {
  const appsResponse: any = useReadContract({
    abi: ABI,
    address: CONTRACT,
    functionName: "get_apps",
    args: [profile],
  });
  console.log(appsResponse);

  //   const apps = appsResponse.data;
  //   console.log(appsResponse.data as string);
  //   const map = new Map<string, string[]>();
  //   for (const app of apps) {
  //     const tags_response = useReadContract({
  //       abi: ABI,
  //       address: CONTRACT,
  //       functionName: "get_tags",
  //       args: [profile, app],
  //     });
  //     if (!tags_response.error) {
  //       map.set(app, tags_response.data as string[]);
  //     }
  //   }
  //   console.log(map);
  return { appsResponse };
}

export default useFetchProfileData;
