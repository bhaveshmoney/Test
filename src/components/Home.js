import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, loadUsers } from "../redux/actions";
import { Avatar, Button, ButtonGroup } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Home = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { users } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handleDelete = (id) => {
    console.log("id", id);
    if (window.confirm("Are you sure wanted to delete the user ?")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 900 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Profile</StyledTableCell>
            <StyledTableCell align="center">First-Name</StyledTableCell>
            <StyledTableCell align="center">Last-Name</StyledTableCell>
            <StyledTableCell align="center">E-mail</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" align="center" scope="row">
                  <Avatar alt={user.avatar} src={user.avatar} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.first_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.last_name}
                </StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonGroup variant="contained">
                    <Button
                      style={{ marginRight: "5px" }}
                      color="secondary"
                      onClick={() => handleDelete(user.id)}
                    >
                      <DeleteOutlineIcon />
                    </Button>
                    <Button 
                    color="primary"
                    onClick={() => navigate(`/editUser/${user.id}`)}
                    >
                      
                      <EditIcon />
                    </Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Home;
