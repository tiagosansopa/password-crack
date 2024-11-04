import { useState } from "react";

const useApi = () => {
  const [loading, setLoading] = useState(false);

  const fetchWithRefresh = async (url, options = {}) => {
    setLoading(true);

    let response = await fetch(url, options);

    if (response.status === 401) {
      // Token might be expired, try refreshing
      const refreshToken = localStorage.getItem("refresh");
      if (refreshToken) {
        const refreshResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/token/refresh/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
          }
        );

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          localStorage.setItem("token", data.access); // Update access token

          // Retry the original request with the new token
          response = await fetch(url, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${data.access}`,
            },
          });
        } else {
          // Refresh token failed, clear tokens and redirect to login if needed
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
          alert("Session expired. Please log in again.");
        }
      }
    }

    setLoading(false);
    return response;
  };

  return { fetchWithRefresh, loading };
};

export default useApi;
