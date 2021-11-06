import { VStack } from '@chakra-ui/react';
import React from 'react';

// import { Layout } from "../../components/layout/Layout"
import Seo from '../../components/seo';
import AllLayouts from '../../components/AllLayouts';

const Page = ({ pageContext }) => {
  //console.log(pageContext)

  const pageBuilder = pageContext.page?.pageBuilder;

  const layouts = pageBuilder.layouts || [];

  // console.log(layouts)

  return (
    <>
      <VStack id="page" h="fit-content" spacing="-1px" w="100%" align="stretch">
        <Seo title={pageContext.page?.title} />
        {/* {pageContext.page.title && (
          <Heading size="4xl" color="gray.800" p="8">{pageContext.page.title}</Heading>
        )} */}

        {layouts?.map((layout, index) => {
          return <AllLayouts key={index} layoutData={layout} id="pageLayout" />;
        })}
      </VStack>
    </>
  );
};

export default Page;
