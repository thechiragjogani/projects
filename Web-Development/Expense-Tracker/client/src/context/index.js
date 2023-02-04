import React from 'react'

const Data = React.createContext()

export function useData() {
    return React.useContext(Data)
}

export const DataProvider = ({ children }) => {
    const [snackBar, setSnackBar] = React.useState({
        open: false,
        severity: "error",
        message: ""
    })
    const [user, setUser] = React.useState(null)
    const [TransactionData, setTransactionData] = React.useState([])

    const addNewTransaction = (transaction) => {
        setTransactionData([...TransactionData, transaction])
    }

    const handleUser = (res) => {
        setUser(res)
    }

    const handleSnackBar = (value) => {
        setSnackBar(value)
    }

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            setUser(user)
        }
    }, [])

    React.useEffect(() => {
        if (user) {
            fetch('/transaction', {
                method: "GET",
                headers: {
                    Authorization: user.token
                }
            })
                .then(response => response.json())
                .then(res => setTransactionData(res.data))
                .catch(err => console.log(err))
        }
    }, [user])

    return (
        <Data.Provider value={{ snackBar, handleSnackBar, user, handleUser, TransactionData, addNewTransaction }}>
            {children}
        </Data.Provider>
    )
}
