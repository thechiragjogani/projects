import React from 'react'
import "./dashboard.css"
import "./form.css"
import TotalAmountMenu from './TotalAmountMenu'
import TransactionList from './TransactionList'
import AddTransaction from './AddTransaction'

function Dashboard() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className='dash-container'>
            <TotalAmountMenu />
            <TransactionList />

            <AddTransaction open={open} handleClose={handleClose} />
            <button className='add-icon' onClick={handleClickOpen}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    )
}

export default Dashboard
