import { ChakraProvider } from "@chakra-ui/react";
import Navigator from "components/Navigator";
import { AuthUserProvider } from "utils/auth";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthUserProvider>
      <ChakraProvider>
        <Navigator />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthUserProvider>
  );
};

export default MyApp;
