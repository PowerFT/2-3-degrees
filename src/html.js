import React from "react";
import PropTypes from "prop-types";

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}

        <script
          type="text/javascript"
          src="https://secure.smart-enterprise-7.com/js/262710.js"
        ></script>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
            <img
            alt=""
            src="https://secure.smart-enterprise-7.com/262710.png?trk_user=262710&trk_tit=jsdisabled&trk_ref=jsdisabled&trk_loc=jsdisabled"
            height="0px"
            width="0px"
            style="display:none;"
          />
            `,
          }}
        ></noscript>
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
