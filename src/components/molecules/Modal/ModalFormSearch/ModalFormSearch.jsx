import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import { Typography } from '@material-ui/core';

import ModalBase from '../ModalBase';
import Spinner from '../../../atoms/Spinner';

import FishModel from '../../../../models/FishModel';
import { useArea } from '../../../../util/hooks';

import styles from './index.module.scss';

const JsonToForm = dynamic(() => import('json-reactform'), {
  ssr: false
});

const ModalFormSearch = ({ isActive, onClose }) => {
  const { data: dataAreaFetch } = useArea();

  if (!dataAreaFetch) {
    return <Spinner />;
  }

  const handleSubmitForm = async () => {};

  const areaData = (dataAreaFetch || []).map(item => ({
    value: item,
    label: `${item.city ? `${item.city}, ` : ''}${item.province}`
  }));

  return (
    <ModalBase
      isActive={isActive}
      onClose={onClose}
      classNameContent={`${styles['modal-search__container']}`}
    >
      <Typography variant="h5">Cari Komoditas</Typography>
      <div className={`${styles['form-container']}`}>
        <JsonToForm
          model={FishModel.Base(areaData)}
          onSubmit={handleSubmitForm}
        />
      </div>
    </ModalBase>
  );
};

ModalFormSearch.propTypes = {
  isActive: PropTypes.bool,
  onClose: PropTypes.func
};

ModalFormSearch.defaultProps = {
  isActive: false,
  onClose: () => {}
};

export default ModalFormSearch;
