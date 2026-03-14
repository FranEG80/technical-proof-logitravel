import { useCallback, useEffect, useRef, useState, type ReactElement, type SubmitEvent } from 'react';

import { LabelText, Button, Input, ErrorText } from '@/shared/components/ui/atoms';
import { ButtonGroup, Modal } from '@/shared/components/ui/molecules';

import { ModalForm } from '../molecules';

import { FormField } from '../atom';
import type { AddItemModalProps } from './AddItemModal.type';
import type { AddItemDraft } from '@/features/home/model';

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError(null);
    const value = event.target.value;
    setData(value);
  };

  const handleClose = useCallback(() => {
    onRequestClose();
  }, [onRequestClose]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);


  return (
    <Modal
      id="add-item-section"
      isOpen={isOpen}
      onRequestClose={handleClose}
      onCloseAnimationEnd={onCloseAnimationEnd}
      aria-labelledby="add-item-title"
    >
      <ModalForm id="add-item-form" onSubmit={handleSubmit}>
        <FormField htmlFor="add-item">
          <LabelText id="add-item-title">Add item to list</LabelText>
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
    </Modal>
  );
}
