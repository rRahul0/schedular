import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
    const user = await currentUser();
    if (!user) {
        throw null;
    }
    try {
        const loggedInUser = await db?.user.findUnique({
            where: {
                clerkUserId: user.id,
            },
        });
        if (loggedInUser) return loggedInUser;

        const name = `${user.firstName} ${user.lastName}`;
        await clerkClient().users.updateUser(user.id, {
            username: name.split(" ").join('-') + user.id.slice(-4),
        });
        const newUser = await db?.user.create({
            data: {
                clerkUserId: user.id,
                name,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
                userName: name.split(" ").join('-') + user.id.slice(-4),
            },
        });
        return newUser;
    } catch (error) {
        console.error(error);
    }
}