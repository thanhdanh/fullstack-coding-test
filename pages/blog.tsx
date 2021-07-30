import React from "react";
import {
  Flex,
  SimpleGrid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
} from "@chakra-ui/react";
import BlogCard, { IBlog } from "components/BlogCard";
import Head from "next/head";
import { db } from "utils/firebaseAdmin";
import { useState } from "react";
import { v4 as uuid4 } from "uuid";

const Blogs: React.FC<{ blogsData: IBlog[] }> = ({ blogsData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [blogViewing, setBlogViewing] = useState<IBlog>(null);

  const onClose = () => {
    setIsOpen(false);
    setBlogViewing(null);
  }

  const handleOnViewBlog = (blog: IBlog) => {
    setBlogViewing(blog);
    setIsOpen(true);
  }

  return (
    <Flex minHeight="100vh" padding="0 0.5rem" direction="column" justifyContent="center" alignItems="center">
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" flex="1" p={12}>
        <Heading mb={8}>Blogs</Heading>
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} gap={6}>
          {blogsData.map((blog) => (
            <BlogCard data={blog} onView={() => handleOnViewBlog(blog)} key={uuid4()} />
          ))}
        </SimpleGrid>
      </Flex>
      <Modal isCentered size="xl" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{blogViewing?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Flex mb={10}>
            <Text fontWeight="bold" textTransform="uppercase" fontSize="sm" letterSpacing="wide" color="teal.600">
              {blogViewing?.category}
            </Text>
            <Spacer />
            <Text fontSize="sm" letterSpacing="wide">
              {new Date(blogViewing?.created).toDateString()}
            </Text>
          </Flex>
            {blogViewing?.content}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export async function getStaticProps() {
  const blogs = await db.collection("blog").orderBy("created", "desc").get();
  const blogsData = blogs.docs.map((blog) => {
    const { created, ...rest } = blog.data();
    return {
      id: blog.id,
      created: created?.toMillis(),
      ...rest,
    };
  });

  return {
    props: { blogsData },
    revalidate: 10,
  };
}

export default Blogs;
