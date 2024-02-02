import { apiClient } from "./ApiClient";

// export function retriveHelloWorldBean(){
//     return axios.get('http://localhost:8080/hello-world-bean');
// }

// export const retriveHelloWorldBean = () => axios.get('http://localhost:8080/hello-world-bean');


export const retriveHelloWorldBean = () => apiClient.get('/hello-world-bean');

export const retriveHelloWorldPathVariable 
= (username, token) => apiClient.get(`/hello-world/path-variable/${username}`
// ,{
//     headers: {
//         Authorization: token
//     }
// }
);

