const {Client} = require('pg');

const client = new Client({
    host : "dpg-cgllmnu4dade7ecr7uh0-a.frankfurt-postgres.render.com",
    user: "aramys21",
    port: "5432",
    password: "zoUaEbh1Ynmn7gEFZJCNfrCXOirEVAo7",
    database: "alibaydb"
});

client.connect()