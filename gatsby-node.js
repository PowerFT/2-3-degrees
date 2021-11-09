// const path = require(`path`);
// const chunk = require(`lodash/chunk`);

// /**
//  * exports.createPages is a built-in Gatsby Node API.
//  * It's purpose is to allow you to create pages for your site! 💡
//  *
//  * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
//  */
// exports.createPages = async (gatsbyUtilities) => {
//   // const layoutsData = getAllLayoutsData()

//   const posts = await getPosts(gatsbyUtilities);
//   const connectPosts = await getConnectPosts(gatsbyUtilities);
//   const jobPosts = await getJobPosts(gatsbyUtilities);
//   const applications = await getApplications(gatsbyUtilities);
//   const pages = await getPages(gatsbyUtilities);

//   // if(!posts.length && !jobPosts.length && !pages.length) {
//   //   return
//   // }

//   if (posts.length) {
//     await createPostPages({ posts, gatsbyUtilities });
//     await createPostArchive({ posts, gatsbyUtilities });
//   }

//   if (connectPosts.length) {
//     await createConnectPostPages({ connectPosts, gatsbyUtilities });
//     await createConnectPostArchive({ connectPosts, gatsbyUtilities });
//   }

//   if (jobPosts.length) {
//     await createJobPostPages({ jobPosts, gatsbyUtilities });
//   }

//   if (applications.length) {
//     await createApplicationPages({ applications, gatsbyUtilities });
//     await createApplicationsArchive({ applications, gatsbyUtilities });
//   }

//   if (pages.length) {
//     await createPagePages({ pages, gatsbyUtilities });
//   }
// };

// const createPostPages = async ({ posts, gatsbyUtilities }) => {
//   return Promise.all(
//     posts?.map(({ previous, post, next }) =>
//       gatsbyUtilities.actions.createPage({
//         path: `/blog${post.uri}`,
//         component: path.resolve(`./src/templates/post.js`),
//         context: {
//           // we need to add the post id here
//           // so our blog post template knows which blog post
//           // the current page is (when you open it in a browser)
//           id: post.id,

//           // We also use the next and previous id's to query them and add links!
//           previousPostId: previous ? previous.id : null,
//           nextPostId: next ? next.id : null,
//         },
//       })
//     )
//   );
// };

// const createConnectPostPages = async ({ connectPosts, gatsbyUtilities }) => {
//   return Promise.all(
//     connectPosts?.map(({ previous, post, next }) =>
//       gatsbyUtilities.actions.createPage({
//         path: `/connect/blog${post.uri}`,
//         component: path.resolve(`./src/templates/connect-post.js`),
//         context: {
//           // we need to add the post id here
//           // so our blog post template knows which blog post
//           // the current page is (when you open it in a browser)
//           id: post.id,

//           // We also use the next and previous id's to query them and add links!
//           previousPostId: previous ? previous.id : null,
//           nextPostId: next ? next.id : null,
//         },
//       })
//     )
//   );
// };

// const createJobPostPages = async ({ jobPosts, gatsbyUtilities }) => {
//   return Promise.all(
//     jobPosts?.map(({ jobPost }) =>
//       gatsbyUtilities.actions.createPage({
//         path: `/connect/jobs/${jobPost.id}`,
//         component: path.resolve(`./src/templates/job-post.js`),
//         context: {
//           id: jobPost.id,
//         },
//       })
//     )
//   );
// };

// const createApplicationPages = async ({ applications, gatsbyUtilities }) => {
//   return Promise.all(
//     applications?.map(({ application }) =>
//       gatsbyUtilities.actions.createPage({
//         path: `/maker/jobs/${application.appliedJobs.nodes[0].name}/${application.jobApplicants.nodes[0].name}`,
//         component: path.resolve(`./src/templates/application.js`),
//         context: {
//           jobId: application.appliedJobs.nodes[0].name,
//           applicantId: application.jobApplicants.nodes[0].name,
//         },
//       })
//     )
//   );
// };

