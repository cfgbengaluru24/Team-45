import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import EditProfile from './EditGrassRooterProfile';

const UserInfo = () => {
    const [user, setUser] = useState({name: "test", username: "test", email: "test", phone: "test", address: {suite: "test", street: "test", city: "test", zipcode: "test"}});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // const { donorId } = useGrassRooterContext();

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:8080/v1/donors/donations/${donorId}`);
    //             setUser(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             setError(error);
    //             setLoading(false);
    //         }
    //     };

    //     if (donorId) {
    //         fetchUserData();
    //     }
    // }, [donorId]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = (updatedUser) => {
        setUser((prevUser) => ({
            ...prevUser,
            ...updatedUser,
            company: { ...prevUser.company, name: updatedUser.company },
            address: {
                ...prevUser.address,
                suite: updatedUser.address.split(',')[0].trim(),
                street: updatedUser.address.split(',')[1].trim(),
                city: updatedUser.address.split(',')[2].trim(),
                zipcode: updatedUser.address.split(',')[3].trim(),
            },
        }));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    if (loading) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500">Error fetching user data</div>;
    }

    if (isEditing && user) {
        return <EditProfile user={user} onSave={handleSave} onCancel={handleCancel} />;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md w-full">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">User Profile</h1>
            <div className="flex items-center mb-4">
                <img
                    className="w-24 h-24 rounded-full mr-4"
                    src={`https://via.placeholder.com/150`} // Placeholder avatar
                    alt="User Avatar"
                />
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">{user?.name}</h2>
                    <p className="text-gray-600">@{user?.username}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2">
                    <p className="text-gray-700"><strong>Email:</strong> {user?.email}</p>
                </div>
                <div>
                    <p className="text-gray-700"><strong>Phone:</strong> {user?.phone}</p>
                </div>
                <div className="col-span-2">
                    <p className="text-gray-700"><strong>Address:</strong> {`${user?.address?.suite}, ${user?.address?.street}, ${user?.address?.city}, ${user?.address?.zipcode}`}</p>
                </div>
            </div>
            <div className="mt-6 text-center">
                <button onClick={handleEdit} className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600">Edit Profile</button>
            </div>
        </div>
    );
};

export default UserInfo;
