import React from 'react';
import { Link, graphql } from 'gatsby';

import { BlogGrid } from '../components/blog/BlogGrid';
import { BlogCard } from '../components/blog/BlogCard';
import { Header } from '../components/layout/Header';
import { Content } from '../components/layout/Content';

// import Bio from "../components/bio"
// import Layout from "../components/layout"
// import Seo from "../components/seo"

const BlogIndex = ({
  data: { all },
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = all.nodes;
  // const storyPosts = stories.nodes;

  if (!posts.length) {
    return (
      <>
        {/* <Seo title="All posts" />
        <Bio /> */}
        <p>No resources found.</p>
      </>
    );
  }

  return (
    <>
      {/* <Seo title="All posts" />

      <Bio /> */}
      <Header
        title="Connect Platform Resources"
        subTitle="Exclusive resources for Connect Platform members"
        pagetype="admin"
      />
      <Content pb="10">
        <BlogGrid isarchive>
          {posts?.map((post, i) => (
            <BlogCard postData={post} connectBlog i={i} />
          ))}
        </BlogGrid>
      </Content>

      {/* <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.title

          return (
            <li key={post.uri}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.uri} itemProp="url">
                      <span itemProp="headline">{parse(title)}</span>
                    </Link>
                  </h2>
                  <small>{post.date}</small>
                </header>
                <section itemProp="description">{parse(post.excerpt)}</section>
              </article>
            </li>
          )
        })}
      </ol> */}

      {previousPagePath && (
        <>
          <Link to={previousPagePath}>Previous page</Link>
          <br />
        </>
      )}
      {nextPagePath && <Link to={nextPagePath}>Next page</Link>}
    </>
  );
};

export default BlogIndex;

export const archiveQuery = graphql`
  query ConnectPostArchive($offset: Int!, $postsPerPage: Int!) {
    all: allWpPost(
      filter: {
        categories: { nodes: { elemMatch: { slug: { eq: "connect" } } } }
      }
      sort: { fields: [date], order: DESC }
      limit: $postsPerPage
      skip: $offset
    ) {
      nodes {
        excerpt
        uri
        date(formatString: "MMMM DD, YYYY")
        title
        excerpt
        featuredImage {
          node {
            localFile {
              childImageSharp {
                fluid(quality: 90) {
                  src
                  srcSet
                }
                gatsbyImageData(aspectRatio: 1.1)
              }
            }
            altText
          }
        }
      }
    }
  }
`;
