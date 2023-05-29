import  client  from "./db.js";

const resolvers = {
  Query: {
    getTickets: async () => {
      console.log("in getTickets");
      try {
        await client.connect();
        const result = await client.query("SELECT * FROM pool_ticket");
        console.log("in getTickets TRY res : ", result);
        await client.end();
        console.log("client connection ended");
        return result.rows.map((row) => {
          return {
            numTicket: row.num_ticket,
            event: row.id_event
          };
        });
      } catch (error) {
        console.log("in getTickets CATCH ");
        console.error("Erreur lors de la récupération des tickets :", error);
        throw new Error("Erreur lors de la récupération des tickets");
      }
    },
    getEvents: async () => {
      try {
        await client.connect();
        console.log("in getEvents");
        const res = await client.query("SELECT * FROM event");
        console.log("in getEvents TRY res : ", res);
        res.rows.map((row) => {
           return {
            id: row.id_event,
            name: row.name,
            location : row.location,
            date: row.date,
          };
        console.log("FINAL CONSOLE LOG : ", events);

        return events;
      });

      } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
        throw new Error("Erreur lors de la récupération des événements");
      } finally {
        await client.end();
      }
    },
    isTicketExist: async (_, {numTicket, id_Event }) => {
      try {
        await client.connect();
        const res = await client.query(
          "SELECT * FROM pool_ticket WHERE num_ticket = $1 AND id_Event = $2", [numTicket, id_Event]
        );
        console.log("isTicketExist res : ", res);
        return res.rows.length > 0;
      } catch (error) {
        console.error("Erreur lors de la vérification de l'existence du ticket :", error);
        throw new Error("Erreur lors de la vérification de l'existence du ticket");
      } finally {
        await client.end();
      }
    },
  },
};

export default resolvers;
