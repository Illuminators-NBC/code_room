import { PropsWithChildren } from 'react';
import QueryClientProvider from './QueryClientProvider';

function Providers({ children }: PropsWithChildren) {
  return <QueryClientProvider>{children}</QueryClientProvider>;
}

export default Providers;
