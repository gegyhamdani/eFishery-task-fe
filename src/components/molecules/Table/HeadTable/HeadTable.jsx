import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel
} from '@material-ui/core';
import PropTypes from 'prop-types';

const HeadTable = ({ tableModel, order, orderBy, onRequestSort }) => {
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {tableModel.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            style={{ width: headCell.width }}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

HeadTable.propTypes = {
  tableModel: PropTypes.arrayOf(PropTypes.shape({})),
  order: PropTypes.string,
  orderBy: PropTypes.string,
  onRequestSort: PropTypes.func
};

HeadTable.defaultProps = {
  tableModel: [],
  order: '',
  orderBy: '',
  onRequestSort: () => {}
};

export default HeadTable;
