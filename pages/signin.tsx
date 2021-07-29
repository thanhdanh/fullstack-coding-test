import React from "react";
import { Flex, Heading } from "@chakra-ui/layout";
import Head from "next/head";
import { Button, Input, InputGroup, InputRightElement, Link, useColorModeValue } from "@chakra-ui/react";

const Login = () => {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <Flex minHeight="100vh" padding="0 0.5rem" justifyContent="center" alignItems="center">
      <Head>
        <title>Sign in</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" flex="1" background={formBackground} p={12} rounded={8} maxW={400}>
        <Heading mb={8}>Login</Heading>
        <Input variant="outline" placeholder="Enter a email" type="email" mb={3} />
        <InputGroup size="md">
          <Input 
            variant="outline" 
            placeholder="Enter a password"
            mb={3} pr="4.5rem" 
            type={show ? "text" : "password"} 
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button colorScheme={"teal"} mb={8}>Login</Button>
        <Flex justifyContent='center' alignItems='center'>
          No account? <Link href="/signup" color="teal.500" ml={1}>Create account</Link>
        </Flex>
      </Flex>
  </Flex>
  )
}

export default Login;
