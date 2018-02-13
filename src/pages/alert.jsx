import React from 'react';
import { toast } from 'react-toastify';

export const alertError = (msg) => {
  const msgInHTML = textToHTML(msg);
  toast.error(({ closeToast }) => msgInHTML);
};

export const alertSuccess = (msg) => {
  const msgInHTML = textToHTML(msg);
  toast.info(({ closeToast }) => msgInHTML);
};

const textToHTML = text => text.split('\n').map((item, key) => <span key={key}>{item}<br /></span>);
