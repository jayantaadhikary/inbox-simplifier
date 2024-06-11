import { getSession } from "next-auth/react";
import { getMessage } from "../../../utils/gmail";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const accessToken = session.accessToken;

  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const message = await getMessage(accessToken, id);
      res.status(200).json(message);
    } catch (error: unknown) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
