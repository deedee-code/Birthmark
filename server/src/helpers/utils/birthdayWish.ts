import prisma from "../../configs/prisma";

interface CelebrantDetails {
  username: string;
  email: string | null;
  phone_number: string | null;
}

async function fetchCelebrantDetails(
  celebrantId: number
): Promise<CelebrantDetails> {
  const celebrant = await prisma.celebrant.findUnique({
    where: { id: celebrantId },
    select: {
      username: true,
      email: true,
      phone_number: true,
    },
  });

  if (celebrant) {
    return celebrant;
  } else {
    throw new Error(`Celebrant with id ${celebrantId} not found`);
  }
}

async function sendMessage(
  celebrantDetails: CelebrantDetails,
  message: string
) {
  console.log(
    `Sending wish to celebrant ${celebrantDetails.username} through birthmark messaging system: ${message}`
  );
}

async function sendWishToCelebrant(wish: any) {
  try {
    const celebrantDetails = await fetchCelebrantDetails(wish.celebrant_id);
    await sendMessage(celebrantDetails, wish.message);

    // Also log to the database
    await prisma.birthdayWishLog.create({
        data: {
            birthday_wishes_id: wish.id,
            status: "Successful",
        }
    });

    console.log(`Wish sent to celebrant ${wish.celebrant_id}`);
  } catch (error) {
    console.error(
      `Error sending wish to celebrant ${wish.celebrant_id}:`,
      error
    );
    // Log failure
    try {
        await prisma.birthdayWishLog.create({
            data: {
                birthday_wishes_id: wish.id,
                status: "Failed",
            }
        });
    } catch (logError) {
        console.error("Failed to log failure", logError);
    }
  }
}

export { sendWishToCelebrant };
