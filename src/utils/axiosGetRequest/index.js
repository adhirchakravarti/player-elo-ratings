import axios from "axios";

function axiosGetRequest(data) {
  return axios
    .get("http://localhost:3000/matches")
    .then((response) => {
      return response.data;
    })
    .catch((error) => error);
}

export default axiosGetRequest;
