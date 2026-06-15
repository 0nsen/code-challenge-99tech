import { Box } from "@mui/material";
import SwapForm from "./components/SwapForm";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100svh",
        background: "#f6f9fc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <SwapForm />
    </Box>
  );
}

export default App;
