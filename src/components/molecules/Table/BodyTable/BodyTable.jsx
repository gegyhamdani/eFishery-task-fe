import React from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableRow, TableCell } from '@material-ui/core';

const BodyTable = ({ data }) => {
  return (
    <TableBody>
      {data.map((row, index) => {
        return (
          <TableRow hover tabIndex={-1} key={index.toString()}>
            <TableCell>{row.komoditas}</TableCell>
            <TableCell align="right">
              {Number.parseInt(row.price, 10).toLocaleString('id', {
                style: 'currency',
                currency: 'IDR'
              })}
            </TableCell>
            <TableCell align="right">{row.size}</TableCell>
            <TableCell>{row.area_provinsi}</TableCell>
            <TableCell>{row.area_kota}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

BodyTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
};

BodyTable.defaultProps = {
  data: []
};

export default BodyTable;
