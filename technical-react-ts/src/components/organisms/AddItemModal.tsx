import type { SubmitEvent } from 'react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { LabelText } from '../atoms/Typography';
import { ButtonGroup } from '../molecules/ButtonGroup';
import { FormField } from '../molecules/FormField';
import styled, { keyframes } from 'styled-components';

type AddItemModalProps = {
  isClosing: boolean;
  onRequestClose: () => void;
  onCloseAnimationEnd: () => void;
};

const overlaySlideDownIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
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

const Overlay = styled.section<{ $isClosing: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 10;
  background: ${({ theme }) => theme.colors.grayMedium};
  display: grid;
  place-items: start center;
  padding-top: 50px;
  animation: ${({ $isClosing }) => ($isClosing ? overlaySlideOut : overlaySlideDownIn)} 0.45s ease-out forwards;
`;

const Form = styled.form`
  width: min(700px, calc(100% - 32px));
  min-height: 276px;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export function AddItemModal({ isClosing, onRequestClose, onCloseAnimationEnd }: AddItemModalProps) {
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Overlay id="add-item-section" $isClosing={isClosing} onAnimationEnd={onCloseAnimationEnd}>
      <Form id="add-item-form" onSubmit={handleSubmit}>
        <FormField htmlFor="add-item">
          <LabelText>Add item to list</LabelText>
          <Input
            id="add-item"
            name="add-item"
            type="text"
            placeholder="Type the text here..."
            aria-label="Add new item"
          />
        </FormField>
        <ButtonGroup $justify="flex-end">
          <Button type="submit" $variant="primary">
            Add
          </Button>
          <Button type="button" $variant="outline" onClick={onRequestClose}>
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </Overlay>
  );
}
