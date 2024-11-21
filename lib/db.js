import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: '64.227.191.31',
  user: 'user2',
  password: 'password2',
  database: 'testweb',
});

async function get_by_email(email) {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows.length > 0 ? rows[0] : null;
}

export default {
  users: {
    get_by_email,
  },
  db,
};