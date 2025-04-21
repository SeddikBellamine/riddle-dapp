import { ConditionalRollbarWrapper } from './components/ConditionalRollbarWrapper';
import HomePage from './pages/HomePage';
import theme from './theme';
import { initQueryClient } from './utils/initQueryClient';
import { initRollbarAlerting } from './utils/initRollbarAlerting';
import { wagmiAdapter } from './utils/wagmiConfig';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WagmiProvider } from 'wagmi';

const App: React.FC = () => {
  const { rollbar, rollbarConfig } = initRollbarAlerting();

  const queryClient = initQueryClient({ rollbar });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WagmiProvider config={wagmiAdapter.wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <ConditionalRollbarWrapper
            rollbar={rollbar}
            rollbarConfig={rollbarConfig}
          >
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
            </Router>
            <ToastContainer />
          </ConditionalRollbarWrapper>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
};

export default App;
