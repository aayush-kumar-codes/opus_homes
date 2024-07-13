import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  // createRow,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
// import { fakeData, usStates } from './makeData';
import DeleteIcon from "@mui/icons-material/Delete";
import { axiosInstance } from "../../axios";
import Cookies from "js-cookie";

const fakeData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    state: "CA",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    state: "NY",
  },
  // Add more fake data as needed
];

const usStates = [
  { value: "AL", label: "Credit Card" },
  { value: "AK", label: "Netbanking" },
  { value: "AZ", label: "Online" },
  // Add all states as needed
];

const myStaticData = [
  {
    id: 1,
    items: "Architect",
    status: "",
    cost: 250,
    paid: "yes",
    payment_type: "netbanking",
    sub_contractor: "knjbhvg",
  },
  {
    id: 2,
    items: "Engineer",
    status: "",
    cost: 350,
    paid: "yes",
    payment_type: "debitcard",
    sub_contractor: "knjbhvg",
  },
  {
    id: 3,
    items: "Boundary Survey ",
    status: "notcomplete",
    cost: 250,
    paid: "no",
    payment_type: "netbanking",
    sub_contractor: "knjbhvg",
  },
  {
    id: 4,
    items: "Trusses design ",
    status: "",
    cost: 850,
    paid: "yes",
    payment_type: "creditcard",
    sub_contractor: "iuytr",
  },
  {
    id: 5,
    items: "Energy Calculations",
    status: "notcomplete",
    cost: 50,
    paid: "no",
    payment_type: "checkorcc",
    sub_contractor: "poiyujbhvg",
  },
];

const paymentData = [
  { value: "netbanking", label: "Net Banking" },
  { value: "checkorcc", label: "Check or CC" },
  { value: "creditcard", label: "Credit Card" },
  { value: "debitcard", label: "Debit Card" },
];

const statusData = [
  { value: "complete", label: "Complete" },
  { value: "notcomplete", label: "Not complete" },
];

