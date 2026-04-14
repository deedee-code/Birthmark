import cron from "node-cron";
import prisma from "./prisma";

const scheduleBirthdayWishes = cron.schedule("0 0 * * *", async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Query birthday wishes for today
    // const birthdayWishes = await prisma.birthdayWish.findMany({
    //   where: {
    //     scheduled_time: {
    //       gte: today,
    //       lt: tomorrow,
    //     },
    //   },
    //   include: {
    //     celebrant: {
    //       select: {
    //         username: true,
    //       },
    //     },
    //   },
    //   orderBy: {
    //     scheduled_time: "asc",
    //   },
    // });

    // Send wishes
    // for (const wish of birthdayWishes) {
    //   console.log(`Sending birthday wish for celebrant ${wish.celebrant_id}`);
    //   // Assuming sendWishToCelebrant is updated or compatible with the new format
    //   await sendWishToCelebrant(wish as any);
    // }

    // await prisma.bgJobStatus.create({
    //   data: {
    //     job_name: "Send Birthday Wishes",
    //     status: "Completed",
    //   },
    // });

  } catch (error) {
    console.error("Error executing cron job:", error);
    // await prisma.bgJobStatus.create({
    //   data: {
    //     job_name: "Send Birthday Wishes",
    //     status: "Failed",
    //   },
    // });
  }
});

scheduleBirthdayWishes.start();

export default scheduleBirthdayWishes;
