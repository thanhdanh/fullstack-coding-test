import { Box } from "@chakra-ui/layout";
import { Flex, Image, Spacer, Text } from "@chakra-ui/react";
import React from "react";

export interface IBlog {
  title: string;
  imageUrl: string;
  imageAlt: string;
  content: string;
  created?: string;
  category: string;
}

interface BlogCardProp {
  data: IBlog;
  onView: () => void;
}

const BlogCard: React.FC<BlogCardProp> = (props) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" onClick={props.onView}>
      <Image src={props.data.imageUrl} alt={props.data.imageAlt} />
      <Box p="6">
        <Flex>
          <Text fontWeight="bold" textTransform="uppercase" fontSize="sm" letterSpacing="wide" color="teal.600">
            {props.data.category}
          </Text>
          <Spacer />
          <Text fontSize="sm" letterSpacing="wide">
            {new Date(props.data.created).toDateString()}
          </Text>
        </Flex>
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
          {props.data.title}
        </Box>
      </Box>
    </Box>
  );
};

export default BlogCard;
