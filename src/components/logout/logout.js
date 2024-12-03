import { useState } from "react";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://expense-tracker-server-production-0ed9.up.railway.app/api/v1/usr/logout",
        {
          method: "POST",
          credentials: "include", // Ensure cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Redirect user to the login page after logout
        window.location.href = "/login";
      } else {
        // Handle errors if logout fails
        const data = await response.json();
        alert(data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLogout} disabled={loading}>
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
