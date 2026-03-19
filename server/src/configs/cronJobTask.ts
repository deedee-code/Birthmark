import cron from "node-cron";
import { pool } from "./database";
import { BirthdayWish } from "./types";
import { sendWishToCelebrant } from "../helpers/utils/birthdayWish";

const scheduleBirthdayWishes = cron.schedule("0 0 * * *", async () => {
  const client = await pool.connect();

  // Schedule the job to run every day at midnight
  try {
    await client.query("BEGIN");
    // Query birthday wishes for today
    const result = await client.query<BirthdayWish>(`
        SELECT bw.id, bw.celebrant_id, bw.message, cw.username
        FROM celebration.birthday_wishes bw
        JOIN celebration.celebrants cw ON bw.celebrant_id = cw.id
        WHERE DATE_TRUNC('day', bw.scheduled_time) = DATE_TRUNC('day', CURRENT_TIMESTAMP)
        ORDER BY bw.scheduled_time ASC;
    `);

    const birthdayWishes: BirthdayWish[] = result.rows;

    // Group wishes by celebrants
    const groupedWishes: { [celebrantId: number]: BirthdayWish[] } = {};
    birthdayWishes.forEach((wish) => {
      if (!groupedWishes[wish.celebrant_id]) {
        groupedWishes[wish.celebrant_id] = [];
      }
      groupedWishes[wish.celebrant_id].push(wish);
    });

    // Send wishes for each celebrant
    for (const celebrantId of Object.keys(groupedWishes)) {
      const wishes = groupedWishes[parseInt(celebrantId)];
      console.log(`Sending birthday wishes for celebrant ${celebrantId}`);
      for (const wish of birthdayWishes) {
        await sendWishToCelebrant(wish);
      }
    }

    await client.query(
      `INSERT INTO celebration.bg_jobs_status (job_name, status) VALUES ('Send Birthday Wishes', 'Completed');`
    );

    await client.query("COMMIT");
  } catch (error) {
    console.error("Error executing cron job:", error);
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
});

scheduleBirthdayWishes.start();

export default scheduleBirthdayWishes;
