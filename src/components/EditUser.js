import React, { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, updateUser } from "../redux/actions";

const EditUser = () => {
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    avator: "",
  });
  console.log("state", state);
  const [error, setError] = useState("");
  let { id } = useParams();
  const { user } = useSelector((state) => state.data);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { first_name, last_name, email, avator } = state;

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, []);

  useEffect(() => {
    if (user) {
      setState({ ...user });
    }
  }, [user]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!first_name || !last_name || !email || !avator) {
      setError("Please input all input Field");
    } else {
      dispatch(updateUser(state, id));
      navigate("/");
      setError("");
    }
  };
  return (
    <div>
      <Button
        style={{ width: "100px", marginTop: "20px" }}
        variant="contained"
        color="secondary"
        onClick={() => navigate("/")}
      >
        Go Back
      </Button>
      <h2>Edit User</h2>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Avator"
          value={avator || ""}
          name="avator"
          type="file"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="First_name"
          value={first_name || ""}
          name="first_name"
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Last_name"
          value={last_name || ""}
          name="last_name"
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Email"
          name="email"
          value={email || ""}
          type="email"
          onChange={handleInputChange}
        />
        <br />

        <Button
          style={{ width: "100px" }}
          variant="contained"
          color="primary"
          type="submit"
          onChange={handleInputChange}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
