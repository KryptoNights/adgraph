import React from "react";
import NextHead from "next/head";

interface HeadProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const Head: React.FC<HeadProps> = ({ title, description, children }) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon shortcut" href="/favicon.png" />
      {children}
    </NextHead>
  );
};

export default Head;
