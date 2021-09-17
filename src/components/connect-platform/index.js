import * as React from 'react'
import { Stack } from '@chakra-ui/react'
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';

import { MySpinner } from '../waiting/MySpinner'
import { useAuth } from '../../hooks'
import { AccountProgress } from './AccountProgress'
import { ConnectJobsTagsBlock } from './ConnectJobTagsBlock'
import { ConnectBlogBlock } from './ConnectBlogBlock'
import { ConnectHero } from './ConnectHero'
import { Features } from './Features'

const getUser = (query) => {
  const fallback = '';

  if (query) {
    const { user } = queryString.parse(query);
    // Ensure a valid expected value is passed
    if (user) {
      //console.log('link query returned')
      return user;
    }
    //console.log('parsing didnt work')
    return fallback;
  }
  //console.log('location.search doesnt exsit')
  return fallback;
};

export const ConnectPlatform = () => {

  const location = useLocation();
  const user = location.search ? getUser(location.search) : null;

  //console.log("user: ", user)

  const { viewer, loadingViewer } = useAuth()

  if (loadingViewer || !viewer) {
    return (
      <MySpinner />
    )
  }

  if(!viewer) (navigate('/'))

  const userType = user || viewer.roles.nodes[0].name

  const users = {
    maker: {
      inputs: [viewer.firstName, viewer.lastName, viewer.nickname, viewer.description, viewer.url],
      limit: 5,
      completed: [viewer.firstName, viewer.lastName, viewer.nickname, viewer.description, viewer.url].filter(input => input).length
    },
    talent: {
      inputs: [viewer.firstName, viewer.lastName],
      limit: 2,
      completed: [viewer.firstName, viewer.lastName].filter(input => input).length
    }
  } //change

  //console.log("users: ",users)
  //console.log("userType: ",userType)

  const limit = users[userType]?.limit
  const completed = users[userType]?.completed
  const complete = Boolean(limit === completed)

  //console.log(limit, completed, complete)

  return (
    <Stack as="section" h="full" spacing="12" py="6" align="center">

      <AccountProgress
        limit={limit}
        completed={completed}
        complete={complete}
        user={userType}
        
      />
      
      <ConnectHero
        user={userType}
        marginTop="0 !important"
      />

      <Features 
        complete={complete}
        user={userType}
      />

      <ConnectJobsTagsBlock />

      <ConnectBlogBlock
        user={userType} 
      />

    </Stack>
  )
}
