import  client  from "./db.js";

const resolvers = {
  Query: {
    /* get all tickets */
    getTickets: async () => {
      await client.connect();
      try {
        const result = await client.query("SELECT * FROM pool_ticket");
        await client.end();
        return result.rows.map((row) => {
          return {
            numTicket: row.num_ticket,
            event: row.id_event
          };
        });
      } catch (error) {
        throw new Error("Erreur lors de la récupération des tickets");
      }
    },

    /* get all event name */
    getEvents: async () => {
      try {
        await client.connect();
        const res = await client.query("SELECT * FROM event");
        await client.end();
        return res.rows.map((row) => {
          return {
            id: row.id_event,
            name: row.name,
            location: row.location,
            date: row.date,
          };
        });

      } catch (error) {
        throw new Error("Erreur lors de la récupération des événements");
      } finally {
        await client.end();
      }
    },

    /* check if ticket is valid */
    isTicketExist: async (_, {numTicket, nameEvent }) => {
      try {
        await client.connect();
        const res = await client.query(
          "SELECT * FROM pool_ticket JOIN event ON pool_ticket.id_event = event.id_event WHERE pool_ticket.num_ticket = $1 AND event.name = $2", [numTicket, nameEvent]
        );
        await client.end();
        return res.rowCount > 0;
      } catch (error) {
        throw new Error("Erreur lors de la vérification de l'existence du ticket");
      } finally {
        await client.end();
      }
    },
  },
};

export default resolvers;
