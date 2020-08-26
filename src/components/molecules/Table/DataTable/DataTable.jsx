import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Table,
  TableContainer,
  TablePagination,
  Paper,
  Toolbar,
  Typography,
  Tooltip,
  IconButton
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import HeadTable from '../HeadTable/HeadTable';
import BodyTable from '../BodyTable/BodyTable';
import ModalFormInput from '../../Modal/ModalFormInput';
import Spinner from '../../../atoms/Spinner';

import TableModelFish from '../../../../models/TableModelFish';
import { useList } from '../../../../util/hooks';
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

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('komoditas');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isOpenModalAddData, setOpenModalAddData] = useState(false);
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

  const handleOpenModalAddData = () => {
    setOpenModalAddData(state => !state);
  };

  if (!dataListFetch) {
    return <Spinner />;
  }

  return (
    <>
      <ModalFormInput
        isActive={isOpenModalAddData}
        onClose={handleOpenModalAddData}
      />
      <Paper className={classes.root}>
        <Toolbar className={classes.toolbarRoot}>
          <Typography variant="h5">Daftar Komoditas</Typography>
          <Tooltip title="Tambah Data" placement="top">
            <IconButton
              aria-label="tambah data"
              onClick={handleOpenModalAddData}
            >
              <AddIcon fontSize="large" />
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
            <BodyTable
              data={stableSort(
                filteredData,
                getComparator(order, orderBy)
              ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
            />
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
    </>
  );
};

export default DataTable;
