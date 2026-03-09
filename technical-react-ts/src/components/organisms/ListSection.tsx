import styled from 'styled-components';
import { Button } from '../atoms/Button';
import { BodyText, Title } from '../atoms/Typography';
import { ListItem } from '../atoms/ListItem';
import { ButtonGroup } from '../molecules/ButtonGroup';

type ListSectionProps = {
  onAddClick: () => void;
};

const Card = styled.section`
  width: min(900px, calc(100% - 32px));
  min-height: 577px;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: 768px) {
    padding: 32px 20px;
    min-height: auto;
  }
`;

const Header = styled.header`
  margin-bottom: 35px;
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const List = styled.div`
  flex-grow: 1;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: 11px;
  background: ${({ theme }) => theme.colors.grayLight};
  border: 1px solid ${({ theme }) => theme.colors.grayDark};
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const UndoIcon = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" strokeWidth="1" />
    <path d="M3 3v5h5" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export function ListSection({ onAddClick }: ListSectionProps) {
  return (
    <Card id="list-section">
      <Header>
        <Title>This a technical proof</Title>
        <BodyText>
          Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec inceptos. Lacinia habitasse arcu
          molestie maecenas cursus quam nunc, hendrerit posuere augue fames dictumst placerat porttitor, dis mi
          pharetra vestibulum venenatis phasellus.
        </BodyText>
      </Header>

      <List>
        <ListItem>Item 1</ListItem>
        <ListItem $selected>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </List>

      <Footer className="buttons">
        <ButtonGroup>
          <Button aria-label="Undo action" $variant="outline" $iconOnly>
            <UndoIcon />
          </Button>
          <Button $variant="outline">Delete</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button $variant="primary" onClick={onAddClick}>
            Add
          </Button>
        </ButtonGroup>
      </Footer>
    </Card>
  );
}
