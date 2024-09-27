import React from "react";
import Link from 'next/link';
import { css } from '@emotion/react';
import { shortDateWithWeekday, billUrl } from '../config/utils';

import Layout from '../components/Layout';
// Could also use `next/head`
import Seo from '../components/SEO';
import ContactUs from '../components/ContactUs';
import NewsletterSignup from '../components/NewsletterSignup';

import recap from '../data/recap.json';

const actionsDayStyle = css`
  h2 {
    color: white;
    background-color: var(--gray5);
    padding: 0.5em 0.5em;
    position: sticky;
    top: 130px;
    z-index: 10;
  }
`;


// TODO Move this into data processing step:

const cleanDescription = text => text.replace('Committee Executive Action--', 'Committee Action: ');

const Actions = () => {
  const { actionsByDate } = recap;

  const actions = actionsByDate.map((day, i) => {
    const committeesWithActions = Array.from(new Set(day.actions.map(a => a.committee)));
    if (committeesWithActions.length === 0) return null;

    const displayCommittees = committeesWithActions.filter(d => d !== null).sort((a, b) => a - b);
    const nonCommitteeActions = day.actions.filter(d => d.committee === null);
    const governorActions = nonCommitteeActions.filter(d => d.posession === 'governor');
    const houseActions = nonCommitteeActions.filter(d => d.posession === 'house');
    const senateActions = nonCommitteeActions.filter(d => d.posession === 'senate');
    const governorActionTypes = Array.from(new Set(governorActions.map(d => d.description))).sort();
    const houseActionTypes = Array.from(new Set(houseActions.map(d => d.description))).sort();
    const senateActionTypes = Array.from(new Set(senateActions.map(d => d.description))).sort();

    return (
      <div css={actionsDayStyle} key={day.date}>
        <h2>📅 {shortDateWithWeekday(new Date(day.date))}</h2>
        <div>
          {governorActionTypes.length > 0 && (
            <div>
              <h3>🖋️ GOVERNOR</h3>
              {governorActionTypes.map(description => {
                const actionsOfType = governorActions.filter(d => d.description === description);
                return (
                  <div key={`governor-${description}`}>
                    <h4>{description} ({actionsOfType.length})</h4>
                    <ul>{actionsOfType.map(action => <Action key={action.id} data={action} />)}</ul>
                  </div>
                );
              })}
            </div>
          )}

          {/* Similar sections for House and Senate Actions */}

          {displayCommittees.map(committee => {
            const committeeActions = day.actions.filter(d => d.committee === committee);
            const committeeActionTypes = Array.from(new Set(committeeActions.map(d => d.description))).sort((a, b) => a - b);

            return (
              <div key={committee}>
                <h3>👥 {committee}</h3>
                {committeeActionTypes.map(description => {
                  const actionsOfType = committeeActions.filter(d => d.description === description);
                  return (
                    <div key={`${committee}-${description}`}>
                      <h4>{cleanDescription(description)} ({actionsOfType.length})</h4>
                      <ul>{actionsOfType.map(action => <Action key={action.id} data={action} />)}</ul>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        {i === 0 && <NewsletterSignup />}
      </div>
    );
  });

  return (
    <Layout>
      <h1>What lawmakers have done so far</h1>
      <p>Procedural action on bills under consideration by the 2023 Legislature.</p>
      {actions}
      <ContactUs />
    </Layout>
  );
};

const Action = ({ data }) => {
  const { bill, title, explanation } = data;
  const url = billUrl(bill);

  return (
    <li>
      <div>📋 <Link href={`/bills/${url}`}><strong>{bill}</strong>: {title}</Link></div>
      <div className="note">{explanation}</div>
    </li>
  );
};

export const Head = () => (
  <Seo
    title="Recap"
    description="Procedural action on bills under consideration by the 2023 Legislature."
    pageRelativeUrl="recap/"
  />
);

export default Actions;
