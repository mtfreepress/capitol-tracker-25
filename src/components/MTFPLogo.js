/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from '@emotion/react';
import Link from 'next/link';

import logo from "../images/mtfp-logo.png";

const containerCss = css`
    display: inline-block;
    position: relative;

    text-transform: uppercase;
    font-style: normal;
    font-weight: bold;

    a {
        color: #AE9864;
    }
`;

const imgCss = css`
    position: relative;
    top: 5px;
    margin: 0 5px;

    :hover {
        opacity: 0.7;
    }
`;

const MTFPLogo = (props) => (
    <div css={containerCss}>
        <Link href="https://montanafreepress.org" passHref>
            <img src={logo} alt="MTFP logo" width={50} css={imgCss} />
        </Link>
    </div>
);

export default MTFPLogo;
