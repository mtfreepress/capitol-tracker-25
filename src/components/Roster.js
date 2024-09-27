import fs from 'fs'
import path from 'path'
import React from 'react'
import { css } from '@emotion/react'
import LawmakerTable from '../components/LawmakerTable'

// CSS styles
const sideBySideTableCss = css`
  display: flex;
  flex-wrap: wrap;
  margin: -0.5em;
`
const tableContainerCss = css`
  flex: 1 0 300px;
  min-width: 380px;
  margin: 0.5em;
`

const Roster = ({ lawmakers }) => {
  return (
    <div>
      <div css={sideBySideTableCss}>
        <div css={tableContainerCss}>
          <h4>Republicans</h4>
          <LawmakerTable lawmakers={lawmakers.filter(d => d.party === 'R')} />
        </div>
        <div css={tableContainerCss}>
          <h4>Democrats</h4>
          <LawmakerTable lawmakers={lawmakers.filter(d => d.party === 'D')} />
        </div>
      </div>
    </div>
  )
}

export default Roster

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data-nodes', 'lawmakers.json')
  const data = fs.readFileSync(filePath, 'utf8')
  const lawmakers = JSON.parse(data)

  return {
    props: {
      lawmakers,
    },
  }
}