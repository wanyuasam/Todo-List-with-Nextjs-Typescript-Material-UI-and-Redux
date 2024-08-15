import { Provider } from 'react-redux';
import { store } from '../store'; // 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <html>
        <body>{children}</body>
      </html>
    </Provider>
  );
}
