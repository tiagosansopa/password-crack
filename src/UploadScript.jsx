import { useState } from "react";

function UploadScript({ profileId }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a Python script.");
      return;
    }

    const formData = new FormData();
    formData.append("script", file);

    // Call API to submit Python script for the profile
    const response = await fetch(
      `http://localhost:8000/api/test-script/${profileId}/`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    setResult(data.message);
  };

  return (
    <div>
      <h2>Upload your Python script to test</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".py"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Test Script</button>
      </form>
      <p>{result}</p>
    </div>
  );
}

export default UploadScript;
