import React, {useState} from 'react';
import {postUser} from "@/service/userService";
import {postTransaction} from "@/service/transactionService";

interface AddTransactionProps {
    onAddTransactionDone: (newUser: TransactionApiResponse) => void;
}

const AddUserForm: React.FC<AddTransactionProps> = ({onAddTransactionDone}) => {
    const [sender, setSender] = useState('');
    const [amount, setAmount] = useState('');
    const [receiver, setReceiver] = useState('');
    const [error, setError] = useState('');

    const handleAddTransaction = async () => {
        setError('');
        if (sender && amount && receiver) {
            const newTransaction: TransactionApiRequest = {
                senderId: sender,
                receiverId: receiver,
                amount: parseFloat(amount),
            };
            const transaction: TransactionApiResponse = await postTransaction(newTransaction);
            console.log("transaction", transaction)
            if (transaction.error) {
                setError(transaction.error)
            }
            onAddTransactionDone(transaction);
            setReceiver('');
            setAmount('');
            setSender('');
        }
    };

    return (
        <form className={'flex'} onSubmit={(e) => {
            e.preventDefault()
        }}>
            <h2>Add Transaction</h2>
            {error && <div className="text-red-500">{error}</div>}
            <div>
                <input
                    type="text"
                    placeholder="Sender"
                    value={sender}
                    required
                    className={"mr-2 text-black"}
                    onChange={(e) => setSender(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Receiver"
                    value={receiver}
                    required
                    className={"mr-2 text-black"}
                    onChange={(e) => setReceiver(e.target.value)}
                />
                <input
                    type="number"
                    required
                    placeholder="Balance"
                    className={"mr-2 text-black"}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button className={"mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                        onClick={
                            handleAddTransaction
                        }>Add Transaction
                </button>
            </div>
        </form>
    );
};

export default AddUserForm;
