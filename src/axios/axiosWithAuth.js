import axios from 'axios';

const axiosWithAuth = () => {
    const token = window.localStorage.getItem("token");

	return axios.create({
		headers: {
			Authorization: `Bearer ${token}`,
		},
		baseURL: "http://localhost:2019/",
	});
}

export default axiosWithAuth;