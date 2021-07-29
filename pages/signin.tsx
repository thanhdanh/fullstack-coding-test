import React, { useState } from "react";
import { Flex, Heading } from "@chakra-ui/layout";
import Head from "next/head";
import { useRouter } from 'next/router';
import { Button, FormControl, Input, InputGroup, InputRightElement, Link, toast, useColorModeValue, useToast } from "@chakra-ui/react";
import { useAuth } from "auth/auth";
import FormErrorMessage from "components/ErrorMessage";
import { useFormik } from "formik";

interface ISignInFormValues {
  email: string;
  password: string;
}

type FormError = Partial<ISignInFormValues>;

const validate = (values) => {
  const errors: FormError = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
}

const Login = () => {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const [show, setShow] = React.useState(false);
  const [signInerror, setSignInError] = useState(null);
  const { signIn } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const handleClick = () => setShow(!show);
  const formik = useFormik<ISignInFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        setSignInError(null);
        const authUser = await signIn(values.email, values.password);
        const displayName = authUser.user.displayName || authUser.user.email;
        toast({
          position: "top",
          title: "Logged in successful",
          description: `Welcome back. ${displayName}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } catch (error) {
        setSignInError(error.message);
      }
    }
  })

  return (
    <Flex minHeight="100vh" padding="0 0.5rem" justifyContent="center" alignItems="center">
      <Head>
        <title>Sign in</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" flex="1" background={formBackground} p={12} rounded={8} maxW={400}>
        <Heading mb={8}>Login</Heading>
        {signInerror && <FormErrorMessage message={signInerror} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl isRequired mb={3}>
            <Input 
              variant="outline"
              placeholder="Enter a email" 
              type="email"
              {...formik.getFieldProps("email")} 
            />
          {formik.touched.email && formik.errors.email && <FormErrorMessage message={formik.errors.email} />}
          </FormControl>
          <FormControl isRequired mb={3}>
            <InputGroup size="md">
              <Input
                variant="outline"
                placeholder="Enter a password"
                pr="4.5rem"
                type={show ? "text" : "password"}
                {...formik.getFieldProps("password")} 
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {formik.touched.password && formik.errors.password && <FormErrorMessage message={formik.errors.password} />}
          </FormControl> 
          <Button type="submit" colorScheme={"teal"} mb={8} isFullWidth isLoading={formik.isSubmitting}>
            Login
          </Button>
        </form>

        <Flex justifyContent="center" alignItems="center">
          No account?{" "}
          <Link href="/signup" color="teal.500" ml={1}>
            Create account
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
