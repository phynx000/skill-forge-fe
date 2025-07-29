import axios from "axios";
import type { CourseApiResponse } from '../types/course';


const BASE_URL_SERVER = import.meta.env.VITE_BASE_URL_SERVER;
const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjJAZ21haWwuY29tIiwiZXhwIjoxNzYyMzM3Njk1LCJpYXQiOjE3NTM2OTc2OTUsInVzZXIiOnsiaWQiOjUwMiwidXNlcm5hbWUiOiJhZG1pbjIiLCJmdWxsTmFtZSI6IkRhbmggUGh1b2MgVG9hbiIsImVtYWlsIjoiYWRtaW4yQGdtYWlsLmNvbSJ9LCJwZXJtaXNzaW9ucyI6WyJST0xFX1VTRVJfQ1JFQVRFIiwiUk9MRV9VU0VSX1VQREFURSJdfQ.3xMW0nj0hGP1xx4dvW4968-0mufAApOYJ-tOYhpxjVymY2ClahXqv-zLGeZn-5UkgMZgQUYaDd97PB2K2t4ufQ"

export const fetchCourses = async (
       current: number = 1,
       pageSize: number = 10
) : Promise<CourseApiResponse> => {
    const response = await axios.get<CourseApiResponse>(
        `${BASE_URL_SERVER}/api/v1/courses?current=${current}&pageSize=${pageSize}`
        , {
         headers: {
                Authorization: `Bearer ${accessToken}`,
      },
    }
    );
    console.log("Response from API:", response.data);
    console.log("Current Page:", current);
    console.log("Page Size:", pageSize);
    return response.data;
}