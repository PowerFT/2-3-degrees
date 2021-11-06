/**
 * External dependencies
 */
import React, { useState } from 'react';
import { Flex, SimpleGrid } from '@chakra-ui/layout';
/**
 * External dependencies
 */
// import { useAuth } from '../../hooks'
import { MySpinner } from '../waiting/MySpinner';
import { InnerSidebar } from '../layout/InnerSidebar';
import { Header } from '../layout/Header';
import { Content } from '../layout/Content';
import { LikedList } from './LikedList';
import { AppliedList } from './AppliedList';

const TalentJobs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading) return <MySpinner />;
  if (error) return `Error! ${error}`;

  return (
    <>
      <Header title="Liked Opportunities" pagetype="admin" />
      <Flex w="100%">
        <Content>
          <SimpleGrid
            columns={{
              sm: 1,
              md: 2,
              // lg: 3
            }}
            spacing={{
              // sm: 6,
              md: 6,
              lg: 12,
            }}
            p="4"
          >
            <LikedList />
            <AppliedList />
          </SimpleGrid>
        </Content>
      </Flex>
    </>
  );
};

export default TalentJobs;
