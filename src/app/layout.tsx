"use client";

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Todo App</title>
      </head>
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
