import React from 'react';
import { render } from 'react-dom';

import { DevToolsApp } from './DevToolsApp';

export function main(): void {
  console.log('DevTools:', location.href);
  render(
    <React.StrictMode>
      <DevToolsApp />
    </React.StrictMode>,
    document.getElementById('root'),
  );
}
