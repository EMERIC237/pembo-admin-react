import React from "react";
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';

export const ReviewTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Review ID
                </TableCell>
                <TableCell>
                  Product ID
                </TableCell>
                <TableCell>
                  User ID
                </TableCell>
                <TableCell>
                  Rating
                </TableCell>
                <TableCell>
                  Comment
                </TableCell>
                <TableCell>
                  Date Created
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((review) => {
                const isSelected = selected.includes(review.id);

                return (
                  <TableRow
                    hover
                    key={review.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(review.id);
                          } else {
                            onDeselectOne?.(review.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="subtitle2"
                      >
                        {review.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {review.product_id}
                    </TableCell>
                    <TableCell>
                      {review.user_id}
                    </TableCell>
                    <TableCell>
                      {review.rating}
                    </TableCell>
                    <TableCell>
                      {review.comment}
                    </TableCell>
                    <TableCell>
                      {review.date_created}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

ReviewTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
