import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import AuthObserver from '../common/AuthObserver';
import QueryClientProvider from './QueryClientProvider';

function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider>
      <AuthObserver />
      {children}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </QueryClientProvider>
  );
}

export default Providers;
