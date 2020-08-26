import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import { Typography } from '@material-ui/core';
import ModalBase from '../ModalBase';

import FishModel from '../../../../models/FishModel';
import { useArea } from '../../../../util/hooks';
import Spinner from '../../../atoms/Spinner';

import styles from './index.module.scss';

const JsonToForm = dynamic(() => import('json-reactform'), {
  ssr: false
});

const ModalFormInput = ({ isActive, onClose }) => {
  const { data: dataAreaFetch } = useArea();

  if (!dataAreaFetch && !isActive) {
    return <Spinner />;
  }

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
        <JsonToForm model={FishModel.Base(areaData)} />
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
