import { Box } from "@chakra-ui/react"
import React from "react"

// import { Layout } from "../../components/layout/Layout"
import Seo from "../../components/seo"
import AllLayouts from "../../components/AllLayouts"


const Page = ({ pageContext }) => {
  console.log(pageContext)

  const pageBuilder = pageContext.page.pageBuilder

  const layouts = pageBuilder.layouts || []

  // console.log(layouts)

  return (
    <>
      <Box id="page" h="fit-content" spacing="0" w="100%">
        <Seo title={pageContext.page.title}/>

        {
          layouts.map((layout, index) => {
            return <AllLayouts key={index} layoutData={layout} id="pageLayout" />
          })
        }

      </Box>
    </>
  )
}

export default Page