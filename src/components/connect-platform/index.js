import * as React from 'react';
import { Stack } from '@chakra-ui/react';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';

import { MySpinner } from '../waiting/MySpinner';
import { useAuth } from '../../hooks';
import { AccountProgress } from './AccountProgress';
import { ConnectJobsTagsBlock } from './ConnectJobTagsBlock';
import { ConnectBlogBlock } from './ConnectBlogBlock';
import { ConnectHero } from './ConnectHero';
import { Features } from './Features';
import { ConnectDownloads } from './ConnectDownload';

const getUser = (query) => {
  const fallback = '';

  if (query) {
    const { user } = queryString.parse(query);
    // Ensure a valid expected value is passed
    if (user) {
      return user;
    }
    return fallback;
  }
  return fallback;
};

export const ConnectPlatform = () => {
  const location = useLocation();
  const user = location.search ? getUser(location.search) : null;

  const { viewer, loadingViewer } = useAuth();

  if (loadingViewer || !viewer) {
    return <MySpinner />;
  }

  if (!viewer) navigate('/');

  const userType = user || viewer.roles.nodes[0].name;

  const users = {
    maker: {
      inputs: [
        viewer.firstName,
        viewer.lastName,
        viewer.nickname,
        viewer.description,
        viewer.url,
      ],
      limit: 5,
      completed: [
        viewer.firstName,
        viewer.lastName,
        viewer.nickname,
        viewer.description,
        viewer.url,
      ].filter((input) => input).length,
    },
    talent: {
      inputs: [viewer.firstName, viewer.lastName, viewer.dob, viewer.postcode],
      limit: 4,
      completed: [
        viewer.firstName,
        viewer.lastName,
        viewer.dob,
        viewer.postcode,
      ].filter((input) => input).length,
    },
  };

  const limit = users[userType]?.limit;
  const completed = users[userType]?.completed;
  const complete = Boolean(limit === completed);

  return (
    <Stack as="section" h="full" spacing="0" pb="6" align="center">
      <AccountProgress
        limit={limit}
        completed={completed}
        complete={complete}
        user={userType}
      />

      <ConnectHero user={userType} marginTop="0 !important" />

      <Features
        complete={complete}
        user={userType}
        limit={limit}
        completed={completed}
      />
      <ConnectJobsTagsBlock />
      <ConnectDownloads />
      <ConnectBlogBlock user={userType} />
    </Stack>
  );
};
