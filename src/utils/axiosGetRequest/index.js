import axios from "axios";

function axiosGetRequest(path) {
  return axios
    .get(`http://localhost:3000${path}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => error);
}

export default axiosGetRequest;
