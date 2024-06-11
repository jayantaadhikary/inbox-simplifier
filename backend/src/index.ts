import express from "express";
import { getCompletion } from "./util/openai";

const PORT = 5500;

const app = express();

const examplePrompt = `Subject: Meeting Request for Project Update

Dear Mr. Smith,

I hope this email finds you well.

I am writing to request a meeting to discuss the current progress of our ongoing project. I would like to review the key milestones we have achieved so far and outline the next steps for the upcoming quarter.

Could we schedule a meeting for next Monday at 10:00 AM? Please let me know if this time is convenient for you, or suggest an alternative that fits your schedule.

Thank you for your time and consideration.

Best regards,

John Doe
Project Manager
XYZ Corporation
john.doe@xyz.com`;

app.get("/summarize", async (req, res) => {
  const prompt = examplePrompt;
  const completion = await getCompletion(prompt);
  const completionJSON = JSON.parse(completion as string);
  res.json(completionJSON);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
