import React from "react";
import {
  Flex,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import BlogCard, { IBlog } from "components/BlogCard";
import Head from "next/head";
import { db } from "utils/firebaseAdmin";
import { useState } from "react";

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
        <Grid gap={6}>
          {blogsData.map((blog) => (
            <BlogCard data={blog} onView={() => handleOnViewBlog(blog)} />
          ))}
        </Grid>
      </Flex>
      <Modal isCentered size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{blogViewing?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {blogViewing?.content}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export async function getStaticProps() {
  const blogs = await db.collection("blog").orderBy("created", "desc").get();
  console.log("blogs.docs", blogs.docs.length);
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
