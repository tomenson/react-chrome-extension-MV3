import React from 'react';
import { render } from 'react-dom';

import { PopupApp } from './PopupApp';

export function main(): void {
  console.log('Popup:', location.href);
  render(
    <React.StrictMode>
      <PopupApp />
    </React.StrictMode>,
    document.getElementById('root'),
  );
}
