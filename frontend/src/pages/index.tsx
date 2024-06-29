import Head from "../../components/Head/Head";
import Features from "../../components/features";
import Hero from "../../components/hero";
import Newsletter from "../../components/newsletter";
import Testimonials from "../../components/testinomical";
import Zigzag from "../../components/zigzag";

export default function Home() {
  return (
    <>
      <Head
        title="AdGraph"
        description="Open, decentralized on-chain graph of user preferences"
      />
      <Hero />
      <Zigzag />
      <Features />
    </>
  );
}
