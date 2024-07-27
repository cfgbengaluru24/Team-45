import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBarAdmin2 from './SideBarAdmin2'; 


// Sample data for donations
const sampleDonations = [
    { sno: 1, requestId: 'REQ001', donorId: 'DONOR001', amount: 500 },
    { sno: 2, requestId: 'REQ002', donorId: 'DONOR002', amount: 1000 },
    { sno: 3, requestId: 'REQ003', donorId: 'DONOR003', amount: 750 },
];

// All Donations Table Component
const AllDonationsTable = () => {
    const [donations, setDonations] = useState(sampleDonations);

    // Uncomment below for actual data fetching
    // useEffect(() => {
    //     axios.get('/api/donations')
    //         .then(response => {
    //             if (Array.isArray(response.data)) {
    //                 setDonations(response.data);
    //             } else {
    //                 console.error('Unexpected response format:', response.data);
    //                 setDonations([]);
    //             }
    //         })
    //         .catch(error => console.error('Error fetching donations:', error));
    // }, []);

    return (
        <div>
            <h2 className='text-xl font-bold mb-4'>All Donations</h2>
            <table className='min-w-full bg-white'>
                <thead>
                    <tr>
                        <th className='py-2 px-4 border'>S.No</th>
                        <th className='py-2 px-4 border'>Request ID</th>
                        <th className='py-2 px-4 border'>Donor ID</th>
                        <th className='py-2 px-4 border'>Amount Donated</th>
                    </tr>
                </thead>
                <tbody>
                    {donations.map(donation => (
                        <tr key={donation.sno}>
                            <td className='border px-4 py-2'>{donation.sno}</td>
                            <td className='border px-4 py-2'>{donation.requestId}</td>
                            <td className='border px-4 py-2'>{donation.donorId}</td>
                            <td className='border px-4 py-2'>{donation.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// All Donations Page Component
const AllDonationsPage = () => {
    return (
        <div className='flex'>
            <SideBarAdmin2 />
            <div className='flex-1 flex p-4'>
                <div className='w-full p-2'>
                    <AllDonationsTable />
                </div>
            </div>
        </div>
    );
};

export default AllDonationsPage;
