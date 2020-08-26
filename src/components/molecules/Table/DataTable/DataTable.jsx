import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Toolbar,
  Typography,
  Tooltip,
  IconButton
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import HeadTable from '../HeadTable/HeadTable';
import Spinner from '../../../atoms/Spinner';

import TableModelFish from '../../../../models/TableModelFish';
import useList from '../../../../util/hooks';
import { getComparator, stableSort } from '../../../../helpers/DataTableHelper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%'
  },
  container: {
    maxHeight: 440
  },
  toolbarRoot: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between'
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
      <Toolbar className={classes.toolbarRoot}>
        <Typography variant="h5">Daftar Komoditas</Typography>
        <Tooltip title="Cari Data" placement="top">
          <IconButton aria-label="cari data">
            <SearchIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Toolbar>
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
