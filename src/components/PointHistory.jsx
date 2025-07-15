import { format } from 'date-fns';
import { useEffect } from 'react';
import { CardTitle } from './ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const PointHistory = ({ history, fetchPointHistory }) => {

    useEffect(() => {
        fetchPointHistory();
    }, []);

    return (
        <div>
            <div>
                <CardTitle className="text-xl">Point History</CardTitle>
            </div>
            <div>
                {(
                    <Table>
                        <TableCaption>A list of your recent point transactions.</TableCaption>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="w-[200px]">Date & Time</TableHead>
                                <TableHead>Points</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {history.length > 0 ? (
                                history.map((record) => (
                                    <TableRow key={record._id} className="hover:bg-muted/50">
                                        <TableCell className="font-medium">
                                            {format(new Date(record.timestamp), "MMM dd, yyyy h:mm a")}
                                        </TableCell>
                                        <TableCell className={record.points > 0 ? "text-green-600" : "text-red-600"}>
                                            {record.points > 0 ? `+${record.points}` : record.points}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={2} className="text-center h-24">
                                        No history found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
};

export default PointHistory;