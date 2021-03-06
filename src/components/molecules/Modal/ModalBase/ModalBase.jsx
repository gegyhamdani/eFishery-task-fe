import React from 'react';
import PropTypes from 'prop-types';

import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import styles from './index.module.scss';

const ModalBase = ({ isActive, onClose, classNameContent, children }) => {
  const onPreventClose = e => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className={`${styles['modal-base__container']}`}
        onClick={onClose}
        onKeyPress={() => {}}
        role="button"
        tabIndex="0"
        style={{
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? 'initial' : 'none'
        }}
      >
        <div
          className={`${styles['modal-base__content']} ${classNameContent}`}
          onClick={e => onPreventClose(e)}
          onKeyPress={() => {}}
          role="button"
          tabIndex="0"
        >
          <div className={`${styles['modal-base__close-button']}`}>
            <IconButton aria-label="tambah data" onClick={onClose}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

ModalBase.propTypes = {
  isActive: PropTypes.bool,
  onClose: PropTypes.func,
  classNameContent: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
};

ModalBase.defaultProps = {
  isActive: false,
  onClose: () => {},
  classNameContent: '',
  children: null
};

export default ModalBase;
