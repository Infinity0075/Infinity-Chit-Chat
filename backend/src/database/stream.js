import { StreamChat } from "stream-chat";

import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.log("Stream API key or Stream Secret key is not working properly!");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

// upsert method can help to create a user if not created and if it is there then it will just update it

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    return userData;
  } catch (error) {
    console.error("Error in upserting stream user: ", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    //first convert this userId to string
    const userIdStr = userId.toString();
    streamClient.createToken(userIdStr);
  } catch (error) {
    console.log("Error generating Token!!");
  }
};
