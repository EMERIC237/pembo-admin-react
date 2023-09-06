import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  IconButton,
  Input,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVertRounded";
import { Scrollbar } from "src/components/scrollbar";
export const ProductTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    onEdit,
    onDelete,
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [filterCategory, setFilterCategory] = React.useState("");

  const [sortType, setSortType] = React.useState("");

  const handleClick = (event, productId) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(productId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };
  const filteredItems = filterCategory
    ? items.filter((item) => item.categories.some((cat) => cat.name === filterCategory))
    : items;

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortType) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price":
        return a.price - b.price;
      case "stock":
        return a.stockQuantity - b.stockQuantity;
      default:
        return 0;
    }
  });

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <InputLabel>Filter by Category:</InputLabel>
            <Select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              displayEmpty
              input={<Input />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {items
                .flatMap((item) => item.categories.map((cat) => cat.name))
                .filter((v, i, a) => a.indexOf(v) === i)
                .map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
            </Select>

            <InputLabel>Sort by:</InputLabel>
            <Select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              displayEmpty
              input={<Input />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="stock">Stock</MenuItem>
            </Select>
          </Stack>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((product) => {
                const status = product.stockQuantity > 0 ? "In Stock" : "Out of Stock";
                return (
                  <TableRow hover key={product.id}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={product.imageUrl}>{product.name[0]}</Avatar>
                        <Typography variant="subtitle2">{product.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{product.stockQuantity}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.averageReviewRating.toFixed(1)}</TableCell>
                    <TableCell>{status}</TableCell>
                    <TableCell>
                      <IconButton onClick={(event) => handleClick(event, product.id)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem
                          onClick={() => {
                            onEdit(selectedProduct);
                            handleClose();
                          }}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            onDelete(selectedProduct);
                            handleClose();
                          }}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
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

ProductTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
