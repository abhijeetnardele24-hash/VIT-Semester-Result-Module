import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './vit_results.sqlite',
  logging: false, // Set to console.log to see SQL queries
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQLite Database Connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default sequelize;
