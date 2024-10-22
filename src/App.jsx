import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import UploadScript from "./UploadScript";

function PasswordCrackerApp() {
  const [profileId, setProfileId] = useState(1); // Default profile ID

  // Switch between different profiles (example implementation)
  const handleProfileChange = (e) => {
    setProfileId(e.target.value);
  };

  return (
    <div>
      <h1>Password Cracker Testing Platform</h1>

      {/* Dropdown or input to change between profiles */}
      <label>
        Choose Profile ID:
        <select value={profileId} onChange={handleProfileChange}>
          <option value={1}>Profile 1</option>
          <option value={2}>Profile 2</option>
          <option value={3}>Profile 3</option>
          <option value={4}>Profile 4</option>
          <option value={5}>Profile 5</option>
        </select>
      </label>

      {/* Display profile information */}
      <Profile profileId={profileId} />

      {/* Script upload and result display */}
      <UploadScript profileId={profileId} />
    </div>
  );
}

export default PasswordCrackerApp;
