import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { CategoryTable } from "src/sections/categories/category-table";

// Sample data (please populate with actual category data)
const data = [
  { id: 1, name: "ELECTRONICS", icon: "device_hub" },
  { id: 2, name: "COMPUTERS", icon: "computer" },
  { id: 3, name: "FASHION", icon: "style" },
  { id: 4, name: "BOOKS", icon: "book" },
  { id: 5, name: "HOME & LIVING", icon: "home" },
];

const useCategories = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useCategoryIds = (categories) => {
  return useMemo(() => {
    return categories.map((category) => category.id);
  }, [categories]);
};

const CategoryPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const categories = useCategories(page, rowsPerPage);
  const categoryIds = useCategoryIds(categories);
  const categorySelection = useSelection(categoryIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Categories | Your App Name</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Typography variant="h4">Categories</Typography>
              <div>
                <Button variant="contained">Add Category</Button>
              </div>
            </Stack>
            <CategoryTable
              count={data.length}
              items={categories}
              onDeselectAll={categorySelection.handleDeselectAll}
              onDeselectOne={categorySelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={categorySelection.handleSelectAll}
              onSelectOne={categorySelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={categorySelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

CategoryPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CategoryPage;
