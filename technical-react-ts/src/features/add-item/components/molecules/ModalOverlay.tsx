import styled, { keyframes } from 'styled-components';

const overlaySlideDownIn = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const overlaySlideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`;

export const ModalOverlay = styled.section<{ $isOpen: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 10;
  background: ${({ theme }) => theme.colors.grayOverlay};
  display: grid;
  place-items: start center;
  padding-top: 50px;
  animation: ${({ $isOpen }) => ($isOpen ? overlaySlideDownIn : overlaySlideOut)} 0.45s ease-out forwards;
`;
