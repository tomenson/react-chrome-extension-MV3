import React from 'react';
import { render } from 'react-dom';

import { OptionsApp } from './OptionsApp';

export function main(): void {
  console.log('Options:', location.href);
  render(
    <React.StrictMode>
      <OptionsApp />
    </React.StrictMode>,
    document.getElementById('root'),
  );
}
