import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { CourseApiResponse } from '../types/course';


const BASE_URL_SERVER = import.meta.env.development.VITE_BASE_URL_SERVER;

export const fetchCourses = async (
       page: number = 1,
       pageSize: number = 10
) : Promise<CourseApiResponse> => {
    const response = await axios.get<CourseApiResponse>(
        `${BASE_URL_SERVER}/courses?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
}