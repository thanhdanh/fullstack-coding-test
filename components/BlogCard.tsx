import { Box } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";
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
    <Box 
      width={{ base: "100%", sm: "100%", md: "50%" }}
      borderWidth="1px" borderRadius="lg"
      onClick={props.onView}
    >
      <Image src={props.data.imageUrl} alt={props.data.imageAlt} />
      <Box p="6">
          <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="sm"
            letterSpacing="wide"
            color="teal.600"
        >
          {props.data.category}
        </Text>
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
          {props.data.title}
        </Box>
      </Box>
    </Box>
  );
};

export default BlogCard;
