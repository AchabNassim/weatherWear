import pg from "pg";

const { Client } = pg;

const password = encodeURIComponent(process.env.POSTGRESQL_PASSWORD);
const connectionString = `postgresql://postgres.esdjpnwihvgzvgzdjmlt:${password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;

const client = new Client({
    connectionString: connectionString,
    ssl:{rejectUnauthorized: false}
})

try {
    await client.connect();
} catch (e) {
    console.error(e);
    process.exit();
}

export default client;

