import { pool } from "../../configs/database";
import { Wish, CelebrantDetails } from "../../configs/types";

async function fetchCelebrantDetails(
  celebrantId: number
): Promise<CelebrantDetails> {
  // Query the database to fetch celebrant details based on celebrant_id
  const client = await pool.connect();
  const result = await client.query(
    `
    SELECT username, email, phone_number
    FROM celebration.celebrants
    WHERE id = $1
  `,
    [celebrantId]
  );
  client.release();

  if (result.rows.length > 0) {
    return result.rows[0];
  } else {
    throw new Error(`Celebrant with id ${celebrantId} not found`);
  }
}

async function sendMessage(
  celebrantDetails: CelebrantDetails,
  message: string
) {
  // A function to send a message through the internal messaging system
  console.log(
    `Sending wish to celebrant ${celebrantDetails.username} through birthmark messaging system: ${message}`
  );
}

async function sendWishToCelebrant(wish: Wish) {
  try {
    // A function to fetch celebrant details based on celebrant_id
    const celebrantDetails = await fetchCelebrantDetails(wish.celebrant_id);

    // A function to send a message through the messaging system
    await sendMessage(celebrantDetails, wish.message);

    console.log(`Wish sent to celebrant ${wish.celebrant_id}`);
  } catch (error) {
    console.error(
      `Error sending wish to celebrant ${wish.celebrant_id}:`,
      error
    );
  }
}

export { sendWishToCelebrant };
