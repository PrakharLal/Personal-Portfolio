import { useState, useRef, useEffect } from "react";
import { Send, X, MessageCircle, Sparkles } from "lucide-react";

const botResponses = {
  greeting: [
    "Hello! 👋 I'm Prakhar's AI assistant. How can I help you today?",
    "Hi there! 👋 Welcome to Prakhar's portfolio. Feel free to ask me anything about skills, experience, projects, or availability.",
    "Welcome! 🤖 I'm an AI assistant. What would you like to know?",
  ],
  experience: [
    "I have 5+ years of professional experience in full-stack web development. I've worked on diverse projects ranging from startups to enterprise applications, specializing in React, Node.js, and modern web architectures.",
    "My background includes:\n• 5+ years in web development\n• Led multiple high-impact projects\n• Expertise in full-stack development\n• Strong focus on performance & UX\n\nWould you like details on specific areas?",
    "With 5+ years of experience, I've developed strong expertise in creating scalable, performant web applications using cutting-edge technologies.",
  ],
  skills: [
    "🎯 Frontend: React, Next.js, TypeScript, Tailwind CSS, JavaScript, Three.js\n🔧 Backend: Node.js, Express, MongoDB, PostgreSQL, GraphQL\n🛠️ Tools: Git, Docker, Figma, VS Code, AWS\n\nWhich technology interests you most?",
    "I'm proficient across the full stack:\n• Modern JavaScript frameworks (React, Next.js)\n• Backend development (Node.js, Express)\n• Databases (MongoDB, PostgreSQL)\n• Design & Prototyping (Figma)\n• DevOps (Docker, Git)\n\nLet me know if you want more details on any skill!",
  ],
  availability: [
    "✅ I'm currently available for new projects!\n\n• Freelance: Flexible rates & timeline\n• Full-time: Open to opportunities\n• Contract: Short or long-term\n• Consultation: Expert advice available\n\nWhat type of project do you have in mind?",
    "I can start immediately on new projects. I'm flexible with schedules and open to various engagement models. What's your project about?",
  ],
  portfolio: [
    "I've completed 50+ projects including:\n• SaaS platforms\n• E-commerce sites\n• Dashboards & data visualization\n• Web apps & tools\n• Landing pages\n\nCheck the Projects section to see my latest work!",
    "My portfolio spans diverse industries and complexities:\n📊 Data platforms\n🛒 E-commerce solutions  \n📱 Mobile-responsive apps\n⚡ Performance-optimized sites\n\nWould you like to explore specific projects?",
  ],
  contact: [
    "📧 Email: lal.prakharlal@gmail.com\n📱 Phone: +91 87705 62902\n📍 Location: Delhi, India\n🔗 LinkedIn & GitHub: Check footer for links\n\nFeel free to reach out anytime!",
    "You can contact me via:\n• Email for detailed inquiries\n• Phone for quick discussions\n• LinkedIn for professional networking\n\nI typically respond within 24 hours!",
  ],
  services: [
    "🚀 Services I Offer:\n• Full-Stack Web Development\n• React & Next.js Expertise\n• UI/UX Design & Implementation\n• Performance Optimization\n• API Development & Integration\n• Consulting & Code Review\n\nWhich service interests you?",
    "I specialize in:\n💻 Custom web application development\n🎨 Modern UI/UX implementation\n⚡ Performance optimization\n🔧 Technical consultation\n📊 Data visualization solutions\n\nHow can I help with your project?",
  ],
  rate: [
    "💰 My rates are competitive and flexible:\n• Hourly: Based on project complexity\n• Project-based: Fixed quotes available\n• Retainer: Ongoing support packages\n\nLet's discuss your project budget & timeline!",
    "I offer flexible pricing models:\n📈 Hourly rates for flexible projects\n📦 Fixed rates for defined scopes\n🔄 Retainer options for ongoing work\n\nLet's find a model that works for you!",
  ],
  education: [
    "I'm passionate about continuous learning:\n• Stay updated with latest web tech\n• Active in developer communities\n• Regularly contribute to open-source\n• Explore emerging technologies\n\nWhat would you like to learn about?",
    "I believe in constant improvement:\n📚 Continuous skill development\n🤝 Community contribution\n🔬 Experimenting with new tech\n📖 Staying ahead of industry trends",
  ],
  location: [
    "I'm based in 📍 Delhi, India\n\nI work globally with clients from:\n🌍 North America\n🌏 Europe\n🌎 Asia\n\nRemote collaboration is my preference!",
  ],
  recommendation: [
    "I'd recommend discussing your project requirements in detail. Based on your needs, I can suggest the best tech stack and approach. Shall we connect?",
  ],
  project_help: [
    "Great! Tell me more about your project:\n1. What's the goal/purpose?\n2. Who's your target audience?\n3. What features do you need?\n4. What's your timeline?\n5. What's your budget range?\n\nI can then suggest the best approach!",
  ],
};

const getAIResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  let responses = [];

  // Advanced keyword matching
  if (
    lowerMessage.match(/hello|hi|hey|greetings|howdy/) &&
    lowerMessage.length < 20
  ) {
    responses = botResponses.greeting;
  } else if (
    lowerMessage.match(/experience|background|years|career|worked/) &&
    lowerMessage.length < 50
  ) {
    responses = botResponses.experience;
  } else if (
    lowerMessage.match(/skill|expertise|technology|tech|language|framework/) &&
    lowerMessage.length < 50
  ) {
    responses = botResponses.skills;
  } else if (
    lowerMessage.match(/available|availability|hire|work|open|project|job/)
  ) {
    responses = botResponses.availability;
  } else if (
    lowerMessage.match(/portfolio|project|work|built|created|completed/)
  ) {
    responses = botResponses.portfolio;
  } else if (
    lowerMessage.match(/contact|email|phone|reach|message|connect/)
  ) {
    responses = botResponses.contact;
  } else if (
    lowerMessage.match(/service|offer|do|provide|help|build/)
  ) {
    responses = botResponses.services;
  } else if (
    lowerMessage.match(/rate|price|cost|charge|budget|payment/)
  ) {
    responses = botResponses.rate;
  } else if (
    lowerMessage.match(/education|learn|study|course|training|improve/)
  ) {
    responses = botResponses.education;
  } else if (
    lowerMessage.match(/location|where|city|based|country/)
  ) {
    responses = botResponses.location;
  } else if (
    lowerMessage.match(/recommend|suggest|best|think|advice|opinion/)
  ) {
    responses = botResponses.recommendation;
  } else if (
    lowerMessage.match(/project|build|create|develop|make|help|need/)
  ) {
    responses = botResponses.project_help;
  }

  if (responses.length > 0) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  return "That's an interesting question! 🤔 I might not have a specific response for that, but feel free to ask about my experience, skills, projects, availability, contact info, services, rates, education, or location. Or describe your project and I can help!";
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 I'm Prakhar's AI Assistant - powered by advanced NLP. I'm here to answer questions about skills, experience, projects, and availability. How can I help?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: input,
        sender: "user",
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsTyping(true);

      // Simulate AI thinking with variable delay
      const delay = 400 + Math.random() * 400; // 400-800ms
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          text: getAIResponse(input),
          sender: "bot",
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, delay);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="absolute bottom-0 right-0 w-96 h-[500px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-purple-500/30 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-yellow-300 animate-pulse" />
              <div>
                <h3 className="font-bold text-white text-sm">AI Assistant</h3>
                {/* <p className="text-xs text-blue-100">Advanced NLP Powered</p> */}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 rounded transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg whitespace-pre-wrap ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none"
                      : "bg-slate-700/80 text-gray-100 rounded-bl-none border border-slate-600"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-700/80 text-gray-100 px-4 py-2 rounded-lg rounded-bl-none border border-slate-600 flex gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-purple-500/30 p-3 flex gap-2 bg-slate-800/50">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything..."
              disabled={isTyping}
              className="flex-1 bg-slate-700 text-white px-3 py-2 rounded border border-purple-500/20 focus:outline-none focus:border-purple-500 disabled:opacity-60 text-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={isTyping || !input.trim()}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white p-2 rounded transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : null}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-2xl transition transform hover:scale-110"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
};
