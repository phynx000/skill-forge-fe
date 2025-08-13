import { publicClient } from './axiosConfig';
import type { UserBioApiResponse } from '../types/userBio';

export const fetchUserBio = async (userId: number): Promise<UserBioApiResponse> => {
    try {
        console.log('🔥 Fetching user bio for ID:', userId);
        const response = await publicClient.get<UserBioApiResponse>(
            `/api/v1/bio/${userId}`
        );
        console.log('✅ Response from user bio API:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching user bio:', error);
        throw error;
    }
};
