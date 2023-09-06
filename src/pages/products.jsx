import {
  Box,
  Button,
  Container,
  InputAdornment,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useMemo, useState } from "react";
import { useSelection } from "src/hooks/use-selection";
import { applyPagination } from "src/utils/apply-pagination";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import products from "public/data/products-data";
import { ProductTable } from "src/sections/products/products-table";

const data = products;

const useProducts = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useProductIds = (products) => {
  return useMemo(() => {
    return products.map((product) => product.id);
  }, [products]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const products = useProducts(page, rowsPerPage);
  const productsIds = useProductIds(products);
  const productsSelection = useSelection(productsIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const navigateToCreateProduct = useCallback(() => {
    router.push("dashboard/products/create");
  }, [router]);

  // Filter products based on search term
  const displayedProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Products | Pembo Admin</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Products</Typography>
                <TextField
                  variant="outlined"
                  placeholder="Search product"
                  onChange={handleSearch}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  color="primary"
                  onClick={navigateToCreateProduct}
                >
                  Add Product
                </Button>
              </div>
            </Stack>
            <ProductTable
              count={data.length}
              onDeselectAll={productsSelection.handleDeselectAll}
              onDeselectOne={productsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={productsSelection.handleSelectAll}
              onSelectOne={productsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={productsSelection.selected}
              items={displayedProducts}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
