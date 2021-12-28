import * as types from "./actionType";
import axios from "axios";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

const userDeleted = () => ({
  type: types.DELETE_USER,
});
const userUpdated = () => ({
  type: types.UPDATE_USER,
});
const getUser = (user) => ({
  type: types.GET_SINGLE_USER,
  payload: user,
});

export const loadUsers = () => {
  return function (dispatch) {
    axios
      .get(`https://reqres.in/api/users`)
      .then((resp) => {
        // console.log("resp", JSON.stringify(resp));
        
        localStorage.setItem("localUser", JSON.stringify(resp.data.data));
        dispatch(getUsers(JSON.parse(localStorage.getItem("localUser"))));
      })
      .catch((error) => console.log(error));
  };
};

export const deleteUser = (id) => {
  return function (dispatch) {
    let localUser = JSON.parse(localStorage.getItem("localUser"));
    localUser = localUser.filter((localUser) => localUser.id !== id);
    localStorage.setItem("localUser", JSON.stringify(localUser));
    if (localUser.length === 0) {
      localStorage.removeItem("localUser");
    }
    dispatch(getUsers(JSON.parse(localStorage.getItem("localUser"))));
  };
};

export const getSingleUser = (id) => {
  console.log("singleuser",id);
  return function (dispatch) {
   
    
    let localUser = JSON.parse(localStorage.getItem("localUser"));
    console.log("localUser1",localUser);
    let localUser1 = localUser.filter((localUser) => localUser.id !== id);
    console.log("localUser2",localUser1);
    // localStorage.setItem("localUser", JSON.stringify(localUser));
    // if (localUser.length === 0) {
      dispatch(getUsers(JSON.parse(localStorage.getItem("localUser")))); 
      
    // }
   
  };
};

export const updateUser = (user, id) => {
  
  return function (dispatch) {
      dispatch(userUpdated(JSON.stringify(localStorage.setItem("localUser",id))));
  };
};
