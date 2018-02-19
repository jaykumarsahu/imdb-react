import React from 'react';
import { toast } from 'react-toastify';

const textToHTML = text => text.split('\n').map(item => <span key={item[0]}>{item}<br /></span>);

export const alertError = (msg) => {
  const msgInHTML = textToHTML(msg);
  toast.error(() => msgInHTML);
};

export const alertSuccess = (msg) => {
  const msgInHTML = textToHTML(msg);
  toast.info(() => msgInHTML);
};
