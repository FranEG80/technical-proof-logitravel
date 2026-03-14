import { useCallback, useEffect, useRef, useState, type ReactElement, type SubmitEvent } from 'react';

import { LabelText, Button, Input, ErrorText } from '@/shared/components/ui/atoms';
import { ButtonGroup } from '@/shared/components/ui/molecules/ButtonGroup';

import { FormField } from '../atom';
import { ModalForm, ModalOverlay } from '../molecules';
import type { AddItemModalProps } from './AddItemModal.type';
import type { AddItemDraft } from '@/features/home/model';

const CLOSE_ANIMATION_MS = 450;

export function AddItemModal({
  isOpen,
  onConfirm,
  onRequestClose,
  onCloseAnimationEnd,
}: AddItemModalProps): ReactElement {
  const [data, setData] = useState<AddItemDraft['name']>('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  
  const isRightValue = (value: string) => {
    return value.trim() !== '';
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (error) setError(null);
    if (!isRightValue(data)) {
      setError('Item cannot be empty');
      return;
    }
    onConfirm({ name: data });
  };

  const handleStopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError(null);
    const value = event.target.value;
    setData(value);
  };

  const handleClose = useCallback(() => {
    onRequestClose();
  }, [onRequestClose]);

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

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);


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
            ref={inputRef}
            id="add-item"
            name="add-item"
            type="text"
            placeholder="Type the text here..."
            aria-label="Add new item"
            value={data}
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
