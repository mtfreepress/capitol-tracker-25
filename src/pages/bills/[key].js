import BillCard from '../../components/bill/BillCard.js';
import bills from '../../data-nodes/bills.json';

export async function getStaticPaths() {
    const paths = bills.map(bill => ({
        params: { key: bill.key },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const bill = bills.find(bill => bill.key === params.key);

    return { props: { bill } };
}

const BillPage = ({ bill }) => {
    if (!bill) return <div>Bill not found</div>;

    return (
        <div>
            <BillCard bill={bill} />
        </div>
    );
};

export default BillPage;
