import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { v4 as uuidv4 } from 'uuid';

import { Typography } from '@material-ui/core';

import ModalBase from '../ModalBase';
import Spinner from '../../../atoms/Spinner';

import FishModel from '../../../../models/FishModel';
import { useArea, saveData } from '../../../../util/hooks';

import styles from './index.module.scss';

const JsonToForm = dynamic(() => import('json-reactform'), {
  ssr: false
});

const ModalFormInput = ({ isActive, onClose }) => {
  const { data: dataAreaFetch } = useArea();
  const [isLoading, setLoading] = useState(false);

  if (!dataAreaFetch) {
    return <Spinner />;
  }

  const handleSubmitForm = async params => {
    setLoading(true);
    const today = Date.now();
    const payload = {
      uuid: uuidv4(),
      komoditas: params.Komoditas,
      area_provinsi: params.Area.value.province,
      area_kota: params.Area.value.city,
      size: params.Ukuran,
      price: params.Harga,
      tgl_parsed: new Date(today).toISOString(),
      timestamp: today.toString()
    };

    const response = await saveData([payload]);
    setLoading(false);
    if (response) {
      onClose(true);
    }
  };

  const areaData = (dataAreaFetch || []).map(item => ({
    value: item,
    label: `${item.city ? `${item.city}, ` : ''}${item.province}`
  }));

  return (
    <ModalBase
      isActive={isActive}
      onClose={onClose}
      classNameContent={`${styles['modal-input__container']}`}
    >
      <Typography variant="h5">Tambah Komoditas</Typography>
      <div className={`${styles['form-container']}`}>
        <JsonToForm
          model={FishModel.Base(areaData, isLoading)}
          onSubmit={handleSubmitForm}
        />
      </div>
    </ModalBase>
  );
};

ModalFormInput.propTypes = {
  isActive: PropTypes.bool,
  onClose: PropTypes.func
};

ModalFormInput.defaultProps = {
  isActive: false,
  onClose: () => {}
};

export default ModalFormInput;
