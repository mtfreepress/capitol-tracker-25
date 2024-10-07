import React from "react";
import ReactMarkdown from 'react-markdown';

import Layout from '../components/Layout';
import NewsletterSignup from "../components/NewsletterSignup";
import ContactUs from "../components/ContactUs";
import participationData from '../data/participation.json';
import Head from 'next/head';
const Participate = () => {
    const { text } = participationData;
    return (
        <div>
            <Layout>
                <Head>
                    <title>Participate in the 2021 Legislature</title>
                    <meta name="description" content="How to participate in Montana's 2023 Legislature" />
                </Head>

                <h1 id="participation">Participating in the 2021 Legislature</h1>
                <div className="note">Compiled by Amanda Eggert</div>

                <ReactMarkdown>{text}</ReactMarkdown>
                <NewsletterSignup />
                <ContactUs />
            </Layout>
        </div>
    );
};

export default Participate;