import React from "react";
import useDetectDevice from "../../customhook/useDetectDevice";
import { useRouter } from "next/router";

// const StyledProductImg = styled("img")(({ width, style }) => ({
//   width: width || "25%", // Default width is 25% if width prop is not provided
//   height: "fill",
//   objectFit: "cover",
//   position: "relative",
//   className: style || "",
// }));

const index = () => {
  const res = useDetectDevice();
  const router = useRouter();

  return (
    <>
      <div
        className="max-w-6xl "
        style={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          marginTop: "16vh",
          overflow: "hidden",
        }}
      >
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="heading-hero gradient-1"
            style={{
              zIndex: 1,
              textAlign: "center",
              whiteSpace: "normal",
              WebkitTextFillColor: "transparent",
              backgroundColor: "#fafafa",
              backgroundImage: "linear-gradient(135deg, #fff 38%, #828282)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              marginTop: 0,
              marginBottom: 0,
              paddingTop: 0,
              fontSize: "4em",
              fontWeight: 700,
              lineHeight: "120%",
              position: "relative",
              width: "972px",
              height: "100%",
              margin: "20px 0px",
            }}
          >
            Buidling something new or looking for good projects?
          </div>
          <p
            className="text-description-18px"
            style={{
              color: "#828282",
              maxWidth: "86ch",
              fontSize: "1.625em",
              fontWeight: 300,
              lineHeight: "1.5em",
              padding: "40px 4px",
            }}
          >
            You can invest on startups as well as list your startup/project for
            funding.
          </p>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a
            className="div-btn-2 hover:bg-red-500"
            style={{
              color: "#fff",
              backgroundColor: "#171719",
              border: "1px solid #ab00ff",
              borderRadius: "1000px",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "max-content",
              marginTop: 0,
              padding: "12px 24px",
              lineHeight: 2,
              display: "inline-block",
              fontSize: "1.5rem",
            }}
            href="/kyc"
          >
            Developer
          </a>
          <a
            className="div-btn"
            style={{
              border: "1px solid #000",
              borderRadius: "1000px",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "max-content",
              marginTop: 0,
              marginLeft: "15px",
              padding: "12px 24px",
              lineHeight: 2,
              display: "inline-block",
              color: "#000",
              backgroundColor: "#fff",
              fontSize: "1.5rem",
            }}
            href="/projects"
          >
            Investor
          </a>
        </div>
      </div>
    </>
  );
};

export default index;
