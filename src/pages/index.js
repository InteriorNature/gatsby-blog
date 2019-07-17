import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const BlogLink = styled(Link)`
  text-decoration: none;
`;

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: blue;
`;

//export actual component to render as index page
//data object is graphql query (assigned below) returned
//we use this page and graphql to create our default look for each blog page
export default ({ data }) => {
  console.log(data);
  return (
  <Layout>
    <SEO title="Home" />
    <div>
      <h1>Kristin's Blog</h1>
      <h4> {data.allMarkdownRemark.totalCount}</h4>
      {
        data.allMarkdownRemark.edges.map(({node}) => (
          <div key={node.id}>
            <BlogLink to={node.fields.slug}>
              <BlogTitle>
                {node.frontmatter.title} - {node.frontmatter.date}
              </BlogTitle>
            </BlogLink>
            <p>{node.excerpt}</p>
          </div>
        ))
      }
    </div>
  </Layout>
)}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            description
            title
            date
          }
          excerpt
        }
      }
      totalCount
    }
  }
`
