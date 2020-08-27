import React, { useState } from 'react';
import DataTable from '../../molecules/Table/DataTable';
import ModalFormInput from '../../molecules/Modal/ModalFormInput';

const HomeLayout = () => {
  const [isOpenModalAddData, setOpenModalAddData] = useState(false);

  const handleOpenModalAddData = () => {
    setOpenModalAddData(state => !state);
  };

  return (
    <>
      {isOpenModalAddData && (
        <ModalFormInput
          isActive={isOpenModalAddData}
          onClose={handleOpenModalAddData}
        />
      )}
      <DataTable onOpenModalAddData={handleOpenModalAddData} />
    </>
  );
};

export default HomeLayout;
