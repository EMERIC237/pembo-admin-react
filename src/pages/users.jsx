import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useCallback, useMemo, useState } from "react";
import { useSelection } from "src/hooks/use-selection";
import { applyPagination } from "src/utils/apply-pagination";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { UserTable } from "src/sections/users/users-table";
import { useRouter } from "next/router";
const data = [
  // Mock data for users
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  // ... Add more mock users
];

const useUsers = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useUserIds = (users) => {
  return useMemo(() => {
    return users.map((user) => user.id);
  }, [users]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const users = useUsers(page, rowsPerPage);
  const userIds = useUserIds(users);
  const userSelection = useSelection(userIds);
  const router = useRouter();

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const navigateToCreateUser = useCallback(() => {
    router.push("dashboard/users/create");
  },[router])

  return (
    <>
      <Head>
        <title>Users | Devias Kit</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Typography variant="h4">Users</Typography>
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                onClick={navigateToCreateUser}
              >
                Add User
              </Button>
            </Stack>
            <UserTable
              count={data.length}
              items={users}
              onDeselectAll={userSelection.handleDeselectAll}
              onDeselectOne={userSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={userSelection.handleSelectAll}
              onSelectOne={userSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={userSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
