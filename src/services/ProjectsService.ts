import axios from 'axios';

//User
export const getUserProfile = (token: number) => {
  return axios.get(`https://workcloud-api.onrender.com/auth/profile/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
export const getProjectsByUser = async (id: number, token: number) => {

  // console.log("id - Token");
  // console.log(id, token);
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
export const getTasks = async (id: number, token: number) => {
  const res = await axios.get(
    `https://workcloud-api.onrender.com/api/v1/tasks/by_project/`, {
    params: {
      id_project: id,
    },
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return res.data;
}

export const getCommtents = async (id:number, token:number) => {
  try {
    const response = await axios.get(
      `https://workcloud-api.onrender.com/api/v1/comments/by_project/`,
      {
        params: {
          id_project: id,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error(`Error getting comments.`, error);
    return { error: "Error getting comments." };
  }
};