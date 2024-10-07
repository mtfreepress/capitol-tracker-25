import React, { useState } from 'react';
import { css } from '@emotion/react';

import InfoPopup from '../InfoPopup';

import processAnnotations from '../../data/process-annotations.json';

import {
  dateFormat,
  committeeUrl,
} from '../../config/utils';

import {
  tableStyle
} from '../../config/styles'; 

import {
  partyColors,
  positionColors
} from '../../config/config';

const descriptionCss = css`
  margin: 0.1em 0;
`;

const recordingLineCss = css`
  border: 1px solid var(--tan5);
  background-color: var(--tan2);
  padding: 0.5em 0.5em;
  margin: 0.3em 0;
`;

const defaultState = {
  showMinorActions: false,
  showVotes: true,
};

const dateCss = css`
  color: #806f47;
  vertical-align: top;
`;
const dateColWidth = css`
  width: 5em;
  @media screen and (max-width: 468px) {
    width: 4em;
  }
`;
const actionCss = css`
  vertical-align: top;
`;
const actionWidth = css`
  width: 45em;
  @media screen and (max-width: 760px) {
    width: 35em;
  }
  @media screen and (max-width: 600px) {
    width: 30em;
  }
  @media screen and (max-width: 468px) {
    width: 21em;
  }
`;

// const committeeCss = css`
//   font-style: italic;
//   vertical-align: top;
// `
// const committeeColWidth = css`
//   width: 10em;
//   @media screen and (max-width: 468px) {
//     width: 5em;
//   }
// `
const highlightRow = css`
  background-color: #cebc9f;
`;

const inlineButtonCss = css`
  display: inline-block;
  border: none;
  padding: 0.2em 0.5em;
  border: 1px solid var(--tan6);
  color: var(--tan6);
  background-color: rgba(256, 256, 256, 0);
  text-align: left;
  font-size: 1em;
  font-weight: normal;

  :hover {
    background-color: rgba(256, 256, 256, 0);
    border: 1px solid #ce5a00;
    color: #ce5a00;
    text-decoration: none;
  }
`;

const BillActions = ({ actions, lawsUrl, vetoMemoUrl }) => {
  const [showMinorActions, setShowMinorActions] = useState(false);
  const [showVotes, setShowVotes] = useState(true);

  const toggleShowMinorActions = () => setShowMinorActions(!showMinorActions);

  const { howBillsMove } = processAnnotations;
  const actionFilter = showMinorActions ? (d) => true : (d) => d.isMajor;
  const annotations = [
    {
      key: 'vetoMemo',
      descriptionFilter: (action) =>
        ['Vetoed by Governor', "Returned with Governor's Line-item Veto"].includes(action.description),
      label: (action) => 'Veto memo',
      url: (action) => vetoMemoUrl,
    },
  ];

  // TODO: Remove the conditional that allows for null values, workaround for getting the page to render for now
  const rows = actions ? actions.filter(actionFilter).map((d, i) => Action(d, showVotes, annotations)) : [];

  // TODO: Use this code instead
  // const rows = actions.filter(actionFilter).map((d, i) => Action(d, showVotes, annotations));


  return (
    <div>
      <h3>Legislative actions</h3>
      <InfoPopup label="How bills move through the Legislature" content={howBillsMove} />
      <div className="note">
        {showMinorActions ? 'Showing all recorded bill actions. ' : 'Showing major bill actions only. '}
        <button css={inlineButtonCss} onClick={toggleShowMinorActions}>
          {showMinorActions ? 'See fewer' : 'See all.'}
        </button>
      </div>
      <table css={tableStyle}>
        <thead className="tableHeader">
          <tr>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <div className="note">
        {showMinorActions ? 'Showing all recorded bill actions. ' : 'Showing major bill actions only. '}
        <button css={inlineButtonCss} onClick={toggleShowMinorActions}>
          {showMinorActions ? 'See fewer' : 'See all.'}
        </button>
      </div>
      <div className="note">
        This table may omit bill actions recorded since this guide's last update. See the{' '}
        <a href={lawsUrl}>bill page in LAWS</a> for an official reference.
      </div>
    </div>
  );
};

const Action = (action, showVotes, annotations) => {
  const { id, committee, description, vote, date, recordings, isHighlight, transcriptUrl } = action;
  const { thresholdRequired } = vote || {};

  return (
    <tr key={id} css={isHighlight ? highlightRow : null}>
      <td css={dateCss}>
        <div css={dateColWidth}>{dateFormat(new Date(date))}</div>
      </td>

      <td css={actionCss}>
        <div css={actionWidth}>
          <div css={descriptionCss}>
            <div>{description}</div>
            <div>
              {committee && (
                <>
                  👥 <em>
                    <Link href={`/committees/${committeeUrl(committee)}`}>{committee}</Link>
                  </em>
                </>
              )}
            </div>
          </div>

          {vote && thresholdRequired !== 'simple' ? (
            <div className="note">Supermajority required - {thresholdRequired}</div>
          ) : null}

          {showVotes && vote ? <VoteBlock description={description} vote={vote} /> : null}

          {recordings.length > 0 && (
            <div css={recordingLineCss}>
              📺🎙{' '}
              {recordings.map((url, i) => (
                <span key={String(i)}>
                  <a href={url}>Official recording {i + 1}</a>.{' '}
                </span>
              ))}
            </div>
          )}

          {transcriptUrl && (
            <div css={recordingLineCss}>
              <div>
                🤖📝 <a href={transcriptUrl}>Video and searchable computer-generated transcript</a>
              </div>
              <span className="note">
                via <a href="https://www.openmontana.org/">Open Montana</a> and{' '}
                <a href="https://councildataproject.org/">Council Data Project</a>
              </span>
            </div>
          )}

          {annotations
            .filter((a) => a.descriptionFilter(action))
            .map((annot) => {
              if (annot.url(action)) {
                return <a href={annot.url(action)}>{annot.label(action)}</a>;
              } else {
                return <span>{annot.label(action)}</span>;
              }
            })}
        </div>
      </td>
    </tr>
  );
};

export default BillActions;