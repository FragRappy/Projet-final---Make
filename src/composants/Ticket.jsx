import { Avatar, Card, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import classes from "./Ticket.module.css";

const stats = [
  { value: "34K", label: "Followers" },
  { value: "187", label: "Follows" },
  { value: "1.6K", label: "Posts" },
];

export default function Ticket() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tickets, setTickets] = useState(null);
  const [ticketId, setTicketId] = useState(null);
  const ticket = tickets?.records.find((ticket) => ticket.id === ticketId);

  const getTicket = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.airtable.com/v0/appyn2ZnvtcsMIijt/tbl1LDCTIo0v5eFSU`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer patR3RWyWr8bgwADz.2f78c9020799978891318a5519a937fd0e82625d74fe27e5299f55c888516f67`,
          },
        }
      );
      const data = await response.json();

      setTickets(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTicket();
    const pathParts = window.location.pathname.split("/");
    const id = pathParts[pathParts.length - 1];
    setTicketId(id);
  }, []);

  return (
    <Card withBorder padding="xl" radius="md" className={classes.card}>
      <Card.Section
        h={140}
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)",
        }}
      />
      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {ticketId ? ticket : "CHARGEMENT..."}
      </Text>
      {/* <Text ta="center" fz="sm" c="dimmed">
        Fullstack engineer
      </Text>
      <Group mt="md" justify="center" gap={30}>
        {items}
      </Group>
      <Button fullWidth radius="md" mt="xl" size="md" variant="default">
        Follow
      </Button> */}
    </Card>
  );
}
