import { useState } from 'react';

const UserSelector = ({ users, selectedUser, setSelectedUser, handleAddUser, handleClaimPoints, message }) => {
    const [newUserName, setNewUserName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newUserName.trim()) {
            handleAddUser(newUserName);
            setNewUserName('');
        }
    };

    return (
        <div className="bg-white rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Select User</h2>
            <select
                className="w-full p-2 mb-4 border rounded-md"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
            >
                {users.map(user => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                ))}
            </select>
            <button
                onClick={() => { console.log('clicking')
                    handleClaimPoints()
                }}
                className="w-full bg-gray-900 h-9 text-white p-2 rounded-md hover:bg-gray-950 transition"
            >
                Claim Points
            </button>
            {message && (
                <p className="mt-4 text-center text-green-600 animate-fadeIn">{message}</p>
            )}
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Add New User</h3>
                <div className="flex gap-2 flex-wrap justify-center items-center">
                    <input
                        type="text"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="Enter user name"
                        className="flex-1 p-2 border rounded-md"
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-gray-900 w-full text-white h-9 p-2 rounded-md hover:bg-gray-950 transition"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserSelector;