import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../src/store/index";
import Image from "next/image";
import BuildFI from "public/Build.png";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { useRouter } from "next/router";
import { useCBWSDK } from "@/context/CBWSDKReactContextProvider";
import { base } from "viem/chains";

import "@coinbase/onchainkit/styles.css";

const Header = () => {
  const walletInfo = useSelector((state: RootState) => state.walletInfo);
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [DeveloperExists, setDeveloperExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [connect, setConnect] = React.useState<
    Record<string, unknown> | string | number | null
  >(null);
  const [disconnect, setDisconnect] = React.useState<
    Record<string, unknown> | string | number | null
  >(null);
  const [accountsChanged, setAccountsChanged]: any = React.useState([]);
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
    const accounts = localStorage.getItem("-CBWSDK:SCWStateManager:accounts");
    if (accounts) {
      setConnected(true);
      setAccountsChanged(JSON.parse(accounts));
    }
  }, []);

  const handleConnect = async () => {
    setLoading(true);
    console.log("connn");
    if (!provider?.connected) {
      console.log("connn2");
      await provider.enable();
      setConnected(true);
      const tt = localStorage.getItem("-CBWSDK:SCWStateManager:accounts");
      if (tt) setAccountsChanged(JSON.parse(tt));
    } else {
      await provider.disconnect();
      localStorage.clear();
    }
    setLoading(false);
  };

  const handleDisconnect = async () => {
    setLoading(true);
    if (provider) {
      await provider.disconnect();
    }
    localStorage.clear();
    setLoading(false);
  };

  const router = useRouter();
  const handleRedirect = () => {
    router.push("/");
  };
  const handleRedirect2 = () => {
    router.push("./kyc");
  };
  const handleCreateProject = () => {
    router.push("/create");
  };

  return (
    <div className={show ? styles.container : styles.ncontainer}>
      <div className={styles.subContainer1}>
        <Image
          src={BuildFI}
          alt={"BuildFi"}
          width={180}
          height={40}
          onClick={handleRedirect}
          className="cursor-pointer"
          style={{ filter: "invert(1)", borderRadius: "8px" }}
        />
        <a href="/projects">Projects</a>
        <a
          href="/kyc"
          className="text-[16px]/[0px] cursor-pointer"
          onClick={handleRedirect2}
        >
          Looking for Funding?{" "}
        </a>
        {router.pathname === "/projects" && DeveloperExists && (
          <button
            className="bg-[#ffffff] hover:bg-[#b7b5b5] text-black font-bold py-2 px-4 rounded"
            onClick={handleCreateProject}
          >
            Create Project
          </button>
        )}
      </div>

      {loading ? (
        <CircularProgress />
      ) : connected ? (
        <>
          {accountsChanged && accountsChanged[0] && (
            // <button
            //   className="bg-[#ffffff] hover:bg-[#b7b5b5] text-black font-bold py-2 px-8 rounded"
            //   onClick={handleDisconnect}
            // >
            //   {/* 🟢 <Avatar address="0x838aD0EAE54F99F1926dA7C3b6bFbF617389B4D9" /> */}

            //   {`${accountsChanged[0].slice(0, 4)}....${accountsChanged[0].slice(
            //     -4
            //   )}`}
            // </button>

            <div className="flex h-10 items-center space-x-4">
              <Avatar address={accountsChanged[0]} showAttestation />
              <div className="flex flex-col text-sm">
                <b>
                  <Name address={accountsChanged[0]} />
                </b>
                <Name address={accountsChanged[0]} showAddress />
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