const paidData = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const Example = () => {
  const [userData, setUserData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [fetchedDataLoader, setFetchedDataLoader] = useState(false);
  const [editedUsers, setEditedUsers] = useState({});

  useEffect(() => {
    const data = async () => {
      setFetchedDataLoader(true);
      try {
        const response = await axiosInstance.get(
          `admin-form/${Cookies.get("job_id")}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        if (response.status) {
          setUserData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setFetchedDataLoader(false);
      }, 2000);
    };
    data();
  }, []);
  

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Item unique Number",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "items",
        header: "Items",
        // enableEditing: false,
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "text",
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          //store edited user in state to be saved later
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? "Required"
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: "status",
        header: "Status",
        editVariant: "select",
        editSelectOptions: statusData,
        muiEditTextFieldProps: ({ row }) => ({
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
          onChange: (event) =>
            setEditedUsers({
              ...editedUsers,
              [row.id]: { ...row.original, state: event.target.value },
            }),
        }),
      },
      {
        accessorKey: "cost",
        header: "Cost",
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "number",
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          //store edited user in state to be saved later
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? "Incorrect Value"
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: "paid",
        header: "Paid",
        editVariant: "select",
        editSelectOptions: paidData,
        muiEditTextFieldProps: ({ row }) => ({
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
          onChange: (event) =>
            setEditedUsers({
              ...editedUsers,
              [row.id]: { ...row.original, state: event.target.value },
            }),
        }),
      },
      {
        accessorKey: "payment_type",
        header: "Payment Type",
        editVariant: "select",
        editSelectOptions: paymentData,
        muiEditTextFieldProps: ({ row }) => ({
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
          onChange: (event) =>
            setEditedUsers({
              ...editedUsers,
              [row.id]: { ...row.original, state: event.target.value },
            }),
        }),
      },
      {
        accessorKey: "sub_contractor",
        header: "Sub Contractor",
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "text",
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          //store edited user in state to be saved later
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? "Invalid format"
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
          onKeyDown: (event) => {
            if (event.key === "Enter") {
              event.preventDefault(); // Prevent default form submission
              event.stopPropagation();
              console.log(
                table,
                "newtableeeeee",
                row._valuesCache,
                "rowwwwwwwwww"
              );
              handleSaveUsers(row._valuesCache);
              // handleCreateUser(row._valuesCache, table); // Call your save function here
            }
          },
        }),
      },
    ],
    [editedUsers, validationErrors]
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  //call UPDATE hook
  const { mutateAsync: updateUsers, isPending: isUpdatingUsers } =
    useUpdateUsers();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser = async (values, table) => {
    console.log(values, "valueeeeeeeee", table, "tableeeeeee");
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      // console.log(error,";lhk")
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUsers = async (data) => {
    console.log(data, "gotcha");
    if (Object.values(validationErrors).some((error) => !!error)) return;
    await updateUsers(Object.values(editedUsers));
    setEditedUsers({});
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: "row", // ('modal', and 'custom' are also available)
    editDisplayMode: "table", // ('modal', 'row', 'cell', and 'custom' are also
    enableEditing: true,
    enableRowActions: false,
    positionActionsColumn: "last",
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableFilters: false,
    enableHiding: false,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        height: "fit-content",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    // onCreatingRowSave: handleCreateUser,
    // renderRowActions: ({ row }) => (
    //   <Box sx={{ display: 'flex', gap: '1rem' }}>
    //     <Tooltip title="Delete">
    //       <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
    //         <DeleteIcon />
    //       </IconButton>
    //     </Tooltip>
    //   </Box>
    // ),
    // renderBottomToolbarCustomActions: () => (
    //   <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    //     <Button
    //       color="success"
    //       variant="contained"
    //       onClick={handleSaveUsers}
    //       disabled={
    //         Object.keys(editedUsers).length === 0 ||
    //         Object.values(validationErrors).some((error) => !!error)
    //       }
    //     >
    //       {isUpdatingUsers ? <CircularProgress size={25} /> : 'Save'}
    //     </Button>
    //     {Object.values(validationErrors).some((error) => !!error) && (
    //       <Typography color="error">Fix errors before submitting</Typography>
    //     )}
    //   </Box>
    // ),
    // renderTopToolbarCustomActions: ({ table }) => (
    //   <Button
    //     variant="contained"
    //     onClick={() => {
    //       table.setCreatingRow(true); //simplest way to open the create row modal with no default values
    //       //or you can pass in a row object to set default values with the `createRow` helper function
    //       // table.setCreatingRow(
    //       //   createRow(table, {
    //       //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
    //       //   }),
    //       // );
    //     }}
    //   >
    //     Create New User
    //   </Button>
    // ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUsers || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};

//CREATE hook (post new user to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo) => {
      console.log(newUserInfo, "userrrrrrr");
      // queryClient.setQueryData(["users"], (prevUsers) => console.log(prevUsers,'lkhjcg'));
      queryClient.setQueryData(["users"], (prevUsers) => [
        ...prevUsers,
        {
          ...newUserInfo,
          id: (Math.random() + 1).toString(36).substring(7),
        },
      ]);
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      //send api request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(myStaticData);
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUsers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (users) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUsers) => {
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.map((user) => {
          const newUser = newUsers.find((u) => u.id === user.id);
          return newUser ? newUser : user;
        })
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (userId) => {
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.filter((user) => user.id !== userId)
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

const JobPageTable = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default JobPageTable;

const validateRequired = (value) => !!value.length;
// const validateEmail = (email) =>
//   !!email.length &&
//   email
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
function validateUser(user) {
  return {
    // lastName: !validateRequired(user.lastName) ? "Last Name is Required" : "",
    // email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
    items: !validateRequired(user.items) ? "Item is Required" : "",
    cost: !validateRequired(user.cost) ? "Cost is Required" : "",
    sub_contractor: !validateRequired(user.sub_contractor)
      ? "Sub Contractor is Required"
      : "",
  };
}
