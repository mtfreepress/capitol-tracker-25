import React from 'react';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head'; // For SEO
import Layout from '../components/Layout';
import LinksList from '../components/LinksList';
import ContactUs from '../components/ContactUs';
import BillTable from '../components/BillTable';
import NewsletterSignup from '../components/NewsletterSignup';

import governorData from '../data/governor.json';
import { numberFormat, dateFormat } from '../config/utils';

const plural = (value) => (value !== 1 ? 's' : '');

const Governor = ({ bills }) => {
  const { text, articles } = governorData;

// filter functions
// const toGovernor = d => d.data.progress.toGovernor
// const awaitingGovernorAction = d => d.progress.governorStatus === 'pending'
// const signedByGovernor = d => d.progress.governorStatus === 'signed'
// const vetoedByGovernor = d => d.progress.governorStatus === 'vetoed'
// const enactedWithNoGovernorSignature = d => d.progress.governorStatus === 'became law unsigned'


  // Filter bills based on status
  const awaitingActionBills = bills.filter(b => b.progress.find(d => d.step === 'governor').statusLabel === 'Pending');
  const vetoedBills = bills.filter(b => b.progress.find(d => d.step === 'governor').statusLabel === 'Vetoed');
  const amendmentSuggestedBills = bills.filter(b => b.progress.find(d => d.step === 'governor').statusLabel === 'Amendment suggested');
  const vetoOverrideAttempts = bills.filter(b => b.progress.find(d => d.step === 'governor').statusLabel === 'Veto Override Pending');
  const successfulVetoOverrides = bills.filter(b => b.progress.find(d => d.step === 'governor').statusLabel === 'Veto Overridden');
  const signedBills = bills.filter(b => b.progress.find(d => d.step === 'governor').statusLabel === 'Signed');
  const letBecomeLawBills = bills.filter(b => b.progress.find(d => d.step === 'governor').statusLabel === 'Became law unsigned');

// console.log({
//   bills,
//   awaitingActionBills,
//   vetoedBills,
//   amendmentSuggestedBills,
//   vetoOverrideAttempts,
//   successfulVetoOverrides,
//   signedBills
// })

  return (
    <div>
      <Layout>
        <Head>
          <title>Gov. Greg Gianforte - 2023 Legislative Bills</title>
          <meta name="description" content="Vetos, signatures, and 2023 bills on the desk of Montana Gov. Greg Gianforte." />
        </Head>

        <h1>Gov. Greg Gianforte</h1>
        <ReactMarkdown>{text}</ReactMarkdown>

        <div>
          <strong style={{ fontSize: '1.8em' }}>{numberFormat(bills.length)}</strong> 2023 bill{plural(bills.length)} have been transmitted to Gov. Gianforte for his signature.
        </div>

        <h4>Awaiting action ({numberFormat(awaitingActionBills.length)})</h4>
        <BillTable bills={awaitingActionBills} displayLimit={5} />

        <h4>Vetoed ({numberFormat(vetoedBills.length)})</h4>
        <div className="note">
          Vetos can be overridden by two-thirds majorities in the House and Senate.
        </div>
        <BillTable bills={vetoedBills} displayLimit={5} />

        {vetoOverrideAttempts.length > 0 && (
          <>
            <h4>Pending veto override efforts ({numberFormat(vetoOverrideAttempts.length)})</h4>
            <BillTable bills={vetoOverrideAttempts} displayLimit={5} />
          </>
        )}

        {amendmentSuggestedBills.length > 0 && (
          <>
            <h4>Returned with suggested amendment ({numberFormat(amendmentSuggestedBills.length)})</h4>
            <BillTable bills={amendmentSuggestedBills} displayLimit={5} />
          </>
        )}

        {successfulVetoOverrides.length > 0 && (
          <>
            <h4>Vetoes overridden by Legislature ({numberFormat(successfulVetoOverrides.length)})</h4>
            <BillTable bills={successfulVetoOverrides} displayLimit={5} />
          </>
        )}

        <h4>Signed into law ({numberFormat(signedBills.length)})</h4>
        <BillTable bills={signedBills} displayLimit={5} />

        <h4>Became law without signature</h4>
        <div className="note">
          Bills that have become law without the governor's signature after the governor chooses not to issue a signature or a veto by the 10-day deadline specified in the Montana Constitution.
        </div>
        <BillTable bills={letBecomeLawBills} displayLimit={5} />

        <NewsletterSignup />

        <h3>Montana Free Press coverage</h3>
        <div>2023 legislative stories involving the Governor's Office.</div>
        <LinksList articles={articles} />

        <ContactUs />
      </Layout>
    </div>
  );
};

// Fetch data at build time
export async function getStaticProps() {
  const bills = await import('../data/bills.json');

  return {
    props: {
      bills: bills.default || [],
    },
  };
}

export default Governor;
