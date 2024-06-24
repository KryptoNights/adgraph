import React from "react";
import { useRouter } from "next/router";
import useDetectDevice from "../../../customhook/useDetectDevice";
import WrapperCard from "../../../components/Card/Card";
import { dummyData } from "@/constant/dummyData";

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    padding: "16px",
  },
};

const Sample: React.FC = () => {
  const res = useDetectDevice();
  const router = useRouter();
  const [address, setAddress] = React.useState("");
  React.useEffect(() => {
    const accounts = localStorage.getItem(
      "-walletlink:https://www.walletlink.org:Addresses"
    );
    if (accounts) {
      setAddress(accounts);
    }
  }, []);
  return (
    <div style={styles.gridContainer}>
      {dummyData.map((item: any, index: number) => {
        return <WrapperCard key={index} data={item} address={address} />;
      })}
    </div>
  );
};

export default Sample;
