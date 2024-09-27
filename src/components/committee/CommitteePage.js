import React from "react";

import { css } from '@emotion/react'
import ReactMarkdown from 'react-markdown'

import Layout from '../components/Layout'
import Seo from "../components/Seo"
import ContactUs from '../components/ContactUs'
import NewsletterSignup from '../components/NewsletterSignup'

import CommitteeSummary from "../components/committee/Summary";
import BillTable from '../components/BillTable'

import {
    lawmakerUrl,
    shortDateWithWeekday,
} from '../config/utils'

import {
    partyColors,
} from '../config/config'


const committeeMemberListStyle = css`
    display: flex;
    flex-wrap: wrap;
    margin-left: -0.5em;

    .col {
        flex: 1 0 250px;
        margin: 0.5em;
    }

    .item {
        border: 1px solid var(--tan2);
        background: var(--tan1);
        padding: 0.2em 0.5em;
        margin: 0;
        margin-bottom: 0.2em;
    }
`
const getDay = d => shortDateWithWeekday(new Date(d))

const CommitteePage = ({ pageContext, data, location }) => {
    const {
        committee,
        bills
    } = pageContext
    const {
        name,
        time,
        type,
        billCount,
        billsWithdrawn,
        billsUnscheduled,
        billsScheduledByDay,
        billsAwaitingVote,
        billsFailed,
        billsAdvanced,
        billsBlasted,
        members,
        committeePageText, // not wired up in processing
    } = committee

    const unscheduledBills = bills.filter(d => billsUnscheduled.includes(d.identifier))

    const scheduledBillsByDay = billsScheduledByDay.map(day => {
        return {
            date: day.day,
            bills: bills.filter(d => day.bills.includes(d.identifier))
        }
    })

    const unheard = Array.from(new Set(
        unscheduledBills.concat(billsScheduledByDay.map(d => d.bills).flat())
    ))

    const awaitingVoteBills = bills.filter(d => billsAwaitingVote.includes(d.identifier))
    const withdrawnBills = bills.filter(d => billsWithdrawn.includes(d.identifier))
    const failedBills = bills.filter(d => billsFailed.includes(d.identifier))
    const passedBills = bills.filter(d => billsAdvanced.includes(d.identifier))
    const blastedBills = bills.filter(d => billsBlasted.includes(d.identifier))

    // const denom = failedBills.length + passedBills.length + blastedBills.length
    const denom = bills.length

    const chair = members.find(d => d.role === 'Chair')

    return <div>

        <Layout location={location}>
            <h1>{name} Committee</h1>

            <CommitteeSummary {...committee} />

            {/* <div css={committeeSummaryStyle}>
                <div className="item"><strong>{bills.length} bills</strong> considered</div>
                <div className="item"><strong>{unheard.length}</strong> <Link to="#awaiting-hearing">awaiting hearing</Link></div>
                <div className="item"><strong>{awaitingVoteBills.length}</strong> <Link to="#awaiting-votes">awaiting votes</Link></div>
                <div className="item"><strong>{failedBills.length}</strong> ({percentFormat(failedBills.length / denom)}) <Link to="#failed"> voted down</Link></div>
                <div className="item"><strong>{passedBills.length}</strong> ({percentFormat(passedBills.length / denom)}) <Link to="#passed">voted forward</Link></div>
            </div> */}

            <div style={{ fontSize: '1.2em', margin: '0.5em 0' }}>🪑 Chair: <Link to={`/lawmakers/${lawmakerUrl(chair.name)}`}><strong>{chair.name}</strong> <span style={{ color: partyColors(chair.party) }}>({chair.party}-{chair.locale})</span></Link></div>

            <ReactMarkdown>{committeePageText}</ReactMarkdown>

            <hr />

            <h2>Members ({members.length})</h2>
            <div css={committeeMemberListStyle}>
                <div className="col">
                    <div className="header"><strong>{members.filter(d => d.party === 'R').length}</strong> Republicans</div>
                    {
                        members.filter(d => d.party === 'R').map(m => <div className="item" key={m.name} style={{ borderLeft: `5px solid ${partyColors(m.party)}` }}><>👤 </>
                            <Link to={`/lawmakers/${lawmakerUrl(m.name)}`}><strong>{m.name}</strong> <span style={{ color: partyColors(m.party) }}>({m.party}-{m.locale})</span></Link>
                            {(m.role !== 'Member') && <span> – {m.role}</span>}
                        </div>)
                    }
                </div>
                <div className="col">
                    <div className="header"><strong> {members.filter(d => d.party === 'D').length}</strong> Democrats</div>
                    {
                        members.filter(d => d.party === 'D').map(m => <div className="item" key={m.name} style={{ borderLeft: `5px solid ${partyColors(m.party)}` }}><>👤 </>
                            <Link to={`/lawmakers/${lawmakerUrl(m.name)}`}><strong>{m.name}</strong> <span style={{ color: partyColors(m.party) }}>({m.party}-{m.locale})</span></Link>
                            {(m.role !== 'Member') && <span> – {m.role}</span>}
                        </div>)
                    }
                </div>
            </div>

            <hr />

            <h2>Commitee bills ({billCount})</h2>

            <h3 id="awaiting-hearing">🗓 Awaiting hearing ({unheard.length})</h3>

            {
                scheduledBillsByDay.map(day => {
                    return <div key={day.date}>
                        <h4>Hearing set {getDay(day.date)}</h4>
                        <BillTable bills={day.bills} suppressCount={true} />
                    </div>
                })
            }

            <h4>Unscheduled</h4>
            <BillTable bills={unscheduledBills} displayLimit={5} />

            <NewsletterSignup />

            <h3 id="awaiting-votes">⌛️ Heard, awaiting vote ({awaitingVoteBills.length})</h3>
            <BillTable bills={awaitingVoteBills} displayLimit={5} />

            <h3>🚫 Withdrawn ({withdrawnBills.length})</h3>
            <BillTable bills={withdrawnBills} displayLimit={5} />

            <h3 id="failed">🚫 Voted down ({failedBills.length})</h3>
            <BillTable bills={failedBills} displayLimit={5} />

            <h3 id="passed">✅ Voted forward ({passedBills.length})</h3>
            <BillTable bills={passedBills} displayLimit={5} />

            {
                (blastedBills.length > 0) && <>
                    <h3 id="blasted">🧨 Blasted from committee</h3>
                    <div className="note">Blast motions on the House or Senate floor pull bills from committee for debate there.</div>
                    <BillTable bills={blastedBills} />
                </>
            }

            <ContactUs />

        </Layout >
    </div >;
};

export default CommitteePage

export const Head = ({ pageContext }) => {
    const { committee } = pageContext
    const { name, key } = committee
    return <Seo
        title={`${name}`}
        description={`Bills and members for the Montana Legislature's 2023 ${name} Committee.`}
        pageRelativeUrl={`committees/${key}/`}
    />
}
