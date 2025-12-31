



export const getTokenForClientSessionData = async () => {
    try {
        const res = await fetch(`/api/token`)
        const data = await res.json()
        console.log("JWT Token from server:", data.token)
        return data?.token || null
    } catch (err) {
        console.error("Error fetching token:", err)
    }
}


export const getTokenForSessionData = async (session) => {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: session?.user?.email || null,
            }),
        });

        const data = await res.json();
        // console.log("JWT Token from server:", data.token);
        return data?.token || null;
    } catch (err) {
        // console.error("Error fetching token:", err);
        return null;
    }
};