import { Box } from "@chakra-ui/layout";
import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/react";
import React from "react";

const FormErrorMessage = ({ message }: { message: string }) => {
  return (
    <Box my={4}>
      <Alert status="error" borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Box>
  );
};

export default FormErrorMessage;
