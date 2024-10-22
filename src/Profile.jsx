import React, { useEffect, useState } from "react";

// Component to display the profile
function Profile({ profileId }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile information from the API
  useEffect(() => {
    fetch(`http://localhost:8000/api/profile/${profileId}/`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, [profileId]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!profile) {
    return <p>Error loading profile.</p>;
  }

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>{profile.description}</p>
      <p>Max Attempts: {profile.max_attempts}</p>
    </div>
  );
}

export default Profile;
