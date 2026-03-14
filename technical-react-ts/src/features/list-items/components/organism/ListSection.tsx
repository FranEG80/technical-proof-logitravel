import { memo, useEffect, useRef, type KeyboardEvent, type ReactElement } from 'react';
import type { ListSectionProps } from './ListSection.type';

import {
  BodyText,
  Title,
  UndoIcon,
  Button
} from '@/shared/components/ui/atoms';
import { ButtonGroup, List, ListItem } from '@/shared/components/ui/molecules';

import { Card, CardHeader, CardFooter} from '../molecules';

function ListSection({
  onAddClick,
  onSelectItem,
  onDelete,
  onUndo,
  isHistoryEmpty,
  isModalVisible,
  items,
}: ListSectionProps): ReactElement {
  const previousItemsCount = useRef(items.length);
  const pendingFocusId = useRef<string | null>(null);

  useEffect(() => {
    const hasNewItem = items.length > previousItemsCount.current;

    if (hasNewItem && isModalVisible) {
      const lastItem = items[items.length - 1];
      pendingFocusId.current = lastItem.id;
    }

    previousItemsCount.current = items.length;
  }, [isModalVisible, items]);

  useEffect(() => {
    if (isModalVisible || !pendingFocusId.current) {
      return;
    }

    const nextItem = document.getElementById(`list-item-${pendingFocusId.current}`);
    nextItem?.focus();
    if (typeof nextItem?.scrollIntoView === 'function') {
      nextItem.scrollIntoView({ block: 'nearest' });
    }
    pendingFocusId.current = null;
  }, [isModalVisible, items]);

  const handleSelected = (id: string) => {
    onSelectItem(id);
  };

  const handleItemKeyDown = (event: KeyboardEvent<HTMLLIElement>, id: string) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    handleSelected(id);
  };

  return (
    <Card id="list-section">
      <CardHeader>
        <Title>This a technical proof</Title>
        <BodyText>
          Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec inceptos. Lacinia habitasse arcu
          molestie maecenas cursus quam nunc, hendrerit posuere augue fames dictumst placerat porttitor, dis mi
          pharetra vestibulum venenatis phasellus.
        </BodyText>
      </CardHeader>

      <List aria-label='List items'>
        {items.length === 0 ? (
          <ListItem $disabled aria-disabled="true">No items yet</ListItem>
        ) : (
          items.map((item) => (
            <ListItem
              id={`list-item-${item.id}`}
              key={item.id}
              selected={item.selected}
              aria-selected={item.selected}
              tabIndex={0}
              onClick={() => handleSelected(item.id)}
              onKeyDown={(event) => handleItemKeyDown(event, item.id)}
            >
              {item.name}
            </ListItem>
          ))
        )}
      </List>

      <CardFooter className="buttons">
        <ButtonGroup>
          <Button
            aria-label=" Undo action"
            $variant="outline"
            $iconOnly
            onClick={onUndo}
            disabled={isHistoryEmpty}
          >
            <UndoIcon />
          </Button>
          <Button
            $variant="outline"
            onClick={onDelete}
            disabled={items.every(item => !item.selected)}
          >Delete</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button $variant="primary" onClick={onAddClick} >
            Add
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default memo(ListSection);
