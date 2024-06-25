import React from "react";
import styles from "./profile.module.css";
import { ABI, CONTRACT, get_profile } from "@/utils/transitions";
import { useWriteContract } from "wagmi";
import { DisplayGraph } from "../DisplayGraph/DisplayGraph";
import Loading from "public/giphy.webp";
import Cross from "public/Cross.png";
import Image from "next/image";
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
                      <h3
                        style={{
                          color: "white",
                          fontSize: "24px",
                        }}
                        className={styles.roww}
                      >
                        {item}
                      </h3>
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
        </div>
      )}
    </>
  );
};

export default ProfileList;
