import React from "react";
import styles from "./profile.module.css";
import { ABI, CONTRACT, get_profile } from "@/utils/transitions";
import { useWriteContract } from "wagmi";
// import { DisplayGraph } from "../DisplayGraph/DisplayGraph";
import Loading from "public/giphy.webp";
import Cross from "public/Cross.png";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useCBWSDK } from "@/context/CBWSDKReactContextProvider";

const DisplayGraph = dynamic(
  () => import("../DisplayGraph/DisplayGraph").then((mod) => mod.DisplayGraph),
  { ssr: false }
);

const tagColors: any = {
  0: "#d1c4e9",
  1: "#b2fab4",
  2: "#ffcc80",
  3: "#ffab91",
  4: "#ffe082",
  5: "#b3e5fc",
};

const getRandomColor = (index: number) => {
  return tagColors[index % 6];
};

const ProfileList = () => {
  const { writeContract } = useWriteContract();
  const [loading, setLoading] = React.useState(false);
  const [tags, setTagsData]: any = React.useState([]);
  const [mapOfTag, setMapOfTag]: any = React.useState({});
  const [appName, setAppName]: any = React.useState([]);
  const [accountsChanged, setAccountsChanged]: any = React.useState(null);
  React.useEffect(() => {
    const accounts = localStorage.getItem(
      "-walletlink:https://www.walletlink.org:Addresses"
    );
    console.log("connec", accounts);
    if (accounts) {
      setAccountsChanged(accounts);
    }
  }, []);

  React.useEffect(() => {
    const fetchdata = async (accountsChanged: any) => {
      setLoading(true);
      console.log("accountsChanged", accountsChanged, typeof accountsChanged);
      const profile = await get_profile(String(accountsChanged));
      console.log("getprofile", profile);
      setMapOfTag(profile);
      let arr: any[] = [];
      let arr2: any[] = [];
      profile.forEach((key: any, value: any) => {
        arr.push(key);
        arr2.push(value);
      });
      setAppName(arr2);
      setTagsData(arr);
      setLoading(false);
    };
    if (accountsChanged != null) fetchdata(accountsChanged);
  }, [accountsChanged]);

  const { provider }: any = useCBWSDK();
  const handleConnect = async () => {
    setLoading(true);
    console.log("connn2");
    await provider.enable();
    const tt = localStorage.getItem(
      "-walletlink:https://www.walletlink.org:Addresses"
    );
    setAccountsChanged(tt);
    setLoading(false);
  };

  React.useEffect(() => {
    console.log("profileData", tags[0]);
  }, [tags, appName]);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            marginTop: "20%",
          }}
        >
          <Image src={Loading} width={800} height={800} alt={""} />
        </div>
      ) : (
        <div className={styles.profileList}>
          <div className={styles.wrapper}>
            <div className={styles.box1}>
              {/* <DisplayGraph /> */}
              {appName &&
                appName.map((item: any, indexMain: number) => {
                  return (
                    <div className={styles.ProfileName}>
                      <div
                        style={{
                          color: "white",
                          fontSize: "24px",
                        }}
                        className={styles.roww}
                      >
                        {item}
                        <div
                          onClick={() => {
                            console.log("inside");
                            writeContract({
                              abi: ABI,
                              address: CONTRACT,
                              functionName: "block_app",
                              args: [accountsChanged, item],
                            });
                            console.log("exec");
                          }}
                          className={styles.block}
                        >
                          Block App
                        </div>
                      </div>
                      <div className={styles.profileTags}>
                        {tags[indexMain].map((tag: any, index: any) => (
                          <>
                            <span
                              key={index}
                              className={styles.tag}
                              style={{
                                backgroundColor: getRandomColor(Number(index)),
                              }}
                              onClick={() => {
                                console.log("inside");
                                console.log("inside", accountsChanged);
                                writeContract({
                                  abi: ABI,
                                  address: CONTRACT,
                                  functionName: "remove_tag_from_profile",
                                  args: [accountsChanged, item, tag],
                                });
                                console.log("exec");
                              }}
                            >
                              {tag}

                              <Image
                                src={Cross}
                                width={15}
                                height={15}
                                alt={"cross"}
                              />
                            </span>
                          </>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {appName.length > 0 ? (
            <div>
              <DisplayGraph appNames={appName} Tags={tags} />
            </div>
          ) : (
            <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
              {/* Section header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                <h1 className="h1 mb-4" data-aos="fade-up">
                  Open, decentralized on-chain graph of user preferences
                </h1>
                <br />
                <p
                  className="text-xl text-gray-400 mb-8"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  As social and commerce shift onchain, wallets become
                  identities. AdGraph builds onchain profiles of wallet
                  addresses, capturing likes and preferences across all web3
                  apps they use
                </p>

                {accountsChanged === null ? (
                  <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                    <div data-aos="fade-up" data-aos-delay="400">
                      <div
                        className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0 cursor-pointer"
                        onClick={handleConnect}
                      >
                        Connect Smart Wallet to Access Your Profile
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                    <div data-aos="fade-up" data-aos-delay="400">
                      <a
                        className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0"
                        href="/sample"
                      >
                        Add Your Prefrences from Shop
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileList;
