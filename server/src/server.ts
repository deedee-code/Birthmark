import dotenv from 'dotenv';
import env from './configs/env';
import App from './configs/app';
import prisma from './configs/prisma';
import scheduleBirthdayWishes from './configs/cronJobTask';

dotenv.config();

const start = async () => {
  try {
    console.log('📦 Connecting to database...');
    await prisma.$connect();
    console.log('✅ Database connected');

    console.log('⏰ Starting scheduler...');
    scheduleBirthdayWishes.start();
    console.log('✅ Scheduler started');

    const app = new App().getServer();
    const port = env.PORT ?? 3000;

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port} in ${env.NODE_ENV} mode`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error instanceof Error ? error.message : error);
    console.error(error);
    process.exit(1);
  }
};

start();
