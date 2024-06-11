# InboxSimplifier

InboxSimplifier is a simple tool utilizing the OpenAi API to summarize emails.
It uses the GPT-3.5-turbo model to summarize the email content and provide a brief summary of the email.
The current tech stack is ExpressJS for the Summarization backend and NextJS for the email login and frontend.

## Installation

1. Clone the repository
2. Run `npm install` in the root directory
3. Run `npm install` in the frontend and backend directories as well
4. Create a `.env` file in the server directory and add the following:
   `OPENAI_API_KEY=YOUR_API_KEY_HERE`
5. Create a `.env.local` file in the frontend directory and add the following:

```GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
    GOOGLE_CLIENT_SECRET=YOUR_GOOGLE
    NEXTAUTH_URL=http://localhost:3000
```

6. Run `npm run dev` in the root directory to start the application

## Usage

1. Navigate to `http://localhost:3000` in your browser
2. Click on the login button and login with your Google account
3. Click on the `Authorize` button to allow the application to access your email
4. 5 most recent emails will be displayed on the screen
5. Click on the email subject you want to summarize and click the summarize button to get a summary of the email

## Future Work

1. Add more email providers
2. Add more summarization models
3. Add email labels and filters
4. Improve the UI/UX of the application
5. Add more features to the application
6. Try making a robust email client with AI capabilities

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
