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
        <> 
            <h2>Account Settings</h2>

            <div className="settings-info osrs-font-rendering">
                <p>Username: <strong>{profile?.username || "Loading..."}</strong> </p>
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
