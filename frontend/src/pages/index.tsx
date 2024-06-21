import React from "react";
import useDetectDevice from "../../customhook/useDetectDevice";
import { useRouter } from "next/router";
import ProfileList from "../../components/Profile/Profile";

const index: React.FC = () => {
  const res = useDetectDevice();
  const router = useRouter();

  const styles = {
    container: {
      height: "100%",
    },
  };

  return (
    <div style={styles.container}>
      <ProfileList />
    </div>
  );
};

export default index;
