import { Drawer, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RollHistoryList from "./RollHistoryList";
import { RollHistoryItem } from "./types";

interface RollHistoryDrawerProps {
  open: boolean;
  onClose: () => void;
  history: RollHistoryItem[];
}

export default function RollHistoryDrawer({ open, onClose, history }: RollHistoryDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 300,
          p: 2,
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">Roll History</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <RollHistoryList history={history} />
    </Drawer>
  );
}