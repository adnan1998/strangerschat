import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportButtonProps {
  messageId: string;
  senderId: string;
  content: string;
}

export function ReportButton({ messageId, senderId, content }: ReportButtonProps) {
  const { toast } = useToast();

  const handleReport = () => {
    // In a real implementation, you would send this to your moderation system
    // For now, we just show a confirmation toast
    console.log('Reported message:', { messageId, senderId, content });
    
    toast({
      title: "Thank you for your report",
      description: "This message will be reviewed by our moderation team.",
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleReport}
      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 dark:hover:bg-red-900/20"
      title="Report this message"
    >
      <Flag className="h-3 w-3 text-red-500" />
    </Button>
  );
}