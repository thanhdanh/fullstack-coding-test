import { ChakraProvider } from "@chakra-ui/react"
import { AuthUserProvider } from "auth/auth";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthUserProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthUserProvider>
  );
};

export default MyApp;
