import { Box } from "@chakra-ui/react"
import React from "react"

// import { Layout } from "../../components/layout/Layout"
// import SEO from "../../components/SEO"
import AllLayouts from "../../components/AllLayouts"


const Page = ({ pageContext }) => {
  // console.log(pageContext)

  const pageBuilder = pageContext.page.pageBuilder

  const layouts = pageBuilder.layouts || []

  return (
    <Box id="page">
      {/* <SEO title={title}/> */}
      {/* <h1> {title} </h1> */}

      {
        layouts.map((layout, index) => {
          return <AllLayouts key={index} layoutData={layout} id="pageLayout" />
        })
      }

    </Box>
  )
}

export default Page