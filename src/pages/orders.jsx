import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OrderTable } from 'src/sections/orders/order-table';
import { useSelection } from 'src/hooks/use-selection';
import { applyPagination } from 'src/utils/apply-pagination';

// Sample data (please populate with actual order data)
const data = [
  // ... orders here
];

const useOrders = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useOrderIds = (orders) => {
  return useMemo(
    () => {
      return orders.map((order) => order.id);
    },
    [orders]
  );
};

const OrdersPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const orders = useOrders(page, rowsPerPage);
  const orderIds = useOrderIds(orders);
  const orderSelection = useSelection(orderIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Orders | Pembo Admin
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Typography variant="h4">
                Orders
              </Typography>
              <div>
                {/* You may or may not need a "Add Order" button, depending on your use case */}
                {/* <Button
                  variant="contained"
                >
                  Add Order
                </Button> */}
              </div>
            </Stack>
            <OrderTable
              count={data.length}
              items={orders}
              onDeselectAll={orderSelection.handleDeselectAll}
              onDeselectOne={orderSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={orderSelection.handleSelectAll}
              onSelectOne={orderSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={orderSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

OrdersPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default OrdersPage;
