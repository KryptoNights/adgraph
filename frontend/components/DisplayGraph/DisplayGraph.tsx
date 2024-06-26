"use client";
import { useEffect } from "react";
import Graph from "graphology";
import { useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import dynamic from "next/dynamic";

const SigmaContainer = dynamic(
  () => import("@react-sigma/core").then((mod) => mod.SigmaContainer),
  { ssr: false }
);

// const useLoadGraph = dynamic(
//   () => import("@react-sigma/core").then((mod) => mod.useLoadGraph),
//   { ssr: false }
// );

const sigmaStyle = {
  height: "800px",
  width: "1200px",
  display: "flex",
  justifyContent: "center",
  background: "white",
  borderRadius: "8px",
  color: "white",
  labelColor: "#fff",
};

export const LoadGraph = ({ appNames, Tags }: { appNames: any; Tags: any }) => {
  const loadGraph = useLoadGraph();
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  useEffect(() => {
    if (appNames) {
      const graph = new Graph();

      appNames.forEach((appName: any, index: any) => {
        const appColor = getRandomColor();
        graph.addNode(appName, {
          x: Math.random(),
          y: Math.random(),
          size: 15,
          label: appName,
          color: appColor,
          labelColor: "#fff",
        });

        // Add the associated tags as nodes and connect them to the app name
        Tags[index].forEach((tag: any) => {
          // Ensure the tag node is unique
          if (!graph.hasNode(tag)) {
            graph.addNode(tag, {
              x: Math.random(),
              y: Math.random(),
              size: 10,
              label: tag,
              color: "#40A4FA",
              labelColor: "#fff",
            });
          }

          // Add an edge between the app name and the tag
          graph.addEdge(appName, tag);
        });
      });

      loadGraph(graph);
    }
  }, [appNames, Tags, loadGraph]);

  return null;
};

export const DisplayGraph = ({
  appNames,
  Tags,
}: {
  appNames: any;
  Tags: any;
}) => {
  return (
    <>
      {appNames && (
        <SigmaContainer style={sigmaStyle}>
          <LoadGraph appNames={appNames} Tags={Tags} />
        </SigmaContainer>
      )}
    </>
  );
};
