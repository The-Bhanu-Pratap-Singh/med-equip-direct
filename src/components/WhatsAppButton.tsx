import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const WHATSAPP_NUMBER = "911234567890"; // Replace with actual number
const DEFAULT_MESSAGE = "Hello! I'm interested in your medical equipment. Can you help me?";

interface WhatsAppButtonProps {
  message?: string;
  productName?: string;
  className?: string;
}

export const WhatsAppButton = ({ 
  message, 
  productName,
  className = "" 
}: WhatsAppButtonProps) => {
  const getWhatsAppUrl = () => {
    let text = message || DEFAULT_MESSAGE;
    if (productName) {
      text = `Hello! I'm interested in ${productName}. Can you provide more details?`;
    }
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a 
            href={getWhatsAppUrl()} 
            target="_blank" 
            rel="noopener noreferrer"
            className={className}
          >
            <Button 
              size="icon" 
              className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Chat on WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const FloatingWhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-float">
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-3 rounded-full shadow-xl transition-all hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="font-medium hidden sm:inline">Chat with Us</span>
      </a>
    </div>
  );
};
