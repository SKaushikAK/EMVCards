import axios from "axios";

export const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

// export const API2 = axios.create({
//     baseURL: "http://localhost:6000/api"
// });


// const response = await API.get("/api_details");
// http://localhost:5000/api/api_details