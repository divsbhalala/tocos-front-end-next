import React, {useState} from 'react';
import {postUser} from "@/service/userService";

interface AddUserFormProps {
    onAddUser: (newUser: UserApiResponse) => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({onAddUser}) => {
    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');

    const handleAddUser = async () => {
        if (name && balance) {
            const newUser: UserApiRequest = {
                name,
                balance: parseFloat(balance),
            };
            const user: UserApiResponse = await postUser(newUser);
            onAddUser(user);
            setName('');
            setBalance('');
        }
    };

    return (
        <div className={'flex'}>
            <h2>Add User</h2>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    required
                    className={"mr-2 text-black"}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    required
                    placeholder="Balance"
                    className={"mr-2 text-black"}
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                />
                <button className={"mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                        onClick={handleAddUser}>Add User
                </button>
            </div>
        </div>
    );
};

export default AddUserForm;
