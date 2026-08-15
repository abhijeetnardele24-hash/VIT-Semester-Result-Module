import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

let sequelize;

if (process.env.DATABASE_URL) {
  // Cloud Database (Neon / Supabase / Render PostgreSQL)
  console.log('Connecting to Cloud PostgreSQL Database...');
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
  });
} else {
  // Local Embedded SQLite Database (Default)
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './vit_results.sqlite',
    logging: false,
  });
}

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    if (process.env.DATABASE_URL) {
      console.log('Connected to Cloud PostgreSQL Database successfully.');
    } else {
      console.log('Connected to Local SQLite Database successfully (vit_results.sqlite).');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default sequelize;
