// CodeBlock.js
import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // Import your preferred theme
import styles from "./codeblock.module.css";

const codeString = `
    axios.get('https://hollow-kilobyte-modern.functions.on-fleek.app', {
    params: {
    profile: “0x4bec619bf1834bbe11f334117aca57bf68f0bc2c”,
    app: “shop3”,
    tags: “tag1,tag2,tag3”,
   temporary_api_key: “appkey_testnet”
   }});  
`;
const codeString2 = `
query MyQuery {
  tagAddeds(
    where: {tag_in: ["laptop", "technology", "adgraph"]}
  ) {
    profile
    app
    id
    tag
  }
}

`;
const codeString3 = `
Endpoint: https://api.studio.thegraph.com/proxy/80137/adgraph/v0.0.4/graphql
`;

const CodeBlock = () => {
  const codeRef = useRef(null);
  const codeRef2 = useRef(null);
  const codeRef3 = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [codeString]);
  useEffect(() => {
    if (codeRef2.current) {
      hljs.highlightElement(codeRef2.current);
    }
  }, [codeString2]);
  useEffect(() => {
    if (codeRef3.current) {
      hljs.highlightElement(codeRef3.current);
    }
  }, [codeString3]);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
        <h1 className="h1 mb-4">Guide To Integrate AdGraph</h1>
        <p className="text-xl text-gray-400"></p>
      </div>
      <div className="text-xl text-gray-400 mb-4">
        Integrating AdGraph is easy. You need to make a GET request like:
      </div>
      <div className={styles.boxcode}>
        <pre>
          <code ref={codeRef} className="language-nodejs">
            {codeString}
          </code>
        </pre>
      </div>
      <div className="text-xl text-gray-400 mb-4">
        The params are passed in the URL. For testnet, the temporary_api_key is
        hardcoded, however for mainnet, you’ll be minted an app-specific api
        key, which will keep rotating. The refresh tokens and api keys will be
        handled largely through our SDK which is in development. For accessing
        wallet addresses interested in particular tags, you can use your
        subgraph endpoint for testnet with the following GraphQL query:
      </div>

      <div className={styles.boxcode}>
        <pre>
          <code ref={codeRef2} lang="javascript" className="language-nodejs">
            {codeString2}
          </code>
        </pre>
      </div>
      <div className={styles.boxcode}>
        <pre>
          <code ref={codeRef3} className="language-nodejs">
            {codeString3}
          </code>
        </pre>
      </div>
      <div className="text-xl text-gray-400 mb-4">
        We are working on more diverse and better managed services for AdGraph.
        Keep visiting our docs for further info. Note: This is an alpha product,
        things might break. Active development is going on to help make the
        usage and onboarding easy. We would love to speak with anyone interested
        in it. Mail us at adgraph@debjit.dev for issues you’re facing or
        custom GraphQL queries you need.
      </div>
    </div>
  );
};

export default CodeBlock;
