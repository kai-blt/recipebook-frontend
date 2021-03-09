import axios from 'axios';

const axiosWithAuth = () => {
  const token = window.localStorage.getItem("token");

	return axios.create({
		headers: {
			Authorization: `Bearer ${token}`,
		},
		baseURL: "https://kaiblt-recipebook.herokuapp.com/",
	});
}

export default axiosWithAuth;