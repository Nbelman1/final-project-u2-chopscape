import { useEffect, useState } from "react";

const Settings = ({ onLogout, setIsDeleteModalOpen, username }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (username) {
            setLoading(true);
            fetch(`http://localhost:8080/api/users/profile/${username}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("User not found on server");
                    }
                    return response.json();
                })
                .then(data => {
                    setProfile(data);
                    setLoading(false);
                })
                .catch(error => {
                    setProfile(null);
                    setLoading(false);
                });
        }
    }, [username]);

    const formattedDate = profile?.dateCreated
        ? new Date(profile.dateCreated).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : "N/A";

    return (
        <div className="login-page-wrapper">
            <div className="settings-box"> 
                <h2 className="light-shadow">Account Settings</h2>

                <div className="settings-info osrs-font-rendering">
                    <p>Username: {profile?.username || "Loading..."} </p>
                    <p>Date created: {formattedDate} </p>
                    <p>Woodcutting level: {profile?.levelWoodcutting || 1} </p>
                    <p>Woodcutting experience: {profile?.expWoodcutting?.toLocaleString() || 0}</p>
                </div>

                <button onClick={onLogout} className="osrs-button">Log Out</button>
                <button onClick={() => setIsDeleteModalOpen(true)} className="osrs-button">Delete Account</button>
            </div>
        </div>
    );
};

export default Settings;
