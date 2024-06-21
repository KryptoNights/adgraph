import React from "react";
import useDetectDevice from "../../customhook/useDetectDevice";
import { useRouter } from "next/router";
import WrapperCard from "../../components/Card/Card";

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    padding: "16px",
  },
};

const index: React.FC = () => {
  const res = useDetectDevice();
  const router = useRouter();

  return (
    <div style={styles.gridContainer}>
      <WrapperCard />
      <WrapperCard />
      <WrapperCard />
    </div>
  );
};

export default index;
