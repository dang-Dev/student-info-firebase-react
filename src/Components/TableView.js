import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase_conf";
import { Button, TextField } from "@mui/material";

const columns = [
  { id: "firstName", label: "First Name", minWidth: 170 },
  { id: "lastName", label: "Last Name", minWidth: 170 },
  {
    id: "middleName",
    label: "Middle Name",
    minWidth: 170,
    align: "left",
  },
  {
    id: "birthDate",
    label: "Birth Date",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "address",
    label: "Address",
    minWidth: 170,
    align: "left",
  },
  {
    id: "contactNumber",
    label: "Contact Number",
    minWidth: 170,
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 250,
    align: "center",
  },
];

export default function StudentTableView() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [students, setStudents] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isUpdateRowID, setIsUpdateRowID] = useState("");

  // fetch students list from firebase
  useEffect(() => {
    let isMounted = true;
    const q = query(collection(db, "students"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      if (isMounted) {
        setStudents(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  /* UPDATE */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("birthDate"));
    const studentDoc = doc(db, "students", isUpdateRowID);
    await updateDoc(studentDoc, {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      middleName: data.get("middleName"),
      birthDate: data.get("birthDate"),
      address: data.get("address"),
      contactNumber: data.get("contactNumber"),
    });
    setIsUpdateRowID("");
    setIsUpdate(false);
  };

  /* DELETE */
  const deleteStudent = (id) => {
    const studentDoc = doc(db, "students", id);
    deleteDoc(studentDoc);
  };

  const handleEdit = (rowID) => {
    setIsUpdateRowID(rowID);
    setIsUpdate(true);
  };

  const handleCancel = () => {
    setIsUpdateRowID("");
    setIsUpdate(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 0 }}>
      <TableContainer sx={{ maxHeight: "56vh", minHeight: "56vh" }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return column.id === "action" ? (
                          <TableCell key={column.id}>
                            {isUpdate && isUpdateRowID === row.id ? (
                              <>
                                <button type="submit" className="btn-save">
                                  <span className="btn-save-icon">
                                    {<CheckIcon />}
                                  </span>
                                  SAVE
                                </button>
                                <Button
                                  color="error"
                                  variant="outlined"
                                  startIcon={<CloseIcon />}
                                  type="button"
                                  onClick={handleCancel}
                                >
                                  CANCEL
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  onClick={() => {
                                    handleEdit(row.id);
                                  }}
                                  color="warning"
                                  variant="outlined"
                                  startIcon={<EditIcon />}
                                >
                                  EDIT
                                </Button>
                                <Button
                                  color="error"
                                  variant="outlined"
                                  startIcon={<DeleteIcon />}
                                  onClick={() => {
                                    deleteStudent(row.id);
                                  }}
                                >
                                  DELETE
                                </Button>
                              </>
                            )}
                          </TableCell>
                        ) : isUpdateRowID === row.id ? (
                          <TableCell key={column.id} align={column.align}>
                            <TextField
                              required
                              fullWidth
                              name={column.id}
                              label={column.label}
                              type="text"
                              id={column.id}
                              defaultValue={value}
                              variant={"standard"}
                            />
                          </TableCell>
                        ) : (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={students.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
