import { Box, List, ListItem, ListItemText, Typography, Divider } from "@mui/material";
import { RollHistoryItem } from "./types";

interface RollHistoryListProps {
  history: RollHistoryItem[];
}

export default function RollHistoryList({ history }: RollHistoryListProps) {
  if (history.length === 0) {
    return (
      <Box sx={{ textAlign: "center", color: "text.secondary", mt: 4 }}>
        <Typography variant="body2">No rolls yet</Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: "100%" }}>
      {history.map((item, index) => (
        <Box key={item.id}>
          <ListItem>
            <ListItemText
              primary={
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1">{item.dieName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </Typography>
                </Box>
              }
              secondary={
                <Typography variant="h6" sx={{ mt: 0.5 }}>
                  {item.value}
                </Typography>
              }
            />
          </ListItem>
          {index < history.length - 1 && <Divider />}
        </Box>
      ))}
    </List>
  );
}