// const createApplicationsArchive = async ({ applications, gatsbyUtilities }) => {
//   return Promise.all(
//     applications?.map(({ application }) =>
//       gatsbyUtilities.actions.createPage({
//         path: `/maker/jobs/${application.appliedJobs.nodes[0].name}/applications`,
//         component: path.resolve(`./src/templates/applicationsArchive.js`),
//         context: {
//           jobId: application.appliedJobs.nodes[0].name,
//         },
//       })
//     )
//   );
// };

// const createPagePages = async ({ pages, gatsbyUtilities }) => {
//   return Promise.all(
//     pages?.map(({ page }) =>
//       gatsbyUtilities.actions.createPage({
//         path: page.uri,
//         component: path.resolve('./src/templates/page/index.js'),
//         context: {
//           page,
//         },
//       })
//     )
//   );
// };

// const getPages = async ({ graphql, reporter }) => {
//   const pagesData = await graphql(`
//     query WpPages {
//       allWpPage {
//         edges {
//           page: node {
//             uri
//             title
//             id
//           }
//         }
//       }
//     }
//   `);

//   if (pagesData.errors) {
//     reporter.panicOnBuild(
//       `There was an error loading your pages...`,
//       pagesData.errors
//     );
//     return;
//   }

//   return pagesData.data.allWpPage.edges;
// };

// const createPostArchive = async ({ posts, gatsbyUtilities }) => {
//   const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
//     {
//       wp {
//         readingSettings {
//           postsPerPage
//         }
//       }
//     }
//   `);

//   const { postsPerPage } = graphqlResult.data.wp.readingSettings;

//   const postsChunkedIntoArchivePages = chunk(posts, postsPerPage);
//   const totalPages = postsChunkedIntoArchivePages.length;

//   return Promise.all(
//     postsChunkedIntoArchivePages.map(async (_posts, index) => {
//       const pageNumber = index + 1;

//       const getPagePath = (page) => {
//         if (page > 0 && page <= totalPages) {
//           // Since our homepage is our blog page
//           // we want the first page to be "/" and any additional pages
//           // to be numbered.
//           // "/blog/2" for example
//           return page === 1 ? `/blog` : `/blog/${page}`;
//         }

//         return null;
//       };

//       // createPage is an action passed to createPages
//       // See https://www.gatsbyjs.com/docs/actions#createPage for more info
//       await gatsbyUtilities.actions.createPage({
//         path: getPagePath(pageNumber),

//         // use the blog post archive template as the page component
//         component: path.resolve(`./src/templates/post-archive.js`),

//         // `context` is available in the template as a prop and
//         // as a variable in GraphQL.
//         context: {
//           // the index of our loop is the offset of which posts we want to display
//           // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
//           // etc
//           offset: index * postsPerPage,

//           // We need to tell the template how many posts to display too
//           postsPerPage,

//           nextPagePath: getPagePath(pageNumber + 1),
//           previousPagePath: getPagePath(pageNumber - 1),
//         },
//       });
//     })
//   );
// };

// const createConnectPostArchive = async ({ connectPosts, gatsbyUtilities }) => {
//   const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
//     {
//       wp {
//         readingSettings {
//           postsPerPage
//         }
//       }
//     }
//   `);

//   const { postsPerPage } = graphqlResult.data.wp.readingSettings;

//   const postsChunkedIntoArchivePages = chunk(connectPosts, postsPerPage);
//   const totalPages = postsChunkedIntoArchivePages.length;

//   return Promise.all(
//     postsChunkedIntoArchivePages.map(async (_connectPosts, index) => {
//       const pageNumber = index + 1;

//       const getPagePath = (page) => {
//         if (page > 0 && page <= totalPages) {
//           // Since our homepage is our blog page
//           // we want the first page to be "/" and any additional pages
//           // to be numbered.
//           // "/blog/2" for example
//           return page === 1 ? `/connect/blog` : `/connect/blog/${page}`;
//         }
//         return null;
//       };

//       // createPage is an action passed to createPages
//       // See https://www.gatsbyjs.com/docs/actions#createPage for more info
//       await gatsbyUtilities.actions.createPage({
//         path: getPagePath(pageNumber),

