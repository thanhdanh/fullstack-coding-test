import { HamburgerIcon, SunIcon, LinkIcon } from "@chakra-ui/icons";
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { v4 as uuid4 } from "uuid";
import UserCard from "./UserCard";

const MENU_PAGE = {
  HOMEPAGE: "/",
  BLOG: "/blog",
};

const Navigator = () => {
  const router = useRouter();

  const getMenuItemPropsOfPage = (page: string) => {
    return {
      onClick: () => router.push(page),
      key: uuid4(),
    };
  };

  return (
    <Menu>
      <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} variant="outline" />
      <MenuList>
        <MenuItem icon={<SunIcon />} {...getMenuItemPropsOfPage(MENU_PAGE.HOMEPAGE)}>
          Home
        </MenuItem>
        <MenuItem icon={<LinkIcon />} {...getMenuItemPropsOfPage(MENU_PAGE.BLOG)}>
          Blog
        </MenuItem>
        <UserCard />
      </MenuList>
    </Menu>
  );
};

export default Navigator;
