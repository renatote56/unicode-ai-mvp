import { useState } from "react";
import LandingPage from "./components/LandingPage";
import ChatInterface from "./components/ChatInterface";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="bg-unicode-black min-h-screen text-white font-sans selection:bg-unicode-green selection:text-black">
      <AnimatePresence mode="wait">
        {!showChat ? (
          <motion.div
            key="landing"
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <LandingPage onStart={() => setShowChat(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <ChatInterface />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
