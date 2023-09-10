import React, { useCallback } from "react";
import { Container, Grid, TextField, Button } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/router";

const UserCreate = () => {
  const router = useRouter();
  const handleCancel = useCallback(() => {
    // Redirect to the products page
    router.back();
  }, [router]);

  const handleCreateUser = () => {};
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField fullWidth label="Username" margin="dense" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Email" margin="dense" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Password" type="password" margin="dense" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleCreateUser}>
            Create User
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

UserCreate.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default UserCreate;
