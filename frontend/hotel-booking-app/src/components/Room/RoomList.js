
import React from 'react';

const RoomList = ({ rooms }) => {
    return (
        <div>
            <h2>Room List</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">roomNumber</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">roomType</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">availability</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">roomPrice</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {rooms.map((item, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{item.roomNumber}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.roomType}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.available ? 'Available' : 'Not Available'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.roomPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoomList;
