import bottomRight from '../assets/puzzle/bottomrightpiece.svg';
import leftBottom from '../assets/puzzle/leftbottompiece.svg';
import leftTop from '../assets/puzzle/lefttoppiece.svg';
import outlined from '../assets/puzzle/outlined.svg';
import rightTop from '../assets/puzzle/righttoppiece.svg';
import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import React, { useEffect, useState } from 'react';

// Keyframe animations for different visual states
const pulseError = keyframes`
  0% { filter: brightness(1) hue-rotate(305deg); }
  50% { filter: brightness(2) hue-rotate(305deg); }
  100% { filter: brightness(1) hue-rotate(305deg); }
`;

const pulseSuccess = keyframes`
  0% { filter: brightness(1) hue-rotate(60deg); }
  50% { filter: brightness(2) hue-rotate(60deg); }
  100% { filter: brightness(1) hue-rotate(60deg); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

// Container for the entire puzzle bulb
const PuzzleContainer = styled(Box)({
  position: 'relative',
  width: '220px',
  height: '220px',
});

// Puzzle piece image with conditional animations based on phase
const Piece = styled('img')<{
  animationPhase?:
    | 'fadeInFirst'
    | 'fadeInLoading'
    | 'pulseSuccess'
    | 'pulseError';
}>(({ animationPhase }) => {
  let animation = 'none';
  if (animationPhase === 'fadeInFirst')
    animation = `${fadeIn} 0.8s ease-in-out`;
  if (animationPhase === 'fadeInLoading')
    animation = `${fadeIn} 1.0s ease-in-out infinite`;
  if (animationPhase === 'pulseError')
    animation = `${pulseError} 0.4s ease-in-out`;
  if (animationPhase === 'pulseSuccess')
    animation = `${pulseSuccess} 0.4s ease-in-out`;

  return {
    position: 'absolute',
    width: '73px',
    height: '73px',
    animation,
  };
});

// Animation types for individual puzzle pieces
type AnimationType =
  | 'fadeInFirst'
  | 'fadeInLoading'
  | 'pulseSuccess'
  | 'pulseError'
  | undefined;

interface PuzzleBulbProps {
  attemptCount: number;
  resultPhase: 'idle' | 'loading' | 'success' | 'error';
}

// PuzzleBulb component displays the bulb and its puzzle pieces with animation per phase
const PuzzleBulb: React.FC<PuzzleBulbProps> = ({
  attemptCount,
  resultPhase,
}) => {
  const [pieceAnimations, setPieceAnimations] = useState<
    Record<number, AnimationType>
  >({});

  // Add a new piece and animate it with fade-in when attempt increases
  useEffect(() => {
    setPieceAnimations((prev) => ({
      ...prev,
      [attemptCount]: 'fadeInFirst',
    }));
  }, [attemptCount]);

  // If loading, apply loading animation
  useEffect(() => {
    if (resultPhase === 'loading') {
      setPieceAnimations((prev) => ({
        ...prev,
        [attemptCount]: 'fadeInLoading',
      }));
    }
  }, [resultPhase, attemptCount]);

  // When loading completes, show result animation
  useEffect(() => {
    if (resultPhase === 'success' || resultPhase === 'error') {
      setPieceAnimations((prev) => ({
        ...prev,
        [attemptCount]:
          resultPhase === 'success' ? 'pulseSuccess' : 'pulseError',
      }));
    }
  }, [resultPhase, attemptCount]);

  // Renders a puzzle piece with given props and current animation phase
  const renderPiece = (
    src: string,
    alt: string,
    style: React.CSSProperties,
    step: number
  ) => {
    const show = attemptCount >= step;
    if (!show) return null;

    return (
      <Piece
        key={step}
        src={src}
        alt={alt}
        style={style}
        animationPhase={pieceAnimations[step]}
      />
    );
  };

  return (
    <PuzzleContainer>
      {/* Bulb outline background */}
      <img
        src={outlined}
        alt="Lightbulb Outline"
        style={{ width: '100%', display: 'block' }}
      />

      {/* Puzzle pieces */}
      {renderPiece(
        leftBottom,
        'Left Bottom',
        { bottom: '30px', left: '57px' },
        1
      )}
      {renderPiece(
        leftTop,
        'Left Top',
        { top: '62px', left: '46px', height: '79px' },
        2
      )}
      {renderPiece(
        rightTop,
        'Right Top',
        { top: '62px', right: '57px', height: '80px' },
        3
      )}
      {renderPiece(
        bottomRight,
        'Bottom Right',
        { bottom: '28px', right: '59px', height: '78px', width: '49px' },
        4
      )}
    </PuzzleContainer>
  );
};

export default PuzzleBulb;
