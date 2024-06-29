import { CoinbaseWalletSDK as CoinbaseWalletSDK403 } from "@coinbase/wallet-sdk-4.0.3";
import React, { useEffect, useMemo } from "react";

type CBWSDKProviderProps = {
  children: React.ReactNode;
};

const CBWSDKReactContext = React.createContext({});

export const sdkVersions = ["4.0.3", "3.9.3", "3.7.2"] as const;

declare global {
  interface Window {
    setPopupUrl: (url: string) => void;
  }
}

if (typeof window !== "undefined") {
  window.setPopupUrl = (url: string) => {
    const communicator = (window?.ethereum as any).communicator;
    if (communicator) {
      communicator.url = new URL(url);
    }
  };
}

export function CBWSDKReactContextProvider({ children }: CBWSDKProviderProps) {
  const [sdk, setSdk] = React.useState(null);
  const [provider, setProvider] = React.useState(null);

  useEffect(() => {
    let cbwsdk: any;
    let preference;

    cbwsdk = new CoinbaseWalletSDK403({
      appName: "addGraph",

      appChainIds: [84532, 8452],
      appLogoUrl:
        "https://raw.githubusercontent.com/KryptoNights/adgraph/main/frontend/public/logo.small.ico",
    });
    preference = { options: "all" };
    setSdk(cbwsdk);

    if (!cbwsdk) return;
    const cbwprovider = cbwsdk.makeWeb3Provider(preference);
    cbwprovider.on("disconnect", () => {
      location.reload();
    });
    window.ethereum = cbwprovider;
    setProvider(cbwprovider);
  }, []);

  useEffect(() => {
    window.setPopupUrl?.("https://keys.coinbase.com/connect");
  }, [sdk]);

  const ctx = useMemo(
    () => ({
      sdk,
      provider,
    }),
    [sdk, provider]
  );

  return (
    <CBWSDKReactContext.Provider value={ctx}>
      {children}
    </CBWSDKReactContext.Provider>
  );
}

export function useCBWSDK() {
  const context: any = React.useContext(CBWSDKReactContext);
  if (context === undefined) {
    throw new Error("useCBWSDK must be used within a CBWSDKProvider");
  }
  return context;
}
