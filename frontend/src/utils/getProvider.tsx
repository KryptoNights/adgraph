import { useEffect, useState } from "react";
import { ethers } from "ethers";
// import {Provider} from "@ethersproject/providers";
import { JsonRpcProvider } from "ethers";

type ProviderType = JsonRpcProvider;
type SignerType = ethers.Signer | null;

// declare global {
//   interface Window {
//     ethereum: any; // Adjust the type as per your requirement
//   }
// }

const useEthersProviderAndSigner = (): [ProviderType, SignerType] => {
  const [provider, setProvider] = useState<ProviderType>(
    new ethers.JsonRpcProvider(
      "https://arb-sepolia.g.alchemy.com/v2/gdoWsVkAdoopk0ijXAAOtvq-CsXT8PTO"
    )
  );
  const [signer, setSigner] = useState<SignerType>(null);

  useEffect(() => {
    const checkMetaMask = async () => {
      if ((window as any).ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults");
      } else {
        const browserProvider: any = new ethers.BrowserProvider(
          window.ethereum
        );
        const fetchedSigner = await new ethers.BrowserProvider(
          window.ethereum
        ).getSigner();
        setProvider(browserProvider);
        setSigner(fetchedSigner);
      }
    };

    checkMetaMask();
    return () => {};
  }, []);

  return [provider, signer];
};

export default useEthersProviderAndSigner;
