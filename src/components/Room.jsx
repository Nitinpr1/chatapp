import client, {
  databases,
  DATABASE_ID,
  COLLATION_ID_MESSAGES,
} from "../appwriteConfig";
import { useState, useEffect } from "react";
import { ID, Query, Role, Permission } from "appwrite";
import { Trash } from "react-feather";
import UserHeader from "./UserHeader";
import { useAuth } from "../utils/AuthContext";

const Room = () => {
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    getMessage();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLATION_ID_MESSAGES}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          console.log("A MESSAGE WAS CREATED");
          setMessages((prevState) => [...prevState, response.payload]);
        }

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          console.log("A MESSAGE WAS DELETED!!!");
          setMessages((prevState) =>
            prevState.filter((message) => message.$id !== response.payload.$id)
          );
        }
      }
    );

    console.log("unsubscribe:", unsubscribe);

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      user_id: user.$id,
      username: user.name,
      body: messageBody,
    };

    let permissions = [Permission.write(Role.user(user.$id))];

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLATION_ID_MESSAGES,
      ID.unique(),
      payload,
      permissions
    );
    console.log("created", response);

    setMessageBody("");
  };

  const getMessage = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLATION_ID_MESSAGES,
      [Query.orderAsc("$createdAt"), Query.limit(10)]
    );
    console.log(response.documents);
    setMessages(response.documents);
  };
  const DeleteMessage = async (message_id) => {
    databases.deleteDocument(DATABASE_ID, COLLATION_ID_MESSAGES, message_id);
  };

  return (
    <section className="flex flex-col gap-3 justify-center items-center p-2">
      <UserHeader />
      <div className="p-5 border-2 rounded-lg md:w-2/3 w-full h-[440px] md:h-[420px] relative overflow-y-auto bg-slate-100 bg-opacity-20 letscroll">
        {messages.map((message) => (
          <div key={message.$id} className="flex flex-col gap-1 m-2">
            <div className="flex justify-between items-center">
              <p className="text-slate-700">
                {message?.username ? (
                  <span>{message.username}</span>
                ) : (
                  <span>Anonymous</span>
                )}
                <small className="m-4 ms-4 text-sm">
                  {new Date(message.$createdAt).toLocaleTimeString([], {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </p>

              {message.$permissions.includes(`delete("user:${user.$id}")`) && (
                <Trash
                  className="text-indigo-600 hover:text-red-500 w-50 cursor-pointer"
                  onClick={() => {
                    DeleteMessage(message.$id);
                  }}
                />
              )}
            </div>
            <div
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
              className="p-2 w-fit rounded-full text-white"
            >
              <span className="p-3">{message.body}</span>
            </div>
          </div>
        ))}

        <div className="fixed md:inset-x-80 inset-x-3 bottom-8">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-3  rounded-full w-full">
              <input
                type="text"
                required
                maxLength="1000"
                placeholder="message"
                onChange={(e) => {
                  setMessageBody(e.target.value);
                }}
                value={messageBody}
                className="outline-none p-4 h-auto rounded-full w-full shadow-2xl border-2"
              />
              <button
                type="submit"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
                className="w-[100px] p-4 bg-indigo-500 rounded-full shadow-2xl text-white"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Room;
