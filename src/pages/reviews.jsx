import { useCallback, useMemo, useState } from "react";
import { useSelection } from "src/hooks/use-selection";
import Head from 'next/head';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from 'src/utils/apply-pagination';
import { ReviewTable } from 'src/sections/reviews/review-table';

// Sample data (please populate with actual review data)
const data = [
  // ... reviews here
];

const useReviews = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useReviewIds = (reviews) => {
  return useMemo(
    () => {
      return reviews.map((review) => review.id);
    },
    [reviews]
  );
};

const ReviewsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const reviews = useReviews(page, rowsPerPage);
  const reviewIds = useReviewIds(reviews);
  const reviewSelection = useSelection(reviewIds);

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
          Reviews | Pembo Admin
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
                Reviews
              </Typography>
            </Stack>
            <ReviewTable
              count={data.length}
              items={reviews}
              onDeselectAll={reviewSelection.handleDeselectAll}
              onDeselectOne={reviewSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={reviewSelection.handleSelectAll}
              onSelectOne={reviewSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={reviewSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

ReviewsPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ReviewsPage;
