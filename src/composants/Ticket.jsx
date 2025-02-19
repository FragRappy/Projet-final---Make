import { Avatar, Card, Divider, Flex, Group, Image, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import classes from "./Ticket.module.css";

export default function Ticket() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [freelance, setFreelance] = useState(null);
  const [client, setClient] = useState(null);
  const [projet, setProjet] = useState(null);
  const [commentaires, setCommentaires] = useState(null);

  const getTicket = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.airtable.com/v0/appyn2ZnvtcsMIijt/tbl1LDCTIo0v5eFSU/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer patR3RWyWr8bgwADz.2f78c9020799978891318a5519a937fd0e82625d74fe27e5299f55c888516f67`,
          },
        }
      );
      const data = await response.json();
      setTicket(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getFreelance = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.airtable.com/v0/appyn2ZnvtcsMIijt/tblK8MlWHaOLAvq4N/${ticket?.fields.Freelance[0]}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer patR3RWyWr8bgwADz.2f78c9020799978891318a5519a937fd0e82625d74fe27e5299f55c888516f67`,
          },
        }
      );
      const data = await response.json();
      setFreelance(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getClient = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.airtable.com/v0/appyn2ZnvtcsMIijt/tblK8MlWHaOLAvq4N/${ticket?.fields.Client[0]}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer patR3RWyWr8bgwADz.2f78c9020799978891318a5519a937fd0e82625d74fe27e5299f55c888516f67`,
          },
        }
      );
      const data = await response.json();
      setClient(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProjet = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.airtable.com/v0/appyn2ZnvtcsMIijt/tblK8MlWHaOLAvq4N/${ticket?.fields.Projets[0]}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer patR3RWyWr8bgwADz.2f78c9020799978891318a5519a937fd0e82625d74fe27e5299f55c888516f67`,
          },
        }
      );
      const data = await response.json();
      setProjet(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCommentaires = async () => {
    try {
      setLoading(true);
      const formula = `{Ticket} = '${ticket.fields["Nom"]}'`;
      const response = await fetch(
        `https://api.airtable.com/v0/appyn2ZnvtcsMIijt/tblfPqPvX4W21sJnC?filterByFormula=${encodeURIComponent(
          formula
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer patR3RWyWr8bgwADz.2f78c9020799978891318a5519a937fd0e82625d74fe27e5299f55c888516f67`,
          },
        }
      );

      const data = await response.json();
      setCommentaires(data.records);
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTicket();
  }, []);

  useEffect(() => {
    if (ticket) {
      getFreelance();
      getClient();
      getProjet();
      getCommentaires();
    }
  }, [ticket]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.margin}>
        <Text ta="center" fz="h1" fw={500} mt="md" mb="lg">
          NoCodeCorp
        </Text>
        <Text ta="center" fz="xl" fw={500} mt="md" mb={20}>
          Suivi de ticket support
        </Text>
        {client && (
          <Text
            className={classes.email}
            ta="center"
            fz="sm"
            fw={500}
            c="black"
            bg={(client.fields["Email valide ?"] = true ? "green" : "orange")}
          >
            {
              (client.fields["Email valide ?"] = true
                ? "Email valide"
                : "Email non valide")
            }
          </Text>
        )}
        <Card withBorder padding="xl" radius="md" className={classes.card}>
          {loading ? (
            <Text>Chargement...</Text>
          ) : (
            <>
              <Card.Section
                h={140}
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)",
                }}
              />
              {ticket && (
                <>
                  <Avatar
                    src={ticket.fields.QRCode[0].url}
                    bg="lightgray"
                    radius="xs"
                    size={80}
                    mx="auto"
                    mt={-60}
                    className={classes.avatar}
                  />
                  <Text ta="center" fz="xl" fw={500} mt="md">
                    Statut : {ticket.fields["Status"]}
                  </Text>
                  <Text ta="center" fz="md" fw={500} mt="sm">
                    Date d'ouverture du ticket :{" "}
                    {formatDate(ticket.fields["Date d'ouverture"])}
                  </Text>
                  {ticket.fields["Date de clôture"] && (
                    <Text ta="center" fz="md" fw={500} mt="sm">
                      Date de fermeture du ticket :{" "}
                      {formatDate(ticket.fields["Date de clôture"])}
                    </Text>
                  )}
                  <Group mt="md" justify="space-between">
                    <Text ta="center" fz="md" fw={500} mt="md">
                      Société : {client && client.fields["Nom"]}
                    </Text>
                    <Text ta="center" fz="md" fw={500} mt="sm">
                      Projet : {projet && projet.fields["Nom"]}
                    </Text>
                  </Group>
                  <Text ta="left" fz="md" fw={500} mt="xs">
                    Intervenant :{" "}
                    {freelance &&
                      `${freelance.fields["Prénom"]} ${freelance.fields["Nom"]}`}
                  </Text>
                  <Text ta="left" fz="md" fw={500} mt="xs">
                    Demande : {ticket.fields["Demande"]}
                  </Text>
                  <Divider my="xs" label="Document" labelPosition="center" />
                  {ticket.fields["Document"] ? (
                    <Image
                      radius="md"
                      maw={100}
                      fit="contain"
                      src={ticket.fields.Document[0].url}
                    />
                  ) : (
                    <Text ta="left" fz="md" fw={500}>
                      Pas de document
                    </Text>
                  )}
                  <Divider
                    my="xs"
                    label="Commentaires"
                    labelPosition="center"
                  />
                  {commentaires && commentaires.length > 0 ? (
                    commentaires.map((commentaire) => (
                      <Flex mt="md" direction="column" key={commentaire.id}>
                        <Text ta="left" fz="xs">
                          {formatDate(commentaire.fields["Date"])}
                        </Text>
                        <Text ta="left" fz="sm">
                          {commentaire.fields["Contenu"]}
                        </Text>
                      </Flex>
                    ))
                  ) : (
                    <Text ta="left" fz="md" fw={500}>
                      Pas de commentaire
                    </Text>
                  )}
                </>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
