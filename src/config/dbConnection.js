import pg from "pg";

const { Pool } = pg;

const password = encodeURIComponent(process.env.POSTGRESQL_PASSWORD);
const connectionString = `postgresql://postgres.esdjpnwihvgzvgzdjmlt:${password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;
const client = new Pool({
    connectionString: connectionString,
    ssl: {rejectUnauthorized: false}
})

export default client;

