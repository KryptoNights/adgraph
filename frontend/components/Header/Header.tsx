import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../src/store/index";
import Image from "next/image";
import AdGraphLogo from "public/AdGraphLogo.png";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { useRouter } from "next/router";
import { useCBWSDK } from "@/context/CBWSDKReactContextProvider";
import { base } from "viem/chains";
import { useReadContract, useWriteContract } from "wagmi";
import "@coinbase/onchainkit/styles.css";
import { ABI, CONTRACT } from "@/utils/transitions";
import { config } from "@/utils/wagmi";
import { abi } from "./abi";
const Header = () => {
  const { writeContract } = useWriteContract();

  const walletInfo = useSelector((state: RootState) => state.walletInfo);
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
    const accounts = localStorage.getItem(
      "-walletlink:https://www.walletlink.org:Addresses"
    );
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
  const handleRedirect2 = () => {
    router.push("./kyc");
  };
  const handleCreateProject = () => {
    router.push("/create");
  };

  React.useEffect(() => {
    console.log("connec", accountsChanged);
  });
  const [profileData, setProfileData]: any = useState(null);
  const fetchProfileData = async (profile: any) => {
    try {
      const appsResponse: any = await useReadContract({
        abi: ABI,
        address: CONTRACT,
        functionName: "get_apps",
        args: [profile],
      });

      if (!appsResponse.error) {
        const apps = appsResponse.data;
        const map = new Map();
        for (const app of apps) {
          const tagsResponse: any = await useReadContract({
            abi: ABI,
            address: CONTRACT,
            functionName: "get_tags",
            args: [profile, app],
          });
          if (!tagsResponse.error) {
            map.set(app, tagsResponse.data);
          }
        }
        setProfileData(map);
      } else {
        setProfileData(null);
      }
    } catch (error) {
      console.error(error);
      setProfileData(null);
    }
  };

  const handleGetProfile = () => {
    if (accountsChanged.length > 0) {
      fetchProfileData(accountsChanged);
    }
  };
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
            // <button
            //   className="bg-[#ffffff] hover:bg-[#b7b5b5] text-black font-bold py-2 px-8 rounded"
            //   onClick={handleDisconnect}
            // >
            //   {/* 🟢 <Avatar address="0x838aD0EAE54F99F1926dA7C3b6bFbF617389B4D9" /> */}

            //   {`${accountsChanged[0].slice(0, 4)}....${accountsChanged[0].slice(
            //     -4
            //   )}`}
            // </button>

            <div
              className="flex h-10 items-center space-x-4"
              onClick={handleDisconnect}
            >
              <Avatar address={accountsChanged} showAttestation />
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

      <div style={{ cursor: "pointer" }} onClick={handleGetProfile}>
        Get Profile
      </div>

      {/* <button
        onClick={() =>
        
        }
      >
        Transfer
      </button> */}
    </div>
  );
};

export default Header;
