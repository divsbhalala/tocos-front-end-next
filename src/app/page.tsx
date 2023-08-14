"use client";
import Image from 'next/image'
import {useEffect, useState} from "react";
import {getAllUser} from "@/service/userService";
import AddUserForm from "@/components/AddUserForm";
import {getAllTransaction} from "@/service/transactionService";
import AddTransactionForm from "@/components/AddTransactionForm";

export default function Home() {
    const [users, setUsers] = useState<UserApiResponse[]>([])
    const [transactions, setTransactions] = useState<TransactionApiResponse[]>([])
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [showTransactionForm, setShowTransactionForm] = useState(false);
    const handleAddUser = (newUser: UserApiResponse) => {
        setUsers([...users, newUser]);
        setShowAddUserForm(false);
    };
    const handleTransaction = (newTransaction: TransactionApiResponse) => {
        fetchAllTransaction()
        setShowTransactionForm(false)
    };
    const fetchAllUser = async () => {
        const users: UserApiResponse[] = await getAllUser();
        setUsers(users);
    }
    const fetchAllTransaction = async () => {
        const transaction: TransactionApiResponse[] = await getAllTransaction();
        setTransactions(transaction);
    }
    useEffect(() => {
        fetchAllUser();
        fetchAllTransaction();
    }, [])
    return (
        <main className="inline-flex min-h-screen  p-24">
            <div>
                <div>
                    {showAddUserForm && <AddUserForm onAddUser={handleAddUser}/>}
                    {!showAddUserForm && <button onClick={() => setShowAddUserForm(!showAddUserForm)} type={"button"}
                                                 className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Add User
                    </button>
                    }
                    <h1>User List</h1>
                    <table className="table-auto">
                        <thead>
                        <tr>
                            <th className="px-4 py-2">Id</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Balance</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border px-4 py-2">{user.id}</td>
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.balance}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
            </div>
            <div className={'ml-7'}>
                {showTransactionForm && <AddTransactionForm onAddTransactionDone={handleTransaction}/>}
                {!showTransactionForm &&
                  <button onClick={() => setShowTransactionForm(!showTransactionForm)} type={"button"}
                          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Transaction
                  </button>
                }
                <h1>Transaction</h1>
                <table className="table-auto">
                    <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Sender</th>
                        <th className="px-4 py-2">Receiver</th>
                        <th className="px-4 py-2">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td className="border px-4 py-2">{transaction.id}</td>
                            <td className="border px-4 py-2">{transaction.sender.name}</td>
                            <td className="border px-4 py-2">{transaction.receiver.name}</td>
                            <td className="border px-4 py-2">{transaction.amount}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}
