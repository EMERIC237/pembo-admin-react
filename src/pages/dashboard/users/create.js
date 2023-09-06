import React from 'react';
import {
    Container,
    Grid,
    TextField,
    Button,
} from '@material-ui/core';

const UserCreate = () => {
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Username"
                        margin="dense"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        margin="dense"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="dense"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary">
                        Create User
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserCreate;
