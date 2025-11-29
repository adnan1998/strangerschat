import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle } from "lucide-react";

interface SafetyNoticeProps {
  variant?: 'default' | 'compact';
}

export function SafetyNotice({ variant = 'default' }: SafetyNoticeProps) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-yellow-50 dark:bg-yellow-950/20 px-3 py-2 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <Shield className="h-3 w-3 text-yellow-600" />
        <span>AnonChat is for friendly conversation only. Explicit or adult content is strictly not allowed.</span>
      </div>
    );
  }

  return (
    <Alert className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/20">
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="text-yellow-800 dark:text-yellow-200">
        <strong>Safety Notice:</strong> AnonChat is for friendly conversation only. 
        Explicit or adult content is strictly not allowed. Users violating our rules will be banned.
      </AlertDescription>
    </Alert>
  );
}

export function AgeVerificationNotice() {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 px-4 py-3 rounded-lg border border-red-200 dark:border-red-800 mb-6">
      <AlertTriangle className="h-4 w-4" />
      <span>You must be 18+ to use AnonChat</span>
    </div>
  );
}

export function SafetyFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="text-center text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
      <p>© {currentYear} AnonChat — Safe & Anonymous Chat. No explicit content allowed.</p>
      <div className="flex justify-center gap-4 mt-2">
        <a 
          href="/terms" 
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Terms of Service
        </a>
        <a 
          href="/privacy" 
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
}