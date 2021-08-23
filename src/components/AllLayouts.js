import React from "react"
import { FullHero } from "../templates/layouts/full-hero"
import { HalfHero } from "../templates/layouts/half-hero"
import { TabsBlock } from "../templates/layouts/tabs"
import { Pillars } from "../templates/layouts/pillars"
import { Quote } from "../templates/layouts/quote"
import { LogoGrid } from "../templates/layouts/logo-grid"
import { LatestBlog } from "../templates/layouts/blog"
import { Newsletter } from "../templates/layouts/newsletter"

const AllLayouts = ({ layoutData }) => {
  console.log('All layout')
  const layoutType = layoutData.fieldGroupName

  /**
   * Default component
   */
  const Default = () => <div>In AllLayouts the mapping of this component is missing: {layoutType}</div>

  /**
   * Mapping the fieldGroupName(s) to our components
   */
  const layouts = {
    Page_Pagebuilder_Layouts_FullHero: FullHero,
    Page_Pagebuilder_Layouts_HalfHero: HalfHero,
    Page_Pagebuilder_Layouts_Tabs: TabsBlock,
    Page_Pagebuilder_Layouts_Pillars: Pillars,
    Page_Pagebuilder_Layouts_Quote: Quote,
    Page_Pagebuilder_Layouts_LogoGrid: LogoGrid,
    Page_Pagebuilder_Layouts_Blog: LatestBlog,
    Page_Pagebuilder_Layouts_Newsletter: Newsletter,
    page_default: Default
  }

  /**
   * If layout type is not existing in our mapping, it shows our Default instead.
   */
  const ComponentTag = layouts[layoutType] ? layouts[layoutType] : layouts['page_default']

  return (
    <ComponentTag {...layoutData} />
  )
}

export default AllLayouts