import { memo, type ReactElement } from 'react';
import type { ListSectionProps } from './ListSection.type';

import {
  BodyText,
  Title,
  UndoIcon,
  Button
} from '@/shared/components/ui/atoms';
import { ButtonGroup, List, ListItem } from '@/shared/components/ui/molecules';

import { Card, CardHeader, CardFooter} from '../molecules';

function ListSection({ onAddClick, onSelectItem, onDelete, onUndo, isHistoryEmpty, items }: ListSectionProps): ReactElement {
  

  const handleSelected = (id: string) => {
    onSelectItem(id);
  }

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

      <List>
        {items.length === 0 ? (
          <ListItem $disabled>No items yet</ListItem>
        ) : (
          items.map((item) => (
            <ListItem
              key={item.id}
              selected={item.selected}
              onClick={() => handleSelected(item.id)}
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
