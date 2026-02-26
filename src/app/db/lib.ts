import oracledb from "oracledb";

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

export async function getConnection() {
  if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
    throw new Error("Database credentials missing in .env.local");
  }

  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: "103.44.98.61:1521/testdb",
    });

    console.log("Oracle Connected Successfully");
    return connection;
  } catch (error) {
    console.error("Oracle connection error:", error);
    throw error;
  }
}