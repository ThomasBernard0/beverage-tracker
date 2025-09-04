import { Button, Container } from "@mui/material";
import type { Item, ItemDto } from "../../types/account";

type Props = {
  items: Item[];
  orderItem: (item: Item) => void;
  onCreate: (itemDto: ItemDto) => void;
};
const ItemsList: React.FC<Props> = ({ items, orderItem, onCreate }) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        p: 2,
      }}
    >
      {items.map((item, index) => (
        <Button
          key={index}
          variant={"outlined"}
          color={"primary"}
          onClick={() => orderItem(item)}
        >
          {item.name}
        </Button>
      ))}
      <Button
        variant={"contained"}
        color={"primary"}
        onClick={() => onCreate({ name: "test", price: 100 })}
      >
        +
      </Button>
    </Container>
  );
};

export default ItemsList;
