/** @jsxImportSource @emotion/react */
import React from "react"
import PropTypes from "prop-types"
import { css } from '@emotion/react'
import dynamic from 'next/dynamic'

// import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'

import "../config/base.css"

// Global body styles
const bodyStyles = css`
    position: relative;
`

// Content styles
const contentStyle = css`
    padding: 10px;
    padding-top: 0;
    max-width: 800px;
    margin: auto;
`

// Sticky navigation bar styles
const navCss = css`
  position: sticky;
  top: 0px;
  background-color: white;
  margin: -10px;
  padding: 10px;
  margin-bottom: 0;
  padding-bottom: 0;
  z-index: 1000;
`
const DynamicHeader = dynamic(() => import('./Header'), { ssr: false })


// Layout component, includes children and location for navigation
const Layout = ({ children, location }) => {
  return (
    <div css={bodyStyles}>
      <div css={contentStyle}>
        {/* Dynamically inserted header */}
        <DynamicHeader />

        {/* Sticky navigation */}
        <div css={navCss}>
          <Nav location={location} />
        </div>

        {/* Main content */}
        <main>{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}


Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
