import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import { Button, CircularProgress } from "@mui/material";
import Image from "next/image";
import AdGraphLogo from "public/AdGraphLogo.png";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import { useRouter } from "next/router";
import { useCBWSDK } from "@/context/CBWSDKReactContextProvider";
import "@coinbase/onchainkit/styles.css";
import { setWalletInfo } from "@/store/slice/walletinfo";
import { useAccount, useDisconnect } from "wagmi";
const Header = () => {
  const { address, status } = useAccount();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [loading, setLoading] = useState(false);
  const [accountsChanged, setAccountsChanged]: any = React.useState(null);
  const [chainChanged, setChainChanged] = React.useState<
    Record<string, unknown> | string | number | null
  >(null);
  const [message, setMessage] = React.useState<
    Record<string, unknown> | string | number | null
  >(null);
  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const { provider }: any = useCBWSDK();
  const [connected, setConnected] = React.useState(
    Boolean(provider?.connected)
  );

  useEffect(() => {
    const accounts = localStorage.getItem(
      "-walletlink:https://www.walletlink.org:Addresses"
    );
    setWalletInfo({
      address: accounts,
    });
    console.log("connec", accounts);
    if (accounts) {
      setConnected(true);
      setAccountsChanged(accounts);
    }
  }, []);

  const handleConnect = async () => {
    setLoading(true);
    console.log("connn", provider);
    console.log("connn2");
    await provider.enable();
    setConnected(true);
    const tt = localStorage.getItem(
      "-walletlink:https://www.walletlink.org:Addresses"
    );
    setWalletInfo(tt);
    console.log("connn2", tt);
    setAccountsChanged(tt);
    setLoading(false);
  };

  const handleDisconnect = async () => {
    setLoading(true);
    await provider.disconnect();
    localStorage.clear();
    setLoading(false);
  };

  const router = useRouter();
  const handleRedirect = () => {
    router.push("/");
  };

  React.useEffect(() => {
    console.log("add", address);
  });

  return (
    <div className={show ? styles.container : styles.ncontainer}>
      <div className={styles.subContainer1}>
        <Image
          src={AdGraphLogo}
          alt={"BuildFi"}
          width={180}
          height={40}
          onClick={handleRedirect}
          className="cursor-pointer"
          style={{ filter: "invert(0)", borderRadius: "8px" }}
        />
      </div>

      {loading ? (
        <CircularProgress />
      ) : connected ? (
        <>
          {accountsChanged && accountsChanged[0] && (
            <div
              className="flex h-10 items-center space-x-4"
              onClick={handleDisconnect}
            >
              <Avatar
                address="0x838aD0EAE54F99F1926dA7C3b6bFbF617389B4D9"
                showAttestation
              />
              <div className="flex flex-col text-sm">
                <b>
                  <Name address={accountsChanged} />
                </b>
                <Name address={accountsChanged} showAddress />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleConnect}
          >
            Connect
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
