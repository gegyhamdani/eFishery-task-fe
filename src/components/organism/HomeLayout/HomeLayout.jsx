/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DataTable from '../../molecules/Table/DataTable';
import ModalFormInput from '../../molecules/Modal/ModalFormInput';

const HomeLayout = () => {
  const [isOpenModalAddData, setOpenModalAddData] = useState(false);
  const [isOpenSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenModalAddData = () => {
    setOpenModalAddData(true);
  };

  const handleCloseModalAddData = () => {
    setOpenModalAddData(false);
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
          onClose={handleOpenSnackbar}
          onSuccess={handleOpenSnackbar}
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
      <DataTable onOpenModalAddData={handleOpenModalAddData} />
    </>
  );
};

export default HomeLayout;
