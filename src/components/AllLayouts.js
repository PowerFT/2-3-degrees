import React from "react";
import { FullHero } from "../templates/layouts/full-hero";
import { FullHeroContent } from "../templates/layouts/full-hero-content";
import { FullHeroContact } from "../templates/layouts/full-hero-contact";
import { HalfHero } from "../templates/layouts/half-hero";
import { TabSection } from "../templates/layouts/tabs";
import { Pillars } from "../templates/layouts/pillars";
import { TextList } from "../templates/layouts/text-list";
import { Quote } from "../templates/layouts/quote";
import { LogoGrid } from "../templates/layouts/logo-grid";
import { LatestBlog } from "../templates/layouts/blog";
import { Newsletter } from "../templates/layouts/newsletter";
import { PageBlock } from "../templates/layouts/page-block";
import { RichTextBlock } from "../templates/layouts/rich-text-block";
import { FixedHomepageHero } from "../templates/layouts/fixed-homepage-hero";
import { FixedTalentHalfHero } from "../templates/layouts/fixed-talent-half-hero";
import { FixedMakerHalfHero } from "../templates/layouts/fixed-maker-half-hero";

const AllLayouts = ({ layoutData }) => {
  const layoutType = layoutData.fieldGroupName;

  //Default component
  const Default = () => (
    <div>
      In AllLayouts the mapping of this component is missing: {layoutType}
    </div>
  );

  /**
   * Mapping the fieldGroupName(s) to our components
   */
  const layouts = {
    Page_Pagebuilder_Layouts_FullHero: FullHero,
    Page_Pagebuilder_Layouts_FullHeroContent: FullHeroContent,
    Page_Pagebuilder_Layouts_FullHeroContact: FullHeroContact,
    Page_Pagebuilder_Layouts_HalfHero: HalfHero,
    Page_Pagebuilder_Layouts_Tabs: TabSection,
    Page_Pagebuilder_Layouts_Pillars: Pillars,
    Page_Pagebuilder_Layouts_TextList: TextList,
    Page_Pagebuilder_Layouts_Quote: Quote,
    Page_Pagebuilder_Layouts_LogoGrid: LogoGrid,
    Page_Pagebuilder_Layouts_BlogBlock: LatestBlog,
    Page_Pagebuilder_Layouts_Newsletter: Newsletter,
    Page_Pagebuilder_Layouts_PageBlock: PageBlock,
    Page_Pagebuilder_Layouts_RichTextBlock: RichTextBlock,
    Page_Pagebuilder_Layouts_FixedHomepageHero: FixedHomepageHero,
    Page_Pagebuilder_Layouts_FixedMakerHalfHero: FixedMakerHalfHero,
    Page_Pagebuilder_Layouts_FixedTalentHalfHero: FixedTalentHalfHero,
    page_default: Default,
  };

  /**
   * If layout type is not existing in our mapping, it shows our Default instead.
   */
  const ComponentTag = layouts[layoutType]
    ? layouts[layoutType]
    : layouts["page_default"];

  return <ComponentTag {...layoutData} />;
};

export default AllLayouts;
