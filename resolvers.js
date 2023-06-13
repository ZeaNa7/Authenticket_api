import client, { connect, disconnect } from "./db.js";

const resolvers = {
  Query: {
    /* get all tickets */
    getTickets: async () => {
      console.log('GET TICKETS');
      const dbClient = await connect();// Utilisez la fonction connect pour obtenir une nouvelle instance de client
      console.log('CLIENT CONNECTED');
      try {
        const result = await dbClient.query("SELECT * FROM pool_ticket");
        await disconnect(dbClient); // Utilisez la fonction disconnect pour déconnecter le client
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
        console.log('GET EVENTS');
        const dbClient = await connect(); 
        console.log('CLIENT CONNECTED');
        const res = await dbClient.query("SELECT * FROM event");
        await disconnect(dbClient); 
        console.log('EVENT RESPONSE', res.rows);
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
      }
    },

    /* check if ticket is valid */
    isTicketExist: async (_, {numTicket, nameEvent }) => {
      let dbClient; // Déclarez dbClient en dehors du bloc try
      console.log('IN IF EXIST TICKET');
      console.log('NUM TICKET', numTicket);
      try {
        dbClient = await connect(); // Affectez la valeur retournée par connect à dbClient
        console.log('CLIENT CONNECTED');
        const res = await dbClient.query(
          "SELECT * FROM pool_ticket JOIN event ON pool_ticket.id_event = event.id_event WHERE pool_ticket.num_ticket = $1 AND event.name = $2", [numTicket, nameEvent]
        );
        console.log('RES TICKETS ', res.rows);
        if (res.rowCount > 0) {
          console.log('TICKET EXIST', res.rows)
          return true;
        } else {
          console.log('TICKET NOT EXIST');
          return false;
        }
      } catch (error) {
        throw new Error("Erreur lors de la vérification de l'existence du ticket");
      } finally {
        if (dbClient) {
          await disconnect(dbClient);
        }
      }
    },
    
  },
};

export default resolvers;
