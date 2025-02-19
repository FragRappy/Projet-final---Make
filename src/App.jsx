import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Ticket from "./composants/Ticket";
import { theme } from "./theme";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Ticket />
    </MantineProvider>
  );
}
