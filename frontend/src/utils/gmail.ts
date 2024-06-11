import { google } from "googleapis";

export async function listMessages(accessToken: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: "v1", auth });

  const res = await gmail.users.messages.list({
    userId: "me",
    q: "",
    maxResults: 5, // Adjust as needed
  });

  if (!res.data.messages) {
    return [];
  }

  const messages = await Promise.all(
    res.data.messages.map(async (message: any) => {
      const msg = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
      });

      const bodyData =
        msg.data.payload?.parts?.find((part) => part.mimeType === "text/plain")
          ?.body?.data || "";

      return {
        id: msg.data.id,
        subject: msg.data.payload?.headers?.find(
          (header) => header.name === "Subject"
        )?.value,
        snippet: msg.data.snippet,
        body: Buffer.from(bodyData, "base64").toString("utf-8"),
      };
    })
  );

  return messages;
}
