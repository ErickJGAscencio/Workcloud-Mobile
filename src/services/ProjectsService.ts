import axios from 'axios';

//User
export const getUserProfile = (token:number) => {
  return axios.get(`https://workcloud-api.onrender.com/auth/profile/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
export const getProjectsByUser = async (id: number, token: number) => {
  
  console.log("id - Token");
  console.log(id, token);
  const res = await axios.get(
      `https://workcloud-api.onrender.com/api/v1/projects/by_user/`, {
      params: {
        user_id: id,
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  return res.data;
};
