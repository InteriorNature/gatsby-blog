
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    //shows pages available on rebuild
    //console.log(node.internal.type)
    //slug - url for the link that the browser is able to access from our app
    //in order to nav to the page required. We Dynamically build out the slug,
    //attach it the node as a field, because we want to access the field in our app too (route/link)
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
        //field path to our node - SLUG - not using 3rd prop basePath
        const slug = createFilePath({ node, getNode })
        createNodeField({
            node,
            name: `slug`,
            value: slug
        })
    }
}
exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return graphql(`
    {
        allMarkdownRemark {
            edges {
                node {
                    fields {
                    slug
                    }
                }
            }
        }
      }
    `).then(result => {
        result.data.allMarkdownRemark.edges.forEach(({node})=> 
        createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/blog-post.js`),
            context: {
                slug: node.fields.slug
            }
        }))
    })
}