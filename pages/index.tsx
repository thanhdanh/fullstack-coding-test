import React, { createRef } from "react";
import Head from "next/head";
import DynamicText, { IDynamicTextComp } from "components/DynamicText";
import { Flex, Input } from "@chakra-ui/react";

const Home = () => {
  const dynamicTextRef = createRef<IDynamicTextComp>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dynamicTextRef.current.changeValue(e.target.value);
  };
 
  return (
    <Flex minHeight='100vh' padding='0 0.5rem' direction='column' justifyContent='center' alignItems='center'>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex flex='1' padding='5rem 0' direction='column' justifyContent='center' alignItems='center'>
        <DynamicText ref={dynamicTextRef} />
        <Input onChange={onChange} />
      </Flex>
    </Flex>
  );
};

export default Home;
