
import axios from 'axios';
import { useEffect, useState } from 'react';
import Leaderboard from './components/Leaderboard';
import PointHistory from './components/PointHistory';
import UserSelector from './components/UserSelector';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Skeleton } from './components/ui/skeleton';

const API_BASE = import.meta.env.VITE_API_URL;

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [pointHistory, setPointHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClaiming, setIsClaiming] = useState(false);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/users`);
      setUsers(data);
      if (data.length > 0 && !selectedUser) {
        setSelectedUser(data[0]._id);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const fetchPointHistory = async () => {
    if (!selectedUser) return;

    try {
      const { data } = await axios.get(`${API_BASE}/points/history/${selectedUser}`);
      setPointHistory(data);
    } catch (err) {
      console.error('Failed to fetch point history:', err);
    }
  };

  const handleClaimPoints = async () => {
    if (!selectedUser || isClaiming) return;
    setIsClaiming(true);
    try {
      await axios.post(`${API_BASE}/points/claim`, { userId: selectedUser });
      await fetchUsers()
      await fetchPointHistory()
    } catch (err) {
      console.error('Failed to claim points:', err);
    } finally {
      setIsClaiming(false);
    }
  };

  const handleAddUser = async (name) => {
    try {
      await axios.post(`${API_BASE}/users`, { name });
      await fetchUsers();
    } catch (err) {
      console.error('Failed to add user:', err);
    }
  };

  const initialize = async () => {
    setIsLoading(true);
    try {
      await axios.get(`${API_BASE}/users/initialize`);
      await fetchUsers();
    } catch (err) {
      console.error('Initialization failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-[200px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-[200px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Points Leaderboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">

          <Card>
            <CardHeader>
              <CardTitle>Point History</CardTitle>
            </CardHeader>
            <CardContent>
              <PointHistory
                history={pointHistory}
                fetchPointHistory={fetchPointHistory}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <UserSelector
                users={users}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                handleAddUser={handleAddUser}
              />
              <Button
                className="w-full mt-4"
                onClick={handleClaimPoints}
                disabled={isClaiming || !selectedUser}
                variant="outline"
              >
                {isClaiming ? "Claiming..." : "Claim Points"}
              </Button>
            </CardContent>
          </Card>

        </div>
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Leaderboard users={users} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default App;