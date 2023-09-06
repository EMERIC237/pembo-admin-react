import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVertRounded';
import { Scrollbar } from 'src/components/scrollbar';

export const UserTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    onEdit,
    onDelete
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(userId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Role
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((user) => (
                <TableRow hover key={user.id}>
                  <TableCell>
                    {user.username}
                  </TableCell>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {user.role}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={(event) => handleClick(event, user.id)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={() => { onEdit(selectedUser); handleClose(); }}>Edit</MenuItem>
                      <MenuItem onClick={() => { onDelete(selectedUser); handleClose(); }}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

UserTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
