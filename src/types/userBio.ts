export interface Skill {
    id: number;
    name: string;
    logo: string;
}

export interface Education {
    id: number;
    degree: string;
    institution: string;
    major: string;
    year: number;
}

export interface UserBio {
    fullName: string;
    description: string | null;
    skills: Skill[];
    education: Education[];
}

export interface UserBioApiResponse {
    statusCode: number;
    error: null | string;
    message: string;
    data: UserBio;
}
