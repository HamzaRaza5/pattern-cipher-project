import { useState } from "react";
import axios from "axios";

interface EncryptFormProps {
  onRefresh: () => void;
}

export default function EncryptForm({ onRefresh }: EncryptFormProps) {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState({ encrypted: "", decrypted: "" });

  const handleEncrypt = async () => {
    const res = await axios.post("http://localhost:3000/cipher/encrypt", {
      text,
      key: Number(key),
    });
    setResult({ ...result, encrypted: res.data.encrypted });
    onRefresh();
  };

  const handleDecrypt = async () => {
    const res = await axios.post("http://localhost:3000/cipher/decrypt", {
      text,
      key: Number(key),
    });
    setResult({ ...result, decrypted: res.data.decrypted });
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <h2 className="h5 mb-4">🔐 Pattern Cipher</h2>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Enter key (0–25)"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>

        <div className="d-flex gap-2 mb-3">
          <button className="btn btn-primary" onClick={handleEncrypt}>
            Encrypt
          </button>
          <button className="btn btn-success" onClick={handleDecrypt}>
            Decrypt
          </button>
        </div>

        {result.encrypted && (
          <div className="alert alert-info py-2">
            <strong>Encrypted:</strong> <code>{result.encrypted}</code>
          </div>
        )}
        {result.decrypted && (
          <div className="alert alert-secondary py-2 mt-2">
            <strong>Decrypted:</strong> <code>{result.decrypted}</code>
          </div>
        )}
      </div>
    </div>
  );
}
