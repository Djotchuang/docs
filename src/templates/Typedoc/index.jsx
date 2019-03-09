import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../../components/Layout'
import Content from '../../components/Content'
import HeaderSection from '../../components/HeaderSection'
import Sidebar from '../../components/Sidebar'
import DocHeader from '../../components/DocHeader'
import SEO from '../../components/Seo'
import { cleanTypedocData } from './utils'

import Entities from './Entities'
import Toc from './Toc'

import stylesDoc from '../Doc.module.scss'

export default class TypedocTemplate extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        pageContext: PropTypes.object.isRequired
    }

    typedocCleaned = cleanTypedocData(
        this.props.pageContext.typedoc,
        this.props.pageContext.classes
    )

    // output section title as defined in sections.yml
    sectionTitle = this.props.data.allSectionsYaml.edges.map(({ node }) => {
        // compare section against section title from sections.yml
        if (node.title.toLowerCase().includes('references')) {
            return node.title
        }
    })

    render() {
        const { location, pageContext } = this.props
        const { typedoc } = pageContext
        const { info } = typedoc
        const { title, description, version, sourceUrl } = info

        return (
            <>
                <Helmet>
                    <body className={'references'} />
                </Helmet>

                <SEO
                    title={title}
                    description={description}
                    slug={pageContext.slug}
                    article
                />

                <Layout location={location}>
                    <HeaderSection title={this.sectionTitle} />

                    <Content>
                        <main className={stylesDoc.wrapper}>
                            <aside className={stylesDoc.sidebar}>
                                <Sidebar
                                    location={location}
                                    sidebar={'references'}
                                    collapsed
                                    toc
                                    tocComponent={
                                        <Toc data={this.typedocCleaned} />
                                    }
                                />
                            </aside>
                            <article className={stylesDoc.main}>
                                <DocHeader
                                    title={title}
                                    description={description}
                                    prepend={
                                        <span className={stylesDoc.version}>
                                            {version}
                                        </span>
                                    }
                                />

                                <Entities
                                    entities={this.typedocCleaned}
                                    sourceUrl={sourceUrl}
                                />
                            </article>
                        </main>
                    </Content>
                </Layout>
            </>
        )
    }
}

export const TypedocQuery = graphql`
    query {
        allSectionsYaml {
            edges {
                node {
                    title
                    description
                    link
                }
            }
        }
    }
`
