/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DataTable from '../../molecules/Table/DataTable';
import ModalFormInput from '../../molecules/Modal/ModalFormInput';
import ModalFormSearch from '../../molecules/Modal/ModalFormSearch';

const HomeLayout = () => {
  const [isOpenModalAddData, setOpenModalAddData] = useState(false);
  const [isOpenModalSearchData, setOpenModalSearchData] = useState(false);
  const [isOpenSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenModalAddData = () => {
    setOpenModalAddData(true);
  };

  const handleCloseModalAddData = () => {
    setOpenModalAddData(false);
  };

  const handleOpenModalSearchData = () => {
    setOpenModalSearchData(true);
  };

  const handleCloseModalSearchData = () => {
    setOpenModalSearchData(false);
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
    handleCloseModalAddData();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      {isOpenModalAddData && (
        <ModalFormInput
          isActive={isOpenModalAddData}
          onClose={handleCloseModalAddData}
          onSuccess={handleOpenSnackbar}
        />
      )}
      {isOpenModalSearchData && (
        <ModalFormSearch
          isActive={isOpenModalSearchData}
          onClose={handleCloseModalSearchData}
        />
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        key="success"
        open={isOpenSnackbar}
        onClose={handleCloseSnackbar}
        message={
          <span id="client-snackbar">
            <CheckCircleIcon />
            Data Berhasil Disimpan
          </span>
        }
        autoHideDuration={1000}
      />
      <DataTable
        onOpenModalAddData={handleOpenModalAddData}
        onOpenModalSearchData={handleOpenModalSearchData}
      />
    </>
  );
};

export default HomeLayout;
