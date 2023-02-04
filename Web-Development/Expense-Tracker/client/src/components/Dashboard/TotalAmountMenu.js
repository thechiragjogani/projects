import { AppBar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useData } from '../../context'

function TotalAmountMenu() {
    const { TransactionData } = useData()
    const [income, setIncome] = useState(0)
    const [expence, setExpence] = useState(0)

    useEffect(() => {
        let inc = 0
        let exp = 0
        for (let i = 0; i < TransactionData.length; i++) {
            const obj = TransactionData[i];
            if (obj.income) {
                inc += obj.amount
            } else {
                exp += obj.amount
            }
        }

        setIncome(inc)
        setExpence(exp)
    }, [TransactionData])

    return (
        <AppBar position="fixed" style={{
            backgroundColor: "#fff",
            marginTop: "46px",
            zIndex: 1,
            boxShadow: 'none'
        }}>
            <div className='amount-menu'>
                <div className='amount income'>
                    <p>Income</p>
                    <span>{income.toFixed(2)}</span>
                </div>
                <div className='amount expense'>
                    <p>Expenses</p>
                    <span>{expence.toFixed(2)}</span>
                </div>
                <div className='amount total'>
                    <p>Total</p>
                    <span>{(income - expence).toFixed(2)}</span>
                </div>
            </div></AppBar>
    )
}

export default TotalAmountMenu
