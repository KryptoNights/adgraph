import React from "react";
import { useRouter } from "next/router";
import useDetectDevice from "../../../customhook/useDetectDevice";
import WrapperCard from "../../../components/Card/Card";

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

  return (
    <div style={styles.gridContainer}>
      <WrapperCard />
      <WrapperCard />
      <WrapperCard />
    </div>
  );
};

export default Sample;
