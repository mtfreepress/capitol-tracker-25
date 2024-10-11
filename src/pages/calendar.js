import React from "react";
import Link from "next/link";
import { css } from "@emotion/react";
import Head from "next/head"; // SEO
import Layout from "../components/Layout";
import ContactUs from "../components/ContactUs";
import NewsletterSignup from "../components/NewsletterSignup";
import BillTable from "../components/BillTable";


import calendarJson from "../data/calendar.json";
import committeesJson from "../data-nodes/committees.json";
import { shortDateWithWeekday, committeeUrl, capitalize } from "../config/utils";

// Styles
const scheduleDayStyle = css`
  h2 {
    color: white;
    background-color: var(--gray5);
    padding: 0.5em 0.5em;
    position: sticky;
    top: 130px;
    z-index: 10;
  }
`;

// Utility functions
const getDay = (d) => shortDateWithWeekday(new Date(d));
const urlizeDay = (day) => day.replaceAll(",", "").replaceAll(" ", "-");

const Calendar = ({ committees, onCalendarBills }) => {
    const { scheduledHearings, scheduledFloorDebates, scheduledFinalVotes, datesOnCalendar, billsOnCalendar } = calendarJson;
    const days = datesOnCalendar.map((d) => getDay(d));
    const schedule = days.map((day, i) => {
        const hearings = scheduledHearings.filter((d) => getDay(d.date) === day);
        const committeesWithHearings = Array.from(new Set(hearings.map((a) => a.committee)))
            .map((name) => {
                const match = committees.find((d) => d.name === name) || {};
                return {
                    name,
                    key: match.key || null,
                    cat: match.time && match.type ? `${match.time}-${match.type}` : null,
                };
            });

        const amPolicyCommittees = committeesWithHearings.filter((d) => d.cat === "morning-policy");
        const pmPolicyCommittees = committeesWithHearings.filter((d) => d.cat === "afternoon-policy");
        const appropsCommittees = committeesWithHearings.filter((d) =>
            ["morning-fiscal-sub", "varies-fiscal"].includes(d.cat)
        );
        const otherCommittees = committeesWithHearings.filter(
            (d) => !["morning-policy", "afternoon-policy", "morning-fiscal-sub", "varies-fiscal"].includes(d.cat)
        );

        return (
            <div key={day} id={urlizeDay(day)} css={scheduleDayStyle}>
                <hr />
                <h2>📅 {day}</h2>
                {/* Committee Hearings */}
                {hearings.length > 0 && (
                    <>
                        <h3>Committee hearings</h3>
                        <div className="note">
                            Bill hearings are an opportunity for the sponsor to explain a bill. They also allow for public testimony.
                        </div>
                        {amPolicyCommittees.length > 0 && (
                            <>
                                <h4>MORNING POLICY COMMITTEES</h4>
                                <div>
                                    {amPolicyCommittees.map((committee) => (
                                        <Committee key={`${day}-${committee.name}`} committee={committee} hearings={hearings} onCalendarBills={onCalendarBills} />
                                    ))}
                                </div>
                            </>
                        )}
                        {pmPolicyCommittees.length > 0 && (
                            <>
                                <h4>AFTERNOON POLICY COMMITTEES</h4>
                                <div>
                                    {pmPolicyCommittees.map((committee) => (
                                        <Committee key={`${day}-${committee.name}`} committee={committee} hearings={hearings} onCalendarBills={onCalendarBills} />
                                    ))}
                                </div>
                            </>
                        )}
                        {appropsCommittees.length > 0 && (
                            <>
                                <h4>BUDGET COMMITTEES</h4>
                                <div>
                                    {appropsCommittees.map((committee) => (
                                        <Committee key={`${day}-${committee.name}`} committee={committee} hearings={hearings} onCalendarBills={onCalendarBills} />
                                    ))}
                                </div>
                            </>
                        )}
                        {otherCommittees.length > 0 && (
                            <>
                                <h4>OTHER COMMITTEES</h4>
                                <div>
                                    {otherCommittees.map((committee) => (
                                        <Committee key={`${day}-${committee.name}`} committee={committee} hearings={hearings} onCalendarBills={onCalendarBills} />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
                {i === 0 && <NewsletterSignup />}
            </div>
        );
    });

    return (
        <div>
            <Layout>
                <Head>
                    <title>What&#39;s coming up at the Legislature</title>
                    <meta name="description" content="What's coming up at the 2023 Legislature" />
                </Head>
                <h1>What&#39;s coming up at the Legislature</h1>
                <div>
                    {days.map((day, i) => (
                        <span key={day}>
                            {i !== 0 ? " • " : ""}
                            <Link href={`/calendar#${urlizeDay(day)}`}>{day}</Link>
                        </span>
                    ))}
                </div>
                <p>
                    This listing includes committee bill hearings. Official calendars for floor debates are available{" "}
                    <a href="http://laws.leg.mt.gov/legprd/laws_agendas.agendarpt?chamber=H&P_SESS=20231" target="_blank" rel="noopener noreferrer">
                        here for the House
                    </a>{" "}
                    and{" "}
                    <a href="http://laws.leg.mt.gov/legprd/laws_agendas.agendarpt?chamber=S&P_SESS=20231" target="_blank" rel="noopener noreferrer">
                        here for the Senate
                    </a>.
                </p>
                {schedule}
                <ContactUs />
            </Layout>
        </div>
    );
};

const Committee = ({ committee, hearings, onCalendarBills }) => {
    const committeeHearingBills = hearings.filter((d) => d.committee === committee.name).map((d) => d.bill);
    const bills = onCalendarBills.filter((d) => committeeHearingBills.includes(d.identifier));

    return (
        <div>
            <h4>👥 <Link href={`/committees/${committee.key}`}>{committee.name}</Link></h4>
            <BillTable bills={bills} displayLimit={10} suppressCount={true} />
        </div>
    );
};

export async function getStaticProps() {
    const onCalendarBills = calendarJson.billsOnCalendar;
    const committees = committeesJson;
    return {
        props: {
            onCalendarBills,
            committees,
        },
    };
}

export default Calendar;
