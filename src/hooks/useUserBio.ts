import { useState, useEffect } from 'react';
import { fetchUserBio } from '../services/userBioApi';
import type { UserBioApiResponse } from '../types/userBio';

export const useUserBio = (userId: number | null) => {
    const [userBio, setUserBio] = useState<UserBioApiResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            setUserBio(null);
            setLoading(false);
            setError(null);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchUserBio(userId);
                console.log("Data bio " + data);
                setUserBio(data);
            } catch (err) {
                console.error('Error fetching user bio:', err);
                setError("Failed to fetch user bio");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { userBio, loading, error };
};
