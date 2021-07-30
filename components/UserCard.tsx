import { ExternalLinkIcon } from "@chakra-ui/icons";
import { MenuButton, MenuItem, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "utils/auth";

const UserCard = () => {
  const auth = useAuth();
  const router = useRouter();
  const toast = useToast();

  const isLogined = !auth.loading && auth.user;
  const handleSignOut = () => {
    auth.signOut();
    toast({
      title: "Logout success",
      description: "See you again.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    router.push("/");
  };

  return (
    <>
      {isLogined ? (
        <MenuItem icon={<ExternalLinkIcon />} onClick={handleSignOut}>Sign out</MenuItem>
      ) : (
        <MenuItem icon={<ExternalLinkIcon />} onClick={() => router.push("/signin")}>Sign in</MenuItem>
      )}
    </>
  );
};

export default UserCard;
