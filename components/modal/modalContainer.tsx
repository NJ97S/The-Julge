'use client';

import React, { useContext, FunctionComponent } from 'react';
import { createPortal } from 'react-dom';

import { ModalStateContext } from '@/contexts/ModalProvider';

import CheckModal from './checkModal';
import CautionModal from './cautionModal';
import NoticeModal from './noticeModal';

type ModalComponents = {
  [key: string]: FunctionComponent<any>;
};

const MODAL_COMPONENTS: ModalComponents = {
  caution: CautionModal,
  check: CheckModal,
  notice: NoticeModal
};

function ModalContainer() {
  const { type, props } = useContext(ModalStateContext);

  if (!type) {
    return null;
  }
  const Modal = MODAL_COMPONENTS[type];
  const modalElement = document.getElementById('modal') || document.createElement('div');
  return createPortal(<Modal {...props} />, modalElement);
}

export default ModalContainer;
