import { useEffect, useState } from "react";

const Settings = ({ onLogout, setIsDeleteModalOpen, stats }) => {
    const userId = stats.userId;
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:8080/api/users/profile/${userId}`)
                .then(res => res.json())
                .then(data => setProfile(data))
        }
    }, [userId]);

    const formattedDate = profile?.dateCreated
        ? new Date(profile.dateCreated).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : "N/A";

    return (
        <> 
            <h2>Account Settings</h2>

            <div className="settings-info">
                <p>Username: <strong>{profile?.username || "Guest"}</strong> </p>
                <p>Date created: <strong>{formattedDate}</strong> </p>
                <p>Woodcutting level: <strong>{profile?.levelWoodcutting || 1}</strong> </p>
                <p>Woodcutting experience: <strong>{profile?.expWoodcutting?.toLocaleString() || 0}</strong> </p>
            </div>

            <button onClick={onLogout}>Log Out</button>
            <button onClick={() => setIsDeleteModalOpen(true)}>Delete Account</button>
        </>
    );
};

export default Settings;
