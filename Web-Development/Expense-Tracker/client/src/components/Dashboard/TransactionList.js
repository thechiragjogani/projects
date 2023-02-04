import React from 'react'
import { useData } from '../../context'

function TransactionList() {
    const { TransactionData } = useData()
    const [sortedData, setSortedData] = React.useState([])

    React.useEffect(() => {
        // sort the list by date
        let list = TransactionData.sort((a, b) => new Date(b.date) - new Date(a.date))
        setSortedData(list)
    }, [TransactionData])

    return (
        <div className='transaction-lists'>
            {sortedData?.map(data => (
                <Transaction key={data._id} data={data} />
            ))}
        </div>
    )
}

function Transaction({ data }) {
    const [day, setDay] = React.useState('')

    React.useEffect(() => {
        // get the dayname with date
        let day = new Date(data.date).toLocaleString('en-us', { weekday: 'short' });
        setDay(day)
    }, [data.date])
    return (
        <div className='date-amount'>
            <div className='transaction-date'>
                <span className='week-day'>
                    <span>{data.date.split('-')[2]}</span>
                    <span>{day}</span>
                </span>
                <span>{data.date.split('-')[1]} / {data.date.split('-')[0]}</span>
            </div>
            <div className='payment-method'>
                <span>{data.desc}</span>
                <span {
                    ...(data.method === "UPI" &&
                        { style: { backgroundColor: "#f9c803", color: '#000' } })
                    ||
                    (data.method === "Cash" &&
                        { style: { backgroundColor: "gray", color: '#fff' } })
                }>{data.method}</span>
            </div>
            {data.income && <div className='inc-amount'>
                <span>+ {data.amount.toFixed(2)}</span>
            </div>}
            {data.expence && <div className='exc-amount'>
                <span>- {data.amount.toFixed(2)}</span>
            </div>}
        </div>
    )
}

export default TransactionList
