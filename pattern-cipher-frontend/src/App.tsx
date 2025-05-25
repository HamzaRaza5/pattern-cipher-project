import { useState } from "react";
import EncryptForm from "./components/EncryptForm";
import MessageList from "./components/MessageList";

function App() {
  const [refresh, setRefresh] = useState(0);
  const triggerRefresh = () => setRefresh((r) => r + 1);

  return (
    <div className="container py-5">
      <EncryptForm onRefresh={triggerRefresh} />
      <MessageList refreshTrigger={refresh} />
    </div>
  );
}

export default App;
