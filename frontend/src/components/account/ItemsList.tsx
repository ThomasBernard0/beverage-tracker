import { Button, Container, Typography } from "@mui/material";
import type { Item } from "../../types/account";

type Props = {
  items: Item[];
  orderItem: (item: Item) => void;
  onCreate: () => void;
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
          style={{ textTransform: "none" }}
          color={"primary"}
          onClick={() => orderItem(item)}
        >
          <Container sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>{item.name}</Typography>
            <Typography>{item.priceInCent / 100}</Typography>
          </Container>
        </Button>
      ))}
      <Button variant={"contained"} color={"primary"} onClick={onCreate}>
        +
      </Button>
    </Container>
  );
};

export default ItemsList;
