import { VStack } from '@chakra-ui/react';
import React from 'react';

import Seo from '../../components/seo';
import AllLayouts from '../../components/AllLayouts';

const Page = ({ pageContext }) => {
  const pageBuilder = pageContext.page?.pageBuilder;

  const layouts = pageBuilder.layouts || [];

  return (
    <>
      <VStack id="page" h="fit-content" spacing="-1px" w="100%" align="stretch">
        <Seo title={pageContext.page?.title} />

        {layouts.map((layout, idx) => {
          return <AllLayouts key={idx} layoutData={layout} id="pageLayout" />;
        })}
      </VStack>
    </>
  );
};

export default Page;
