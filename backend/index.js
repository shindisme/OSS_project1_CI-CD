const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

(async () => {
    try {
        const client = await pool.connect();
        console.log("✅ PostgreSQL kết nối thành công!!!");
        client.release();
    } catch (err) {
        console.error("❌ PostgreSQL kết nối thất bại!");
        console.error(err.message);
    }
})();

app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({
            message: "Nodejs + Postgres OK!",
            time: result.rows[0].now
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("🚀 Server running on port", PORT);
});
