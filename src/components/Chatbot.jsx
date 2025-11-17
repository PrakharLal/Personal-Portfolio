import { useState, useRef, useEffect } from "react";
import { Send, X, MessageCircle } from "lucide-react";

const botResponses = {
  greeting: [
    "Hello! 👋 I'm Prakhar's portfolio assistant. How can I help you today?",
    "Hi there! 👋 Feel free to ask me anything about Prakhar's skills, experience, or availability.",
  ],
  experience: [
    "I have 5+ years of experience in web development, specializing in full-stack development with React, Node.js, and modern web technologies.",
    "My professional background includes working on various projects spanning frontend, backend, UI/UX design, and performance optimization.",
  ],
  skills: [
    "Frontend: React, Next.js, TypeScript, Tailwind CSS, JavaScript\nBackend: Node.js, Express, MongoDB, PostgreSQL, GraphQL\nTools: Git, Docker, Figma, VS Code",
    "I'm proficient in full-stack development with expertise in modern frameworks and tools. Would you like to know about a specific technology?",
  ],
  availability: [
    "I'm currently available for new projects and opportunities. I'm open to freelance work, full-time positions, and collaborations.",
    "I can start working on new projects immediately and I'm flexible with my schedule.",
  ],
  portfolio: [
    "I have completed 50+ projects ranging from landing pages to full-featured web applications.",
    "My portfolio includes SaaS platforms, dashboards, e-commerce sites, and custom web solutions. Check the Projects section to see them!",
  ],
  contact: [
    "You can reach me via:\n📧 Email: lal.prakharlal@gmail.com\n📱 Phone: +91 87705 62902\n📍 Location: Delhi, India",
    "Feel free to contact me through the Contact section or message me on LinkedIn/Twitter!",
  ],
  services: [
    "I offer: Web Development, UI/UX Design, Performance Optimization, Full-Stack Development, and Custom Web Solutions.",
    "Whether you need a website, web app, or design consultation, I'm here to help!",
  ],
  rate: [
    "My rates are competitive and flexible based on project scope, complexity, and timeline. Let's discuss your project details!",
    "I offer custom pricing for different project types. Please reach out through the Contact section to discuss your budget.",
  ],
  education: [
    "I'm passionate about continuous learning and staying updated with the latest web technologies and industry best practices.",
    "I regularly engage with the developer community and contribute to improving my skills.",
  ],
  location: [
    "I'm based in Delhi, India. I work with clients globally and am open to remote collaborations.",
  ],
};

const getResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("hey")
  ) {
    return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
  }
  
  if (
    lowerMessage.includes("experience") ||
    lowerMessage.includes("background") ||
    lowerMessage.includes("years")
  ) {
    return botResponses.experience[Math.floor(Math.random() * botResponses.experience.length)];
  }
  
  if (
    lowerMessage.includes("skills") ||
    lowerMessage.includes("expertise") ||
    lowerMessage.includes("technology") ||
    lowerMessage.includes("tech")
  ) {
    return botResponses.skills[Math.floor(Math.random() * botResponses.skills.length)];
  }
  
  if (
    lowerMessage.includes("available") ||
    lowerMessage.includes("availability") ||
    lowerMessage.includes("hire") ||
    lowerMessage.includes("work")
  ) {
    return botResponses.availability[Math.floor(Math.random() * botResponses.availability.length)];
  }
  
  if (
    lowerMessage.includes("portfolio") ||
    lowerMessage.includes("projects") ||
    lowerMessage.includes("work")
  ) {
    return botResponses.portfolio[Math.floor(Math.random() * botResponses.portfolio.length)];
  }
  
  if (
    lowerMessage.includes("contact") ||
    lowerMessage.includes("email") ||
    lowerMessage.includes("phone") ||
    lowerMessage.includes("reach")
  ) {
    return botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)];
  }
  
  if (
    lowerMessage.includes("service") ||
    lowerMessage.includes("offer") ||
    lowerMessage.includes("do")
  ) {
    return botResponses.services[Math.floor(Math.random() * botResponses.services.length)];
  }
  
  if (
    lowerMessage.includes("rate") ||
    lowerMessage.includes("price") ||
    lowerMessage.includes("cost") ||
    lowerMessage.includes("charge")
  ) {
    return botResponses.rate[Math.floor(Math.random() * botResponses.rate.length)];
  }
  
  if (
    lowerMessage.includes("education") ||
    lowerMessage.includes("learn") ||
    lowerMessage.includes("study")
  ) {
    return botResponses.education[Math.floor(Math.random() * botResponses.education.length)];
  }
  
  if (lowerMessage.includes("location") || lowerMessage.includes("where")) {
    return botResponses.location[Math.floor(Math.random() * botResponses.location.length)];
  }
  
  return "I'm not sure about that. Feel free to ask me about my experience, skills, availability, projects, contact info, services, rates, education, or location!";
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: botResponses.greeting[0], sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [messageCount, setMessageCount] = useState(1);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = {
      id: messageCount + 1,
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessageCount((prev) => prev + 1);
    setInput("");

    // Simulate bot thinking time
    setTimeout(() => {
      const botReply = {
        id: messageCount + 2,
        text: getResponse(input),
        sender: "bot",
      };
      setMessages((prev) => [...prev, botReply]);
      setMessageCount((prev) => prev + 1);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-purple-800 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center gap-2 group"
        >
          <MessageCircle size={24} />
          <span className="hidden sm:inline text-sm font-medium group-hover:inline">Chat with me</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[600px] rounded-2xl border border-primary/20 bg-background backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-800 to-purple-600 text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Prakhar's Assistant</h3>
              <p className="text-sm opacity-90">Always here to help</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs rounded-xl px-4 py-3 text-sm whitespace-pre-wrap ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-secondary text-foreground rounded-bl-none border border-primary/20"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-primary/20 p-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 rounded-lg border border-primary/30 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-muted-foreground"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-colors hover:scale-105"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
