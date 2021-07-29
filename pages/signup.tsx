import React, { useState } from "react";
import Head from "next/head";
import { Button, Flex, FormControl, FormLabel, Heading, Input, useColorModeValue, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import FormErrorMessage from "components/ErrorMessage";
import { useAuth } from "auth/auth";
import { useRouter } from "next/router";

interface ISignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

type FormError = Partial<ISignupFormValues>;

const validate = (values: ISignupFormValues) => {
  const errors: FormError = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Password should be of minimum 8 characters length';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Password does not match';
  }
  return errors;
}

const Signup = () => {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const { signUp } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const [signUperror, setSignUpError] = useState(null);

  const formik = useFormik<ISignupFormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        setSignUpError(null);
        await signUp(values.email, values.password);
        toast({
          position: "top",
          title: 'Signup new account',
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.push('/');
      } catch (error) {
        setSignUpError(error.message);
      }
    },
  });

  return (
    <Flex minHeight="100vh" padding="0 0.5rem" justifyContent="center" alignItems="center">
      <Head>
        <title>Sign up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" flex="1" background={formBackground} p={8} rounded={8} maxW={450}>
        <Heading mb={8}>Create new account</Heading>
        {signUperror && <FormErrorMessage message={signUperror} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl isRequired mb={3}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input 
              variant="outline" 
              placeholder="danhvt0109@gmail.com" 
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && <FormErrorMessage message={formik.errors.email} />}
          </FormControl>
          <FormControl isRequired mb={3}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              variant="outline" 
              placeholder="********" 
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && <FormErrorMessage message={formik.errors.password} />}
          </FormControl>
          <FormControl id="confirmPassword" isRequired mb={3}>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input 
              variant="outline" placeholder="********" 
              type="password"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && <FormErrorMessage message={formik.errors.confirmPassword} />}
          </FormControl>
          <Button colorScheme={"teal"} width="full" type="submit" isLoading={formik.isSubmitting}>Sign Up</Button>
        </form>
      </Flex>
    </Flex>
  )
}

export default Signup;
