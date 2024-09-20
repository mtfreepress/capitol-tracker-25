import React from "react"
import { Link } from 'gatsby'
import { css } from '@emotion/react'

import MTFPLogo from './MTFPLogo'

import headerData from '../data/header.json'
import { formatTimeLong } from '../config/utils'

import headerBackground from "../images/cap-tracker-background.png"

const title = '2023 Capitol Tracker'
const subtitle = 'The lawmakers, bills and votes of the 68th Montana Legislature'
const headerDonateLink = "https://checkout.fundjournalism.org/memberform?org_id=montanafreepress&campaign=7014o000000JNaKAAW"

const headerStyle = css`  
  background-color: var(--tan7);
  background-size: cover;
  background-position: center;
  margin-bottom: 10px;
  padding: 1em;
`

const titleStyle = css`
  color: var(--tan4);
  font-size: 3em;
  margin-bottom: 5px;
  margin-top: 0;
  font-weight: normal;
  text-transform: uppercase;
  text-align: center;

  a {
    color: var(--gray1);
  }
  a:hover {
    color: var(--link);
    text-decoration: none;
  }

  @media screen and (max-width: 468px) {
    font-size: 2em;
  }
`
const subtitleStyle = css`
  color: var(--tan4);
  font-size: 1.15em;
  text-align: center;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
`
const mtfpBlurbCss = css`
  text-align: center;
  color: var(--gray1);
  font-style: italic;
`

const updateCss = css`
  color: var(--tan4);
  font-size: 0.9em;
  margin-top: 1em;
  text-align: center;
`

const Header = () => {
    const { updateTime } = headerData
    return <div css={headerStyle} style={{
        backgroundImage: `linear-gradient( rgba(23, 24, 24, 0.2), rgba(23, 24, 24, 0.5) ), url(${headerBackground})`
    }}>
        <h1 css={titleStyle}><Link to="/">{title}</Link></h1>
        <h2 css={subtitleStyle}>{subtitle}</h2>
        <div css={mtfpBlurbCss}>
            A digital guide by <MTFPLogo />| <a href={headerDonateLink}>Support this work</a>
        </div>
        <div css={updateCss}>
            Last update: {formatTimeLong(new Date(updateTime))}
        </div>
    </div>
}

export default Header