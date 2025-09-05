import { Button, Box, Typography } from "@mui/material";
import type { Item } from "../../types/account";

type Props = {
  items: Item[];
  orderItem: (item: Item) => void;
  onCreate: () => void;
  onDelete: () => void;
};
const ItemsList: React.FC<Props> = ({
  items,
  orderItem,
  onCreate,
  onDelete,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        p: 1,
      }}
    >
      {items.map((item, index) => (
        <Button
          key={index}
          sx={{ minHeight: "60px", p: 1 }}
          variant={"outlined"}
          style={{ textTransform: "none" }}
          color={"primary"}
          onClick={() => orderItem(item)}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>{item.name}</Typography>
            <Typography>{(item.priceInCent / 100).toFixed(2)}€</Typography>
          </Box>
        </Button>
      ))}
      <Button
        sx={{ minHeight: "60px", p: 1 }}
        variant={"contained"}
        color={"primary"}
        onClick={onCreate}
      >
        +
      </Button>
      <Button
        sx={{ minHeight: "60px", p: 1 }}
        variant={"contained"}
        color={"error"}
        onClick={onDelete}
      >
        -
      </Button>
    </Box>
  );
};

export default ItemsList;
