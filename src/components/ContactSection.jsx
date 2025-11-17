import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitch,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setIsSubmitting(false);
    }, 1500);
  };
  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear from you. Let's create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="group p-6 rounded-xl border border-primary/20 bg-secondary/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-primary/30 to-cyan-500/30 group-hover:from-primary/50 group-hover:to-cyan-500/50 transition-colors duration-300">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Email</h4>
                  <a
                    href="mailto:lal.prakharlal@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    lal.prakharlal@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="group p-6 rounded-xl border border-primary/20 bg-secondary/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/30 to-blue-500/30 group-hover:from-cyan-500/50 group-hover:to-blue-500/50 transition-colors duration-300">
                  <Phone className="h-6 w-6 text-cyan-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Phone</h4>
                  <a
                    href="tel:+918770562902"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    +91 87705 62902
                  </a>
                </div>
              </div>
            </div>

            <div className="group p-6 rounded-xl border border-primary/20 bg-secondary/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500/30 to-pink-500/30 group-hover:from-orange-500/50 group-hover:to-pink-500/50 transition-colors duration-300">
                  <MapPin className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Location</h4>
                  <p className="text-muted-foreground text-sm">
                    Delhi, India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="font-semibold mb-4">Connect With Me</h4>
              <div className="flex space-x-3 flex-wrap gap-3">
                <a href="#" target="_blank" className="p-3 rounded-lg bg-secondary/50 hover:bg-primary/20 border border-primary/20 hover:border-primary/50 transition-all duration-300">
                  <Linkedin size={20} className="text-primary" />
                </a>
                <a href="#" target="_blank" className="p-3 rounded-lg bg-secondary/50 hover:bg-primary/20 border border-primary/20 hover:border-primary/50 transition-all duration-300">
                  <Twitter size={20} className="text-primary" />
                </a>
                <a href="#" target="_blank" className="p-3 rounded-lg bg-secondary/50 hover:bg-primary/20 border border-primary/20 hover:border-primary/50 transition-all duration-300">
                  <Instagram size={20} className="text-primary" />
                </a>
                <a href="#" target="_blank" className="p-3 rounded-lg bg-secondary/50 hover:bg-primary/20 border border-primary/20 hover:border-primary/50 transition-all duration-300">
                  <Twitch size={20} className="text-primary" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div
              className="p-8 rounded-2xl border border-primary/20 bg-secondary/30 backdrop-blur-sm"
              onSubmit={handleSubmit}
            >
              <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-3"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-primary/30 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 placeholder:text-muted-foreground"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-3"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-primary/30 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 placeholder:text-muted-foreground"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-3"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-primary/30 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 resize-none placeholder:text-muted-foreground"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full cosmic-button flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send size={16} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
