export async function checkAuth(setData = null) {
  try {
    const authorized = await fetch(
      "https://expense-tracker-server-production-0ed9.up.railway.app/api/v1/usr/dashboard",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (authorized.ok) {
      const data = await authorized.json();
      if (setData) setData(data);
      return true;
    } else if (authorized.status === 401) {
      console.log("Token expired, refreshing...");
      return await refreshToken(setData);
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in checkAuth: ", error);
    return false;
  }
}

export async function refreshToken(setData = null) {
  try {
    const response = await fetch(
      "https://expense-tracker-server-production-0ed9.up.railway.app/api/v1/usr/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (response.ok) {
      console.log("Token refreshed successfully");
      return await checkAuth(setData); // Retry auth check
    } else {
      console.log("error refreshing token");
      return false;
    }
  } catch (error) {
    console.error("Error in refreshToken: ", error);
    return false;
  }
}
