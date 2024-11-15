import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Button,
  Snackbar,
  tableCellClasses,
} from "@mui/material";
import Checkbox from "@mui/joy/Checkbox";

import {
  BiDotsVerticalRounded,
  BiShieldAlt,
  BiTrash,
  BiEditAlt,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";
import { AlertTriangle } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const TOKEN = localStorage.getItem("token") || "";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#454243",
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UsersTable = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuUserId, setMenuUserId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editableUser, setEditableUser] = useState(null);
  const [changePassword, setChangePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        setUsersData(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [TOKEN]);

  const handlePromoteToAdmin = async (userId, currentRole) => {
    const endpoint =
      currentRole === "ROLE_ADMINISTRATOR"
        ? `${API_BASE_URL}/users/${userId}/demote`
        : `${API_BASE_URL}/users/${userId}/promote`;

    try {
      const response = await axios.put(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      setUsersData((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                role:
                  currentRole === "ROLE_ADMINISTRATOR"
                    ? "ROLE_CUSTOMER"
                    : "ROLE_ADMINISTRATOR",
              }
            : user
        )
      );
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleEditClick = (user) => {
    setEditableUser(user);
    setIsEditModalOpen(true);
  };

  const handleClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setMenuUserId(userId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuUserId(null);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const mapRole = (role) => {
    if (role === "ROLE_ADMINISTRATOR") return "Administrator";
    if (role === "ROLE_CUSTOMER") return "Customer";
    return role;
  };

  const totalPages = Math.ceil(usersData.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    return (
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`text-[#D05858] text-4xl font-bold ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <BiChevronLeft />
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              currentPage === index + 1
                ? "bg-[#373737] text-white"
                : "text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`text-[#D05858] text-4xl font-bold ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <BiChevronRight />
        </button>
      </div>
    );
  };

  return (
    <main className="w-full bg-[#454243] min-h-screen flex flex-col items-center justify-center">
      <section className="w-full mx-auto py-10 px-4 sm:px-10">
        <div className="space-y-10">
          <h1 className="text-[#D05858] font-bold text-5xl">User Management</h1>
          <div className="flex flex-col items-center bg-[#FFFFFF] border-4 border-white-500 rounded-lg">
            <TableContainer
              component={Paper}
              sx={{ width: "100%" }}
              className="w-full h-[420px]"
            >
              <Table sx={{ width: "100%" }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell className="w-1/12 text-white">
                      ID
                    </StyledTableCell>
                    <StyledTableCell className="w-2/12 text-white truncate">
                      First Name
                    </StyledTableCell>
                    <StyledTableCell className="w-2/12 text-white truncate">
                      Last Name
                    </StyledTableCell>
                    <StyledTableCell className="w-2/12 text-white truncate">
                      Email
                    </StyledTableCell>
                    <StyledTableCell className="w-2/12 text-white truncate">
                      Role
                    </StyledTableCell>
                    <StyledTableCell className="w-2/12 text-white truncate">
                      Actions
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <StyledTableRow key={index} className="animate-pulse">
                          <StyledTableCell className="w-1/12">
                            <div className="h-6 bg-gray-300 rounded-md w-8"></div>{" "}
                          </StyledTableCell>
                          <StyledTableCell className="w-2/12">
                            <div className="h-6 bg-gray-300 rounded-md w-2/3"></div>{" "}
                          </StyledTableCell>
                          <StyledTableCell className="w-2/12">
                            <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>{" "}
                          </StyledTableCell>
                          <StyledTableCell className="w-4/12">
                            <div className="h-6 bg-gray-300 rounded-md w-full"></div>{" "}
                          </StyledTableCell>
                          <StyledTableCell className="w-2/12">
                            <div className="h-6 bg-gray-300 rounded-md w-1/2"></div>{" "}
                          </StyledTableCell>
                          <StyledTableCell className="w-1/12">
                            <div className="h-6 bg-gray-300 rounded-md w-6"></div>{" "}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    : currentUsers.map((user) => (
                        <StyledTableRow key={user.id}>
                          <StyledTableCell component="th" scope="row">
                            {user.id}
                          </StyledTableCell>
                          <StyledTableCell className="truncate">
                            {user.firstName}
                          </StyledTableCell>
                          <StyledTableCell className="truncate">
                            {user.lastName}
                          </StyledTableCell>
                          <StyledTableCell className="truncate">
                            {user.email}
                          </StyledTableCell>
                          <StyledTableCell className="truncate">
                            {mapRole(user.role)}
                          </StyledTableCell>
                          <StyledTableCell className="truncate">
                            <IconButton
                              onClick={(event) => handleClick(event, user.id)}
                            >
                              <BiDotsVerticalRounded />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl) && menuUserId === user.id}
                              onClose={handleClose}
                              disableScrollLock
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                              sx={{
                                "& .MuiPaper-root": {
                                  borderRadius: "8px",
                                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                                  backgroundColor: "#f9f9f9",
                                },
                              }}
                            >
                              <MenuItem
                                onClick={() => {
                                  handlePromoteToAdmin(user.id, user.role);
                                  handleClose();
                                }}
                                sx={{
                                  "&:hover": {
                                    backgroundColor: "#f0f0f0",
                                  },
                                }}
                              >
                                <BiShieldAlt className="mr-2" />
                                {user.role === "ROLE_ADMINISTRATOR"
                                  ? "Revoke Admin"
                                  : "Make Admin"}
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleDeleteClick(user);
                                  handleClose();
                                }}
                                sx={{
                                  "&:hover": {
                                    backgroundColor: "#f0f0f0",
                                  },
                                }}
                              >
                                <BiTrash className="mr-2" />
                                Delete
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleEditClick(user);
                                  handleClose();
                                }}
                                sx={{
                                  "&:hover": {
                                    backgroundColor: "#f0f0f0",
                                  },
                                }}
                              >
                                <BiEditAlt className="mr-2" />
                                Edit
                              </MenuItem>
                            </Menu>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="p-2">{renderPageNumbers()}</div>
          </div>

          <Modal
            open={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            className="flex justify-center items-center"
          >
            <div className="p-4 bg-white rounded-md shadow-md max-w-sm w-full">
              <h2 className="text-[#D05858] font-bold text-2xl">
                Edit User
              </h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const userData = {
                    id: editableUser.id,
                    firstName: e.target.firstName.value,
                    lastName: e.target.lastName.value,
                    email: e.target.email.value,
                    role: editableUser.role,
                  };
                  if (changePassword)
                    userData.password = e.target.password.value;

                  try {
                    const response = await axios.put(
                      `${API_BASE_URL}/users`,
                      userData,
                      {
                        headers: {
                          Authorization: `Bearer ${TOKEN}`,
                        },
                      }
                    );

                    if (response.status === 200) {
                      setSuccessMessage("Usuario actualizado exitosamente");
                      setIsEditModalOpen(false);
                      setUsersData((prevUsers) =>
                        prevUsers.map((user) =>
                          user.id === userData.id
                            ? { ...user, ...userData }
                            : user
                        )
                      );
                    }
                  } catch (error) {
                    setErrorMessage(
                      error.response?.data?.message ||
                        "Error al actualizar el usuario"
                    );
                  }
                }}
              >
                <TextField
                  label="ID"
                  value={editableUser?.id || ""}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  name="firstName"
                  label="First Name"
                  defaultValue={editableUser?.firstName || ""}
                  fullWidth
                  required
                  margin="normal"
                />
                <TextField
                  name="lastName"
                  label="Last Name"
                  defaultValue={editableUser?.lastName || ""}
                  fullWidth
                  required
                  margin="normal"
                />
                <TextField
                  name="email"
                  label="Email"
                  defaultValue={editableUser?.email || ""}
                  fullWidth
                  required
                  margin="normal"
                />
                <Checkbox
                  color="neutral"
                  checked={changePassword}
                  onChange={() => setChangePassword((prev) => !prev)}
                  label="Change password"
                />
                {changePassword && (
                  <TextField
                    name="password"
                    label="Contraseña"
                    type="password"
                    fullWidth
                    margin="normal"
                  />
                )}
                <div className="mt-4">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: "100%",
                      backgroundColor: "#D05858",
                      "&:hover": {
                        backgroundColor: "#B24C4C",
                      },
                    }}
                  >
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </Modal>

          <Modal
            open={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            className="flex justify-center items-center"
          >
            <div className="p-6 bg-white rounded-md shadow-md max-w-sm w-full">
              <div className="flex justify-center items-center mb-4">
                <AlertTriangle color="#D05858" size={74} />
              </div>

              <h2 className="text-center text-lg font-semibold text-gray-700 mb-4">
                Are you sure you want to delete {userToDelete?.firstName}?
              </h2>

              <div className="flex justify-between mt-4 space-x-2">
                <Button
                  onClick={() => setIsDeleteModalOpen(false)}
                  variant="outlined"
                  sx={{
                    width: "48%",
                    backgroundColor: "#616161",
                    color: "white",
                    border: "none",
                    "&:hover": {
                      backgroundColor: "#424242",
                    },
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                      border: "none",
                    },
                  }}
                >
                  Cancel
                </Button>

                <Button
                  onClick={async () => {
                    try {
                      await axios.delete(
                        `${API_BASE_URL}/users/${userToDelete.id}`,
                        {
                          headers: {
                            Authorization: `Bearer ${TOKEN}`,
                          },
                        }
                      );
                      setSuccessMessage("User deleted successfully");
                      setUsersData((prevUsers) =>
                        prevUsers.filter((user) => user.id !== userToDelete.id)
                      );
                      setIsDeleteModalOpen(false);
                    } catch (error) {
                      setErrorMessage(
                        error.response?.data?.message ||
                          "Error deleting the user"
                      );
                    }
                  }}
                  variant="contained"
                  sx={{
                    width: "48%",
                    backgroundColor: "#D05858",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#B24C4C",
                    },
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Modal>

          <Snackbar
            open={Boolean(successMessage)}
            autoHideDuration={6000}
            onClose={() => setSuccessMessage("")}
            message={successMessage}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          />
          <Snackbar
            open={Boolean(errorMessage)}
            autoHideDuration={6000}
            onClose={() => setErrorMessage("")}
            message={errorMessage}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          />
        </div>
      </section>
    </main>
  );
};

export default UsersTable;
