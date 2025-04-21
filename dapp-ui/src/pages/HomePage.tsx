import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PuzzleBulb from '../components/PuzzleBulb';
import { useWatchWagmiAccount } from '../hooks/useWatchWagmiAccount';
import { fetchRiddle } from '../services/contract/fetchRiddle';
import { submitAnswer as submitAnswerToContract } from '../services/contract/submitAnswer';
import {
  getStoredAnswers,
  saveAnswer,
  getStoredRiddle,
  saveRiddle,
} from '../utils/storage';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import { BrowserProvider, Eip1193Provider } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

// Styled containers
const PageWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '90vh',
  backgroundColor: '#fff',
  color: 'black',
  fontFamily: 'Telegraf',
});

const CenteredBox = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '67vh',
  textAlign: 'center',
});

const ContentWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
  marginTop: 32,
  marginBottom: 32,
});

const AnswerRow = styled(Box)({
  display: 'flex',
  gap: 16,
  marginTop: 16,
});

const AnswerChip = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  backgroundColor: '#ffd209',
  color: 'black',
  border: '1px solid black',
  borderRadius: '0px',
  padding: '8px 16px',
  fontSize: '0.875rem',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#ffd209',
  },
});

const HomePage: React.FC = () => {
  useWatchWagmiAccount();

  const [riddle, setRiddle] = useState('');
  const [answer, setAnswer] = useState('');
  const [submittedAnswers, setSubmittedAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [answerError, setAnswerError] = useState(false);
  const [attemptCount, setAttemptCount] = useState(1);
  const [error, setError] = useState('');
  const [resultPhase, setResultPhase] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [hasAttempted, setHasAttempted] = useState(false);

  const { connector, isConnected } = useAccount();

  // Gets the wallet provider from the connected wallet
  const getProvider = useCallback(async (): Promise<BrowserProvider | null> => {
    try {
      const rawProvider = await connector?.getProvider?.();
      if (!rawProvider) return null;
      return new BrowserProvider(rawProvider as Eip1193Provider);
    } catch (err) {
      console.error('Error getting provider:', err);
      return null;
    }
  }, [connector]);

  // Loads the current riddle and associated stored answers
  const loadRiddle = useCallback(async () => {
    try {
      const provider = await getProvider();
      if (!provider) throw new Error('No provider available');

      const r = await fetchRiddle(provider);
      setRiddle(r);
      saveRiddle(r);

      const stored = getStoredAnswers(r);
      setSubmittedAnswers(stored);
    } catch (err) {
      console.warn('Using fallback from localStorage:', err);
      const storedRiddle = getStoredRiddle();
      if (storedRiddle) {
        setRiddle(storedRiddle);
        const stored = getStoredAnswers(storedRiddle);
        setSubmittedAnswers(stored);
      }
    }
  }, [getProvider]);

  // Handles submitting an answer to the smart contract
  const handleSubmit = async () => {
    if (!answer.trim()) {
      setAnswerError(true);
      return;
    }

    setAnswerError(false);
    setLoading(true);
    setResultPhase('loading');
    setAttemptCount((prev) => (prev === 4 ? 1 : prev + 1));
    setHasAttempted(true);

    try {
      const provider = await getProvider();
      const signer = await provider?.getSigner();
      if (!signer) return;

      const result = await submitAnswerToContract(signer, answer);
      setResultPhase(result.correct ? 'success' : 'error');

      const updatedAnswers = [...submittedAnswers, answer];
      setSubmittedAnswers(updatedAnswers);
      saveAnswer(riddle, answer);
      setAnswer('');
      loadRiddle();
    } catch (err: any) {
      console.error('Failed to submit answer:', err.message);
      setResultPhase('error');
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && connector) {
      loadRiddle();
    }
  }, [isConnected, connector, loadRiddle]);

  return (
    <PageWrapper>
      <Navbar />
      <Container sx={{ mt: 6 }}>
        {!isConnected ? (
          <CenteredBox>
            <Typography variant="h5" gutterBottom>
              Please login your wallet to view the riddle.
            </Typography>
          </CenteredBox>
        ) : (
          <>
            <ContentWrapper>
              <Typography variant="h4" gutterBottom>
                Zama Riddle Challenge
              </Typography>

              <PuzzleBulb
                attemptCount={attemptCount}
                resultPhase={resultPhase}
              />

              <Typography
                variant="body1"
                paragraph
                align="center"
                sx={{ maxWidth: '600px', paddingTop: '30px' }}
              >
                {riddle || 'Loading riddle...'}
              </Typography>

              {!error && resultPhase === 'error' && (
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{ color: 'red', mt: 1 }}
                >
                  <HighlightOffIcon fontSize="small" />
                  <Typography variant="body2">
                    Incorrect answer, try again!
                  </Typography>
                </Box>
              )}
              {error && resultPhase === 'error' && (
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{ color: 'red', mt: 1 }}
                >
                  <HighlightOffIcon fontSize="small" />
                  <Typography variant="body2">
                    There was an Error try again!
                  </Typography>
                </Box>
              )}

              {resultPhase === 'success' && (
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{ color: 'green', mt: 1 }}
                >
                  <CheckCircleOutlineIcon fontSize="small" />
                  <Typography variant="body2">Correct! Well done.</Typography>
                </Box>
              )}
            </ContentWrapper>

            <AnswerRow>
              <TextField
                label="Your Answer"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  if (e.target.value.trim()) {
                    setAnswerError(false);
                  }
                }}
                error={answerError}
                sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                fullWidth
              />
              {loading ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 3,
                  }}
                >
                  <CircularProgress size={32} sx={{ color: '#ffd209' }} />
                </Box>
              ) : (
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </AnswerRow>

            <Typography variant="h6" sx={{ mt: 4 }}>
              Your Previous Answers:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
              {submittedAnswers.map((ans, idx) => (
                <AnswerChip key={idx}>
                  <Typography sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    ?
                  </Typography>
                  <Typography>{ans}</Typography>
                </AnswerChip>
              ))}
            </Box>
          </>
        )}
      </Container>
      <Footer />
    </PageWrapper>
  );
};

export default HomePage;
