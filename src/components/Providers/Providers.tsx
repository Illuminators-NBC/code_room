import { PropsWithChildren } from 'react';
import QueryClientProvider from './QueryClientProvider';
import AuthObserver from '../common/AuthObserver';

function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider>
      <AuthObserver />
      {children}
    </QueryClientProvider>
  );
}

export default Providers;
