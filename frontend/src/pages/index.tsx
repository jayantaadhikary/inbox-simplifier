import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const { data: session } = useSession() as any;
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState<{
    id: string;
    body: string;
    snippet: string;
  } | null>(null);
  const [summary, setSummary] = useState("");

  // Fetch emails when session is available and accessToken is present
  useEffect(() => {
    if (session?.accessToken) {
      axios
        .get("/api/emails")
        .then((response) => {
          console.log(response.data);
          setEmails(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, [session]);

  const summarizeEmail = async () => {
    if (selectedEmail) {
      const response = await axios.post("http://localhost:5500/summarize", {
        text: selectedEmail.body,
      });
      setSummary(response.data);
    }
  };

  const toggleEmailSelection = (email: any) => {
    // Toggle selection if the same email is clicked again
    setSelectedEmail((prevEmail) =>
      prevEmail?.id === email.id ? null : email
    );
    setSummary(""); // Clear the summary when switching emails
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-200">
      <h1 className="text-4xl font-semibold mb-4">Inbox Simplifier</h1>
      <h3 className="text-lg font-semibold mb-4"> Summarize your emails</h3>
      {!session ? (
        <div className="text-center">
          <p className="text-xl font-semibold">Not signed in</p>
          <button
            onClick={() => signIn()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign in
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <p className="text-md font-semibold">
              Signed in as {session.user?.email}
            </p>
            <button
              onClick={() => signOut()}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Sign out
            </button>
          </div>
          <div className="mb-6">
            <h1 className="text-3xl text-center font-semibold">
              5 Most Recent Emails
            </h1>
          </div>
          <div className="space-y-4">
            {emails.map((email: any) => (
              <div key={email.id}>
                <div
                  className={`p-4 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 ${
                    selectedEmail?.id === email.id
                      ? "bg-gray-700"
                      : "bg-gray-800"
                  }`}
                  onClick={() => toggleEmailSelection(email)}
                >
                  {email.subject}
                </div>
                {selectedEmail?.id === email.id && (
                  <div className="mt-2 p-4 bg-gray-700 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">
                      Email Details
                    </h2>

                    <p className="mb-4">{selectedEmail?.snippet}</p>
                    <button
                      onClick={summarizeEmail}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Summarize Email
                    </button>
                    {summary && (
                      <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                        <h3 className="text-lg font-semibold">Summary:</h3>
                        <p>{summary}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
