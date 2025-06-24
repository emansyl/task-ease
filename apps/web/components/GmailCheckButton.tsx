"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface GmailCheckButtonProps {
  lastSyncAt?: Date | null;
}

export default function GmailCheckButton({ lastSyncAt }: GmailCheckButtonProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleCheckGmail = async () => {
    setIsChecking(true);
    setStatus('idle');
    setMessage('');

    try {
      const response = await fetch('/api/gmail-email', {
        method: 'GET',
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setMessage(`Successfully processed ${result.emailIds?.length || 0} new emails`);
        // Refresh the page to show new data
        window.location.reload();
      } else {
        setStatus('error');
        setMessage(result.message || result.error || 'Failed to check Gmail');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error occurred');
      console.error('Gmail check error:', error);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Button
          onClick={handleCheckGmail}
          disabled={isChecking}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
          {isChecking ? 'Checking Gmail...' : 'Check Recent Emails'}
        </Button>
        
        {status === 'success' && (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">Success</span>
          </div>
        )}
        
        {status === 'error' && (
          <div className="flex items-center gap-1 text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">Error</span>
          </div>
        )}
      </div>

      {lastSyncAt && (
        <p className="text-xs text-muted-foreground">
          Last checked: {formatDistanceToNow(lastSyncAt, { addSuffix: true })}
        </p>
      )}

      {message && (
        <p className={`text-xs ${status === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}