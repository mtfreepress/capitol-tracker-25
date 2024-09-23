import React from "react"
import { Link } from 'gatsby'
import { css } from "@emotion/react"

import Layout from '../../components/Layout'
import Seo from '../../components/Seo'

import { dateFormat } from '../../config/utils.js'

import bills from '../../data-nodes/bills.json'

const tableStyle = css`
    td {
        width: 100px;
        font-size: 0.9em;
        padding: 0.5em;
        border: 1px solid var(--tan1);

    }
`

const STEP_ICONS = {
    'future': ' ',
    'current': '✴️',
    'passed': '✅',
    'blocked': '🛑',
    'skipped': ' ',
}

const AllBillsProgress = ({ location }) => {
    const rows = bills.map(bill => {
        const dataCells = bill.progress.map(step => {
            return <td>
                <div><strong>{step.statusLabel}</strong></div>
                <div>{STEP_ICONS[step.status]} {step.statusDate && dateFormat(new Date(step.statusDate))}</div>

            </td>
        })
        return <tr key={bill.key}>
            <td><Link to={`/bills/${bill.key}`}>{bill.identifier}</Link></td>
            {dataCells}
        </tr>
    })
    return <div>
        <Seo title="All bills" />
        <Layout location={location}>

            <h1>List of all bills</h1>
            <table css={tableStyle}>
                <thead><tr>
                    <th>Bill</th>
                    <th>Introduction</th>
                    <th>First chamber committees</th>
                    <th>First chamber floor </th>
                    <th>Second chamber </th>
                    <th>Reconciliation</th>
                    <th>Governor</th>
                </tr></thead>
                <tbody>
                    {rows}
                </tbody>
            </table>

        </Layout>
    </div>
}

export default AllBillsProgress