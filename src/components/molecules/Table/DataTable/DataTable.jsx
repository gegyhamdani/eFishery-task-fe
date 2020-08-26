import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import HeadTable from '../HeadTable/HeadTable';
import TableModelFish from '../../../../models/TableModelFish';
import useList from '../../../../util/hooks';
import { getComparator, stableSort } from '../../../../helpers/DataTableHelper';
import Spinner from '../../../atoms/Spinner';

const useStyles = makeStyles(() => ({
  root: {
    width: '90%'
  },
  container: {
    maxHeight: 440
  }
}));

const DataTable = () => {
  const { data: dataListFetch } = useList();

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('komoditas');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const classes = useStyles();

  const filteredData = (dataListFetch || []).filter(
    item => !!item.uuid && !!item.timestamp
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!dataListFetch) {
    return <Spinner />;
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table aria-labelledby="fishList" size="medium" stickyHeader>
          <HeadTable
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            tableModel={TableModelFish.Base()}
          />
          <TableBody>
            {stableSort(filteredData, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
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
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;