//         // use the blog post archive template as the page component
//         component: path.resolve(`./src/templates/connect-post-archive.js`),

//         // `context` is available in the template as a prop and
//         // as a variable in GraphQL.
//         context: {
//           // the index of our loop is the offset of which posts we want to display
//           // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
//           // etc
//           offset: index * postsPerPage,

//           // We need to tell the template how many posts to display too
//           postsPerPage,

//           nextPagePath: getPagePath(pageNumber + 1),
//           previousPagePath: getPagePath(pageNumber - 1),
//         },
//       });
//     })
//   );
// };

// const getJobPosts = async ({ graphql, reporter }) => {
//   const graphqlResult = await graphql(`
//     query WpJobPosts {
//       allWpJobPost(sort: { order: ASC, fields: date }) {
//         edges {
//           jobPost: node {
//             uri
//             id
//           }
//         }
//       }
//     }
//   `);

//   if (graphqlResult.errors) {
//     reporter.panicOnBuild(
//       `There was an error loading your job posts`,
//       graphqlResult.errors
//     );
//     return;
//   }

//   return graphqlResult.data.allWpJobPost.edges;
// };

// const getPosts = async ({ graphql, reporter }) => {
//   const graphqlResult = await graphql(`
//     query WpPosts {
//       allWpPost(
//         sort: { order: ASC, fields: date }
//         filter: {
//           categories: { nodes: { elemMatch: { slug: { ne: "connect" } } } }
//         }
//       ) {
//         edges {
//           previous {
//             databaseId
//             id
//             uri
//           }
//           post: node {
//             uri
//             databaseId
//             id
//           }
//           next {
//             databaseId
//             uri
//             id
//           }
//         }
//       }
//     }
//   `);

//   if (graphqlResult.errors) {
//     reporter.panicOnBuild(
//       `There was an error loading your blog posts`,
//       graphqlResult.errors
//     );
//     return;
//   }

//   return graphqlResult.data.allWpPost.edges;
// };

// const getConnectPosts = async ({ graphql, reporter }) => {
//   const graphqlResult = await graphql(`
//     query WpConnectPosts {
//       allWpPost(
//         sort: { order: ASC, fields: date }
//         filter: {
//           categories: { nodes: { elemMatch: { slug: { eq: "connect" } } } }
//         }
//       ) {
//         edges {
//           previous {
//             databaseId
//             id
//             uri
//           }
//           post: node {
//             uri
//             databaseId
//             id
//           }
//           next {
//             databaseId
//             uri
//             id
//           }
//         }
//       }
//     }
//   `);

//   if (graphqlResult.errors) {
//     reporter.panicOnBuild(
//       `There was an error loading your blog posts`,
//       graphqlResult.errors
//     );
//     return;
//   }

//   return graphqlResult.data.allWpPost.edges;
// };

// const getApplications = async ({ graphql, reporter }) => {
//   const graphqlResult = await graphql(`
//     query ApplicationsQuery {
//       allWpApplication {
//         edges {
//           application: node {
//             id
//             appliedJobs {
//               nodes {
//                 name
//               }
//             }
//             jobApplicants {
//               nodes {
//                 name
//               }
//             }
//           }
//         }
//       }
//     }
//   `);

//   if (graphqlResult.errors) {
//     reporter.panicOnBuild(
//       `There was an error loading your application posts`,
//       graphqlResult.errors
//     );
//     return;
//   }

//   return graphqlResult.data.allWpApplication.edges;
// };

// Create pages for all Talent / Maker URLs

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (
    page.path.match(/^\/talent/) ||
    page.path.match(/^\/maker/) ||
    page.path.match(/^\/connect/)
  ) {
    if (page.path.match(/^\/talent/)) {
      page.matchPath = `/talent/*`;
    }
    if (page.path.match(/^\/maker/)) {
      page.matchPath = `/maker/*`;
    }
    if (page.path.match(/^\/connect/)) {
      page.matchPath = `/connect/*`;
    }

    // Update the page.
    createPage(page);
  }
};
