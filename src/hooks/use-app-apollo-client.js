import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';
// import { BatchHttpLink } from '@apollo/client/link/batch-http';
import fetch from "cross-fetch";

const link = new createUploadLink({
  uri: process.env.GATSBY_WORDPRESS_API_URL,
  credentials: 'include',
  fetch,
});

const cache = new InMemoryCache({})

export const UseAppApolloClient = () => {
  return new ApolloClient({
    link,
    cache
  });
}