import { useCallback, useEffect, useState, type ReactElement, type SubmitEvent } from 'react';

import { LabelText, Button, Input, ErrorText } from '@/shared/components/ui/atoms';
import { ButtonGroup } from '@/shared/components/ui/molecules/ButtonGroup';

import { FormField } from '../atom';
import { ModalForm, ModalOverlay } from '../molecules';
import type { AddItemModalProps } from './AddItemModal.type';


export function AddItemModal({
  isOpen,
  draft,
  onDraftChange,
  onConfirm,
  onRequestClose,
  onCloseAnimationEnd,
}: AddItemModalProps): ReactElement {

  const [error, setError] = useState<string | null>(null);
  const CLOSE_ANIMATION_MS = 450;

  const handleClose = useCallback(() => {
    onDraftChange({ name: '' });
    onRequestClose();
  }, [onDraftChange, onRequestClose]);

  useEffect(() => {
    const handleEscapeClose = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscapeClose);

    return () => document.removeEventListener('keydown', handleEscapeClose);
  }, [handleClose]);

  useEffect(() => {
    if (isOpen) return;

    const closeTimeout = window.setTimeout(() => {
      onCloseAnimationEnd();
    }, CLOSE_ANIMATION_MS);

    return () => {
      window.clearTimeout(closeTimeout);
    };
  }, [isOpen, onCloseAnimationEnd]);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (error) setError(null);
    if (draft.name.length === 0 || !draft.name.trim()) {
      setError('Item cannot be empty');
      return
    }
    onConfirm();
  };

  const handleStopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError(null);
    onDraftChange({ name: event.target.value });
  };

  return (
    <ModalOverlay
      id="add-item-section"
      $isOpen={isOpen}
      onAnimationEnd={onCloseAnimationEnd}
      onMouseDown={handleClose}
    >
      <ModalForm id="add-item-form" onSubmit={handleSubmit} onMouseDown={handleStopPropagation}>
        <FormField htmlFor="add-item">
          <LabelText>Add item to list</LabelText>
          <Input
            id="add-item"
            name="add-item"
            type="text"
            placeholder="Type the text here..."
            aria-label="Add new item"
            value={draft.name}
            onChange={handleChange}
          />
          {error && (
            <ErrorText role="alert">
              {error}
            </ErrorText>
          )}
        </FormField>
        <ButtonGroup $justify="flex-end">
          <Button type="submit" $variant="primary">Add</Button>
          <Button type="button" $variant="outline" onClick={handleClose}>Cancel</Button>
        </ButtonGroup>
      </ModalForm>
    </ModalOverlay>
  );
}
