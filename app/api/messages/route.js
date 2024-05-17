// Config
import connectDB from "@/config/database";

// Model
import Message from "@/models/Message";

// Utils
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET : /api/messages
export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response("User ID is required", {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");

    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");

    const messages = [...unreadMessages, ...readMessages];

    return new Response(JSON.stringify(messages), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// POST : /api/messages
export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(
        "Unauthorised Access: You must be logged in to send a message",
        {
          status: 401,
        }
      );
    }

    const { user } = sessionUser;

    const { name, email, phone, message, property, recipient } =
      await request.json();

    // TODO : Uncomment the code
    // Cannot send message to yourself
    // if (recipient === user.id) {
    //   return new Response(
    //     JSON.stringify({ message: "Cannot send a message to yourself" }),
    //     {
    //       status: 401,
    //     }
    //   );
    // }

    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    });

    await newMessage.save();

    return new Response(
      JSON.stringify({ message: "Message Sent succesfully test" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
