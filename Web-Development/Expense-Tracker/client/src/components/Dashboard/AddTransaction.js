import * as React from 'react';
import "./form.css"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { Box, Checkbox, FormControl, FormControlLabel, MenuItem, Select, TextField } from '@mui/material';
import { useData } from '../../context';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTransaction({ open, handleClose }) {
    const navigate = useNavigate();
    const { addNewTransaction, user, handleSnackBar } = useData()
    const [date, setDate] = React.useState('')
    const [method, setMethod] = React.useState('');
    const [amount, setAmount] = React.useState(0)
    const [desc, setDesc] = React.useState('')

    const [income, setIncome] = React.useState(false)
    const [expence, setExpence] = React.useState(true)

    const chengeTransaction = (e) => {
        if (e.target.id === "income") {
            setIncome(true)
            setExpence(false)
        } else {
            setIncome(false)
            setExpence(true)
        }
    }

    const handleSubmit = () => {
        if (date === "" || new Date(date).toString() === "Invalid Date") {
            handleSnackBar({
                open: true,
                severity: "error",
                message: "Invalid date"
            })
            return
        }
        if (method === "") {
            handleSnackBar({
                open: true,
                severity: "error",
                message: "please add a payment method"
            })
            return
        }
        if (isNaN(amount) || amount <= 0) {
            handleSnackBar({
                open: true,
                severity: "error",
                message: "please add a valid amount"
            })
            return
        }
        if (String(amount)[0] === '0') {
            handleSnackBar({
                open: true,
                severity: "error",
                message: "amount should not be start with 0"
            })
            return
        }

        let newTransaction = { date, method, amount, desc, income, expence }

        if (!user) {
            handleSnackBar({
                open: true,
                severity: "error",
                message: "First you have to login!"
            })
            navigate('/sign-in')
            return
        }

fetch('/transaction', {method: "POST", headers: {'Content-Type': 'application/json','Authorization': user.token},body: JSON.stringify(newTransaction)
        })
            .then(response => response.json())
            .then(res => {
                handleSnackBar({
                    open: true,
                    severity: "success",
                    message: res.message
                })
                addNewTransaction(res.data)
                setDate('')
                setMethod('')
                setAmount(0)
                setDesc('')
            })
            .catch(err => {
                handleSnackBar({
                    open: true,
                    severity: "error",
                    message: "Something went wrong!"
                })
                console.log(err)
            })

        handleClose()
    }

    const clearForm = () => {
        setDate('')
        setMethod('')
        setAmount(0)
        setDesc('')
        handleClose()
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <DialogContent sx={{ paddingBottom: 0 }}>
                <Box className='input-box'>
                    <span>Date: </span>
                    <TextField
                        variant="standard"
                        type="date"
                        sx={{ width: '168px' }}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </Box>
                <Box className='input-box'>
                    <span>Method: </span>
                    <FormControl fullWidth variant="standard">
                        <Select
                            value={method}
                            label="method"
                            onChange={(e) => setMethod(e.target.value)}
                            sx={{
                                height: '30px'
                            }}
                        >
                            <MenuItem value={"Account"}>Account</MenuItem>
                            <MenuItem value={"Cash"}>Cash</MenuItem>
                            <MenuItem value={"UPI"}>UPI</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box className='input-box'>
                    <span>Amount: </span>
                    <TextField
                        value={amount}
                        variant="standard"
                        type="number"
                        placeholder='0'
                        onChange={(e) => setAmount(e.target.value.replace(/^0+/, ''))}
                    />
                </Box>
                <Box className='input-box'>
                    <span>Desc: </span>
                    <TextField
                        variant="standard"
                        placeholder='description (if any)'
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </Box>

                <Box className='input-box'>
                    <FormControlLabel control={
                        <Checkbox
                            checked={income}
                            id="income"
                            onChange={chengeTransaction}
                        />
                    } label="Income" />
                    <FormControlLabel control={
                        <Checkbox
                            checked={expence}
                            id='expence'
                            onChange={chengeTransaction}
                            color='warning'
                        />
                    } label="Expense" />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={clearForm} color='error'>Close</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}