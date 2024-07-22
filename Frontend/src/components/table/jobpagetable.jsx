// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Select,
//   MenuItem,
//   TextField,
//   FormControl,
// } from "@mui/material";

// const headers = [
//   "Item unique Number",
//   "Items",
//   "Status",
//   "Cost",
//   "Paid",
//   "Payment Type",
//   "Sub Contractor",
// ];

// const initialUserData = [
//   {
//     id: 1,
//     items: "Architect",
//     status: null,
//     cost: null,
//     paid: null,
//     payment_type: null,
//     sub_contractor: null,
//   },
//   {
//     id: 2,
//     items: "Engineer",
//     status: null,
//     cost: null,
//     paid: null,
//     payment_type: null,
//     sub_contractor: null,
//   },
//   {
//     id: 3,
//     items: "Boundary Survey",
//     status: null,
//     cost: null,
//     paid: null,
//     payment_type: null,
//     sub_contractor: null,
//   },
//   {
//     id: 4,
//     items: "Trusses design",
//     status: null,
//     cost: null,
//     paid: null,
//     payment_type: null,
//     sub_contractor: null,
//   },
//   {
//     id: 5,
//     items: "Energy Calculations",
//     status: null,
//     cost: null,
//     paid: null,
//     payment_type: null,
//     sub_contractor: null,
//   },
//   {
//     id: 6,
//     items: "Land Clearing",
//     status: null,
//     cost: null,
//     paid: null,
//     payment_type: null,
//     sub_contractor: null,
//   },
//   {
//     id: 7,
//     items: "Plot Plan",
//     status: null,
//     cost: null,
//     paid: null,
//     payment_type: null,
//     sub_contractor: null,
//   },
//   {
//     id: 8,
//     items: "Apply Permits",
//     status: null,
//     cost: null,
//     paid: null,
//     payment_type: null,
//     sub_contractor: null,
//   },
//   {
//     id: 9,
//     items: "Order Windows",
//     status: null,
//     cost: null,
//     paid: null,
//     payment_type: null,
//     sub_contractor: null,
//   },
//   {
//     id: 10,
//     items: "Permit Fees",
//     status: null,
//     cost: null,
//     paid: null,
//     payment_type: null,
//     sub_contractor: null,
//   },
// ];

// const CustTable = () => {
//   const [userData, setUserData] = useState(initialUserData);

//   const handleStatusChange = (index, event) => {
//     const newUserData = [...userData];
//     newUserData[index].status = event.target.value;
//     setUserData(newUserData);
//   };

//   const handlePaidChange = (index, event) => {
//     const newUserData = [...userData];
//     newUserData[index].paid = event.target.value;
//     setUserData(newUserData);
//   };

//   const handleInputChange = (index, event) => {
//     const { name, value } = event.target;
//     const newUserData = [...userData];
//     newUserData[index][name] = value;
//     setUserData(newUserData);
//   };
//   const handleEnterKeyPress = (index, event) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       console.log("Saved:", userData[index]);
//     }
//   };

//   return (
//     <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             {headers.map((header) => (
//               <TableCell
//                 key={header}
//                 sx={{ fontWeight: "bold", bgcolor: "#9EBCD8" }}
//               >
//                 {header}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {userData.map((item, index) => (
//             <TableRow key={item.id}>
//               <TableCell>{item.id}</TableCell>
//               <TableCell>{item.items}</TableCell>
//               <TableCell>
//                 <FormControl sx={{ width: "100%" }}>
//                   <Select
//                     id="status"
//                     name="status"
//                     variant="outlined"
//                     displayEmpty
//                     value={item.status || ""}
//                     onChange={(event) => handleStatusChange(index, event)}
//                   >
//                     <MenuItem value="" disabled>
//                       --Select--
//                     </MenuItem>
//                     <MenuItem value="com">Completed</MenuItem>
//                     <MenuItem value="pen">Pending</MenuItem>
//                   </Select>
//                 </FormControl>
//               </TableCell>
//               <TableCell>
//                 <TextField
//                   value={item.cost || ""}
//                   name="cost"
//                   id="cost"
//                   type="number"
//                   onChange={(event) => handleInputChange(index, event)}
//                 />
//               </TableCell>
//               <TableCell>
//                 <FormControl sx={{ width: "100%" }}>
//                   <Select
//                     id="paid"
//                     name="paid"
//                     variant="outlined"
//                     displayEmpty
//                     value={item.paid || ""}
//                     onChange={(event) => handlePaidChange(index, event)}
//                   >
//                     <MenuItem value="" disabled>
//                       --Select--
//                     </MenuItem>
//                     <MenuItem value="yes">Yes</MenuItem>
//                     <MenuItem value="no">No</MenuItem>
//                   </Select>
//                 </FormControl>
//               </TableCell>
//               <TableCell>
//                 <FormControl sx={{ width: "100%" }}>
//                   <Select
//                     name="payment_type"
//                     id="payment_type"
//                     variant="outlined"
//                     displayEmpty
//                     value={item.payment_type || ""}
//                     onChange={(event) => handleInputChange(index, event)}
//                   >
//                     <MenuItem value="" disabled>
//                       --Select--
//                     </MenuItem>
//                     <MenuItem value="netbanking">Net Banking</MenuItem>
//                     <MenuItem value="checkorcc">Check or CC</MenuItem>
//                   </Select>
//                 </FormControl>
//               </TableCell>
//               <TableCell>
//                 <TextField
//                   value={item.sub_contractor || ""}
//                   id="sub_contractor"
//                   name="sub_contractor"
//                   onChange={(event) => handleInputChange(index, event)}
//                   onKeyDown={(event) => handleEnterKeyPress(index, event)}
//                 />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default CustTable;

