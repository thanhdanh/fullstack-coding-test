import React, { createRef, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import DynamicText, { IDynamicTextComp } from "components/DynamicText";
import { Flex, Input, Spinner } from "@chakra-ui/react";
import { useAuth } from "utils/auth";

const Home = () => {
  const { user, loading } = useAuth();
  const dynamicTextRef = createRef<IDynamicTextComp>();
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dynamicTextRef.current.changeValue(e.target.value);
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading]);

  return (
    <Flex minHeight="100vh" padding="0 0.5rem" direction="column" justifyContent="center" alignItems="center">
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <Spinner colorScheme={"teal"} thickness="4px" size="xl" />
      ) : (
        <Flex flex="1" padding="5rem 0" direction="column" justifyContent="center" alignItems="center">
          <DynamicText ref={dynamicTextRef} />
          <Input onChange={onChange} />
        </Flex>
      )}
    </Flex>
  );
};

export default Home;
