// CodeBlock.js
import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Import your preferred theme

const CodeBlock = ({ language, value }:any) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [value]);

  return (
    <pre>
      <code ref={codeRef} className={language}>
        {value}
      </code>
    </pre>
  );
};

export default CodeBlock;

// sample use

// const codeString = `
//   import React from 'react';
//   import highlight.js from 'highlight.js';
  
//   const MyComponent = () => {
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//       </div>
//     );
//   };
  
//   export default MyComponent;
//   `;


{/* <CodeBlock language="javascript" value={codeString} /> */}
