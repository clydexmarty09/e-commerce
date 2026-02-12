/*
database connection pool - create one shared database and export it as db

imports mysql client library; / promise means all DB operations
return a Promise so we can use await 
*/
import mysql from "mysql2/promise";

// tell the compiler: there is a global variable named _dbPool
// in dev mode, Next.js hot reload can re-run module code. Prevents
// creating a new pool each reload
declare global {
  var _dbPool: mysql.Pool | undefined; // mysql.Pool is a type of pool object
}

export const db =
  global._dbPool ?? // nullish coealescing operator
  mysql.createPool({
    // creates pool instead of single connection
    // info pulled from .env.local file
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // max # of connections in the pool
  });

/*
    in dev, save the pool globally so hot reload resuses it 
    In prod, it's fine to let normal module catching handle it 
    */
if (process.env.NODE_ENV !== "production") global._dbPool = db;
