
const Leaderboard = ({ users }) => {
    return (
        <div className="rounded-lg overflow-hidden">
            <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 text-left">Rank</th>
                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-b hover:bg-gray-50">
                                <td className="p-2">{user.rank}</td>
                                <td className="p-2">{user.name}</td>
                                <td className="p-2">{user.totalPoints}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;