import { useEffect } from "react";
import Graph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

const sigmaStyle = {
  height: "800px",
  width: "1200px",
  display: "flex",
  justifyContent: "center",
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
    const graph = new Graph();

    appNames.forEach((appName: any, index: any) => {
      // Add the app name as a node
      const appColor = getRandomColor();
      graph.addNode(appName, {
        x: Math.random(),
        y: Math.random(),
        size: 15,
        label: appName,
        color: appColor,
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
          });
        }

        // Add an edge between the app name and the tag
        graph.addEdge(appName, tag);
      });
    });

    loadGraph(graph);
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
    <SigmaContainer style={sigmaStyle}>
      <LoadGraph appNames={appNames} Tags={Tags} />
    </SigmaContainer>
  );
};
