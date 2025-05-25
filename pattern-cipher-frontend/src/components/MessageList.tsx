import { useEffect, useState } from "react";
import axios from "axios";

interface Message {
  id: number;
  originalText: string;
  encryptedText: string;
  key: number;
  createdAt: string;
}

interface MessageListProps {
  refreshTrigger: number;
}

export default function MessageList({ refreshTrigger }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  const loadMessages = async () => {
    const res = await axios.get("http://localhost:3000/cipher/all");
    setMessages(res.data);
  };

  const deleteMessage = async (id: number) => {
    await axios.delete(`http://localhost:3000/cipher/${id}`);
    loadMessages();
  };

  useEffect(() => {
    loadMessages();
  }, [refreshTrigger]);

  return (
    <div className="card shadow">
      <div className="card-body">
        <h2 className="h5 mb-4">📜 Message History</h2>

        {messages.length === 0 ? (
          <p className="text-muted">No messages yet.</p>
        ) : (
          <div className="list-group">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="list-group-item d-flex justify-content-between align-items-start"
              >
                <div>
                  <p className="mb-1">
                    <strong>Text:</strong> {msg.originalText}
                  </p>
                  <p className="mb-1">
                    <strong>Encrypted:</strong> <code>{msg.encryptedText}</code>
                  </p>
                  <p className="mb-1">
                    <strong>Key:</strong> {msg.key}
                  </p>
                  <small className="text-muted">
                    {new Date(msg.createdAt).toLocaleString()}
                  </small>
                </div>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteMessage(msg.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
