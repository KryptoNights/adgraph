import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";
import Layout from "../../components/Layout/Layout";
import { store } from "../store/index";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { CBWSDKReactContextProvider } from "@/context/CBWSDKReactContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { base } from "viem/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { wagmiConfig } from "@/utils/wagmi";

const SCHEMA_ID =
  "0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9";
function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isDefaultPage = router.pathname === "/" || router.pathname === "/kyc";
  const containerStyle = isDefaultPage
    ? {
        backgroundColor: "rgba(39, 46, 53, 0)",
        // backgroundImage:
        //   "url(https://assets-global.website-files.com/63996d8b3c061af402fa0609/65c1a9a0012fe086763d8e0c_Illustration.png)",
        backgroundPosition: "0 0",
        backgroundRepeat: "round",
      }
    : {};

  const queryClient = new QueryClient();
  return (
    <main style={containerStyle}>
      <Head>
        <title>AdGraph</title>
        {/* <link
          type="image/png"
          href="https://raw.githubusercontent.com/KryptoNights/adgraph/main/frontend/public/logo.small.ico"
        /> */}
        <link
          rel="preload"
          crossOrigin=""
          href="href=https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Manrope:wght@200&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Outfit:wght@100..900&family=Yeseva+One&family=Zen+Dots&display=swap"
        />

        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        ></meta>
      </Head>
      <div style={{ zIndex: "99999999999999", position: "fixed", top: "0px" }}>
        <NextNProgress color="#9FF6DF" />
      </div>

      <div
        className="flex justify-center"
        style={{
          maxInlineSize: "1408px",
          margin: "auto",
        }}
      >
        <div className="w-full bg-black">
          <CBWSDKReactContextProvider>
            <Provider store={store}>
              <WagmiProvider config={wagmiConfig}>
                <QueryClientProvider client={queryClient}>
                  <OnchainKitProvider
                    chain={base}
                    apiKey="YYqlVcoVORJRbXDQQo9nJewKQD7AmS5H"
                    schemaId={SCHEMA_ID}
                  >
                    <Layout>
                      <Component {...pageProps} />
                      <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                      />
                    </Layout>
                  </OnchainKitProvider>
                </QueryClientProvider>
              </WagmiProvider>
            </Provider>
          </CBWSDKReactContextProvider>
        </div>
      </div>
    </main>
  );
}
export default App;
