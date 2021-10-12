const path = require(`path`)
const chunk = require(`lodash/chunk`)

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {

  // const layoutsData = getAllLayoutsData()

  const posts = await getPosts(gatsbyUtilities)
  const jobPosts = await getJobPosts(gatsbyUtilities)
  const pages = await getPages(gatsbyUtilities)

  // if(!posts.length && !jobPosts.length && !pages.length) {
  //   return
  // }

  if (posts.length) {
    await createPostPages({ posts, gatsbyUtilities })
    await createPostArchive({ posts, gatsbyUtilities })
  }

  if (jobPosts.length) {
    await createJobPostPages({ jobPosts, gatsbyUtilities })
  }

  if (pages?.length) {
    await createPagePages({ pages, gatsbyUtilities })
  }

}

const createPostPages = async ({ posts, gatsbyUtilities }) => {
 return Promise.all(
   posts?.map(({ previous, post, next }) =>
     gatsbyUtilities.actions.createPage({
       path: `/blog${post.uri}`,
       component: path.resolve(`./src/templates/post.js`),
       context: {
         // we need to add the post id here
         // so our blog post template knows which blog post
         // the current page is (when you open it in a browser)
         id: post.id,

         // We also use the next and previous id's to query them and add links!
         previousPostId: previous ? previous.id : null,
         nextPostId: next ? next.id : null,
       },
     })
   )
 )
}

const createJobPostPages = async ({ jobPosts, gatsbyUtilities }) => {
  return Promise.all(
    jobPosts?.map(({ jobPost }) =>
      gatsbyUtilities.actions.createPage({
        path: `/connect/jobs/${jobPost.id}`,
        component: path.resolve(`./src/templates/job-post.js`),
        context: {
          id: jobPost.id,
        },
      })
    )
  )
}

const createPagePages = async ({ pages, gatsbyUtilities }) => {

  const getPagePath = page => {
    // if (page.isFrontPage) {
    //   return '/'
    // }
    return page.uri
  }

  return Promise.all(
    pages?.map(({ page }) =>
      gatsbyUtilities.actions.createPage({
        path: getPagePath(page),
        component: path.resolve("./src/templates/page/index.js"),
        context: {
          id: page.id,
          page
        },
      })
    )
  )
}

