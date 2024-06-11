import express from "express";
import { getCompletion } from "./util/openai";

const PORT = 5500;

const app = express();
app.use(express.json());

// app.get("/summarize", async (req, res) => {
//   const prompt = examplePrompt;
//   const completion = await getCompletion(prompt);
//   const completionJSON = JSON.parse(completion as string);
//   res.json(completionJSON);
// });

app.post("/summarize", async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    res.status(400).json({ error: "Prompt is required" });
    return;
  }

  console.log("Prompt: ", prompt);

  const completion = await getCompletion(prompt);

  console.log("Completion: ", completion);

  const completionJSON = JSON.parse(completion as string);

  res.json(completionJSON);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