import { useContext, useMemo } from "react";
import { MRT_Table, useMaterialReactTable } from "material-react-table";
import { axiosInstance } from "../../axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { MyContext } from "../../context/ContextProvider";

const paymentData = [
  { value: "1", label: "Cheque" },
  { value: "2", label: "CC" },
];

const statusData = [
  { value: "0", label: "Not Complete" },
  { value: "1", label: "Complete" },
];

const paidData = [
  { value: "0", label: "No" },
  { value: "1", label: "Yes" },
];

export const CustTable = ({
  editedUsers,
  setEditedUsers,
  fetchedData,
  setJobPageResponse,
}) => {
  const { setJobIdTable,setJobIdList,jobIdList, } = useContext(MyContext);
  console.log(fetchedData, "tttt");
  const handleSaveUsers = async (original, values) => {
    console.log(values, "gotcha");
    setJobIdTable(Cookies.get("job_id"));
    setJobIdList([...jobIdList, Cookies.get("job_id")])
    const data = {
      id: values.id || original.id,
      items: values.items || original.items,
      status: values.status || original.status,
      cost: values.cost || original.cost,
      paid: values.paid || original.paid,
      payment_type: values.payment_type || original.payment_type,
      Sub_Contractor: values.Sub_Contractor || original.Sub_Contractor,
      // values.Sub_Contractor !== null && values.Sub_Contractor !== undefined
      //   ? values.Sub_Contractor
      //   : original.Sub_Contractor !== null &&
      //     original.Sub_Contractor !== undefined
      //   ? original.Sub_Contractor
      //   : null,
    };

    console.log("ljihugy", data);
    try {
      const response = await axiosInstance.patch(
        `admin-form/entries/${Cookies.get("job_id")}/${data.id}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (response.status) {
        console.log(response.data, "entries");
        setJobPageResponse(response.data.job_record);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Item unique Number",
        enableEditing: false,
        size: 80,
        muiTableBodyCellProps: ({ row }) => ({
          sx: {
            border: "1px solid rgba(81, 81, 81, .5)",
            py: "2px",
            bgcolor: row.original.id === "" ? "#cceeff" : "inherit",
          },
        }),
      },
      {
        accessorKey: "items",
        header: "Items",
        enableEditing: false,
        muiTableBodyCellProps: ({ row }) => ({
          sx: {
            border: "1px solid rgba(81, 81, 81, .5)",
            py: "2px",
            bgcolor: row.original.id === "" ? "#cceeff" : "inherit",
            fontWeight: row.original.id !== "" ? "none" : 600,
          },
        }),
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "text",
          required: true,
          // error: !!validationErrors?.[cell.id],
          // helperText: validationErrors?.[cell.id],
          // //store edited user in state to be saved later
          onBlur: (event) => {
            // const validationError = !validateRequired(event.currentTarget.value)
            //   ? "Required"
            //   : undefined;
            // setValidationErrors({
            //   ...validationErrors,
            //   [cell.id]: validationError,
            // });
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: "status",
        header: "Status",
        editVariant: "select",
        editSelectOptions: statusData,
        muiTableBodyCellProps: ({ row }) => ({
          sx: {
            border: "1px solid rgba(81, 81, 81, .5)",
            py: "2px",
            bgcolor: row.original.id === "" ? "#cceeff" : "inherit",
          },
        }),
        muiEditTextFieldProps: ({ row }) => ({
          select: row.original.id !== "",
          // error: !!validationErrors?.state,
          // helperText: validationErrors?.state,
          disabled: row.original.id === "",
          onChange: (event) => {
            handleSaveUsers(row.original, {
              ...row._valuesCache,
              status: event.target.value,
            });
            setEditedUsers({
              ...editedUsers,
              [row.id]: { ...row.original, status: event.target.value },
            });
          },
        }),
      },
      {
        accessorKey: "cost",
        header: "Cost ($)",
        muiTableBodyCellProps: ({ row }) => ({
          sx: {
            border: "1px solid rgba(81, 81, 81, .5)",
            py: "2px",
            bgcolor: row.original.id === "" ? "#cceeff" : "inherit",
          },
        }),
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "text",
          pattern: "^[0-9]*$",
          required: true,
          // error: !!validationErrors?.[cell.id],
          // helperText: validationErrors?.[cell.id],
          //store edited user in state to be saved later
          disabled: row.original.id === "",
          onChange: (event) => {
            const enteredValue = event.target.value.trim();
            if (!/^[0-9]*$/.test(enteredValue)) {
              toast.error("Invalid value. Please enter only numeric values.");
            }
          },
          onBlur: (event) => {
            // const validationError = !validateRequired(event.currentTarget.value)
            //   ? "Incorrect Value"
            //   : undefined;
            // setValidationErrors({
            //   ...validationErrors,
            //   [cell.id]: validationError,
            // });
            const enteredValue = event.target.value.trim();
            if (/^[0-9]*$/.test(enteredValue)) {
              handleSaveUsers(row.original, {
                ...row._valuesCache,
                cost: enteredValue,
              });
              setEditedUsers({ ...editedUsers, [row.id]: row.original });
            } else {
              toast.error("Invalid value. Please enter only numeric values.");
            }
          },
        }),
      },
      {
        accessorKey: "paid",
        header: "Paid",
        editVariant: "select",
        editSelectOptions: paidData,
        muiTableBodyCellProps: ({ row }) => ({
          sx: {
            border: "1px solid rgba(81, 81, 81, .5)",
            py: "2px",
            bgcolor: row.original.id === "" ? "#cceeff" : "inherit",
          },
        }),
        muiEditTextFieldProps: ({ row }) => ({
          select: row.original.id !== "",
          // error: !!validationErrors?.state,
          // helperText: validationErrors?.state,
          disabled: row.original.id === "",
          onChange: (event) => {
            handleSaveUsers(row.original, {
              ...row._valuesCache,
              paid: event.target.value,
            });
            setEditedUsers({
              ...editedUsers,
              [row.id]: { ...row.original, paid: event.target.value },
            });
          },
        }),
      },
      {
        accessorKey: "payment_type",
        header: "Payment Type",
        editVariant: "select",
        editSelectOptions: paymentData,
        muiTableBodyCellProps: ({ row }) => ({
          sx: {
            border: "1px solid rgba(81, 81, 81, .5)",
            py: "2px",
            bgcolor: row.original.id === "" ? "#cceeff" : "inherit",
          },
        }),
        muiEditTextFieldProps: ({ row }) => ({
          select: row.original.id !== "",
          // error: !!validationErrors?.state,
          // helperText: validationErrors?.state,
          disabled: row.original.id === "",
          onChange: (event) => {
            handleSaveUsers(row.original, {
              ...row._valuesCache,
              payment_type: event.target.value,
            });
            setEditedUsers({
              ...editedUsers,
              [row.id]: { ...row.original, payment_type: event.target.value },
            });
          },
        }),
      },
      {
        accessorKey: "Sub_Contractor",
        header: "Sub Contractor",
        muiTableBodyCellProps: ({ row }) => ({
          sx: {
            border: "1px solid rgba(81, 81, 81, .5)",
            py: "2px",
            bgcolor: row.original.id === "" ? "#cceeff" : "inherit",
          },
        }),
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "text",
          required: true,
          // error: !!validationErrors?.[cell.id],
          // helperText: validationErrors?.[cell.id],
          //store edited user in state to be saved later
          disabled: row.original.id === "",
          onBlur: (event) => {
            // const validationError = !validateRequired(event.currentTarget.value)
            //   ? "Invalid format"
            //   : undefined;
            // setValidationErrors({
            //   ...validationErrors,
            //   [cell.id]: validationError,
            // });
            handleSaveUsers(row.original, {
              ...row._valuesCache,
              Sub_Contractor: event.target.value,
            });
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
          // onKeyDown: (event) => {
          //   if (event.key === "Enter") {
          //     event.preventDefault(); // Prevent default form submission
          //     event.stopPropagation();
          //     // console.log(
          //     //   table,
          //     //   "newtableeeeee",
          //     //   row,
          //     //   "rowwwwwwwwww",

          //     // );
          //     handleSaveUsers(row.original, row._valuesCache);
          //     // handleCreateUser(row._valuesCache, table); // Call your save function here
          //   }
          // },
        }),
      },
    ],
    [editedUsers]
  );

  const table = useMaterialReactTable({
    columns,
    data: fetchedData,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    createDisplayMode: "row",
    editDisplayMode: "table",
    enableEditing: true,
    enableRowActions: false,
    positionActionsColumn: "last",
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableFilters: false,
    enableHiding: false,
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.default,
    }),
    muiTableBodyRowProps: { hover: true },
    muiTableProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        caption: {
          captionSide: "top",
        },
      },
    },
    muiTableHeadCellProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        fontWeight: "bold",
        bgcolor: "#9EBCD8",
        py: "5px",
        // px :'5px',
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        py: "2px",
        // px :'5px',
      },
    },
  });

  return <MRT_Table table={table} />;
};

export default CustTable;