const getPages = async ({ graphql, reporter }) => {

  const pagesData = await graphql(`
  query WpPages {
    allWpPage {
      edges {
        page: node {
          uri
          title
          id
          pageBuilder {
            layouts {
              ... on WpPage_Pagebuilder_Layouts_FixedHomepageHero {
                fieldGroupName
                textColour
                bgCol
                button {
                  title
                  url
                }
              }
              ... on WpPage_Pagebuilder_Layouts_FixedTalentHalfHero {
                fieldGroupName
                textColour
                bgCol
              }
              ... on WpPage_Pagebuilder_Layouts_FixedMakerHalfHero {
                fieldGroupName
                textColour
                bgCol
              }
              ... on WpPage_Pagebuilder_Layouts_FullHero {
                fieldGroupName
                bgCol
                bgPatternCol
                titleColour
                subTitleColour
                buttonColour
                text
                title
                button {
                  title
                  url
                }
                image {
                  altText
                  localFile {
                    childImageSharp {
                      fluid(quality: 90) {
                        src
                        srcSet
                        aspectRatio
                      }
                      gatsbyImageData
                    }
                  }
                }
              }
              ... on WpPage_Pagebuilder_Layouts_HalfHero {
                fieldGroupName
                bgCol
                bgPatternCol
                titleColour
                subTitleColour
                buttonColour
                text
                title
                imageSide
                button {
                  title
                  url
                }
                image {
                  altText
                  localFile {
                    childImageSharp {
                      fluid(fit: COVER, quality: 90) {
                        src
                        srcSet
                        aspectRatio
                      }
                      gatsbyImageData
                    }
                  }
                }
              }
              ... on WpPage_Pagebuilder_Layouts_Tabs {
                fieldGroupName
                tabsCol
                tabHeaderBgCol
                textColour
                title
                tabs {
                  title
                  subTitle
                  button {
                    title
                    url
                  }
                  text
                  list {
                    text
                  }
                  image {
                    altText
                    localFile {
                      childImageSharp {
                      fluid(quality: 90) {
                        src
                        srcSet
                        aspectRatio
                      }
                      gatsbyImageData
                    }
                    }
                  }
                }
              }
              ... on WpPage_Pagebuilder_Layouts_Pillars {
                fieldGroupName
                bgCol
                bgPatternCol
                textColour
                title
                pillars {
                  title
                  text
                  videoimage
                  video
                  link {
                    url
                    title
                  }
                  image {
                    altText
                    localFile {
                      childImageSharp {
                        fluid(quality: 90, cropFocus: CENTER) {
                          src
                          srcSet
                          aspectRatio
                        }
                        gatsbyImageData(aspectRatio: 1)
                      }
                    }
                  }
                }
              }
              ... on WpPage_Pagebuilder_Layouts_Quote {
                fieldGroupName
                quoteAuthor
                quoteText
                bgCol
                bgPatternCol
                textColour
              }
              ... on WpPage_Pagebuilder_Layouts_LogoGrid {
                fieldGroupName
                bgCol
                textColour
              }
              ... on WpPage_Pagebuilder_Layouts_Blog {
                fieldGroupName
                blogPosts {
                  ... on WpPost {
                    id
                    uri
                    title
                    date(fromNow: true)
                    content
                    categories {
                      nodes {
                        name
                        uri
                      }
                    }
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
              ... on WpPage_Pagebuilder_Layouts_Newsletter {
                fieldGroupName
                bgCol
                text
              }
              ... on WpPage_Pagebuilder_Layouts_PageBlock {
                fieldGroupName
                headerBgCol
                textColour
                content
                subTitle
                title
                image {
                  altText
                  localFile {
                    childImageSharp {
                      fluid(quality: 90) {
                        src
                        srcSet
                        aspectRatio
                      }
                      gatsbyImageData
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
    
  `)

  if (pagesData.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      pagesData.errors
    )
    return
  }

  return pagesData.data.allWpPage.edges
}


const createPostArchive = async ({ posts, gatsbyUtilities }) => {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings

  const postsChunkedIntoArchivePages = chunk(posts, postsPerPage)
  const totalPages = postsChunkedIntoArchivePages.length

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (_posts, index) => {
      const pageNumber = index + 1

      const getPagePath = page => {
        if (page > 0 && page <= totalPages) {
          // Since our homepage is our blog page
          // we want the first page to be "/" and any additional pages
          // to be numbered.
          // "/blog/2" for example
          return page === 1 ? `/blog` : `/blog/${page}`
        }

        return null
      }

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),

        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/post-archive.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          offset: index * postsPerPage,

          // We need to tell the template how many posts to display too
          postsPerPage,

          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
        },
      })
    })
  )
}

const getJobPosts = async ({ graphql, reporter }) => {
  const graphqlResult = await graphql(`
    query WpJobPosts {
      allWpJobPost(sort: {order: ASC, fields: date}) {
        edges {
          jobPost: node {
            uri
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpJobPost.edges
}

const getPosts = async ({ graphql, reporter }) => {
  const graphqlResult = await graphql(`
    query WpPosts {
      allWpPost(sort: {order: ASC, fields: date}) {
        edges {
          previous {
            databaseId
            id
            uri
          }
          post: node {
            uri
            databaseId
            id
          }
          next {
            databaseId
            uri
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPost.edges
}

// Create pages for all Talent / Maker URLs

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/talent/) || page.path.match(/^\/maker/) || page.path.match(/^\/connect/)) {
    if (page.path.match(/^\/talent/)) {
      page.matchPath = `/talent/*`
    }
    if (page.path.match(/^\/maker/)) {
      page.matchPath = `/maker/*`
    }
    if (page.path.match(/^\/connect/)) {
      page.matchPath = `/connect/*`
    }

    // Update the page.
    createPage(page)
  }
}