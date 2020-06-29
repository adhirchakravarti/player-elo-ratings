import axios from "axios";

function axiosPostRequest(path, data) {
  return axios
    .post(`http://localhost:3000${path}`, data)
    .then((response) => {
      // console.log(response);
      return response.data;
    })
    .catch((error) => error);
}

export default axiosPostRequest;
