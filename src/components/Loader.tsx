import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-32 space-y-4">
      {/* Loader with Chatbot Icon */}
      <div className="relative flex items-center justify-center">
        <motion.div
          className="w-14 h-14 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <MessageCircle className="absolute text-blue-500 w-7 h-7" />
      </div>

      {/* Typing Animation */}
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 bg-blue-500 rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      <p className="text-sm text-gray-500">Typing...</p>
    </div>
  );
};

export default Loader;
