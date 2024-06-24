// useCustomWriteContract.js
import { useWriteContract, useReadContract } from "wagmi";

const useCustomWriteContract = () => {
  const { writeContract } = useWriteContract();

  return writeContract;
};

export default useCustomWriteContract;
