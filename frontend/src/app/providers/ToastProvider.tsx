import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => (
  <Toaster
    position='top-center'
    toastOptions={{
      duration: 4000,
      style: {
        background: '#333',
        color: '#fff',
        borderRadius: '8px',
      },
    }}
  />
);
