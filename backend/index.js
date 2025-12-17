const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

app.get("/", async (req, res) => {
    const result = await pool.query("SELECT NOW()");
    res.json({ time: result.rows[0] });
});

app.listen(3000, () => {
    console.log("Server running on 3000");
});
