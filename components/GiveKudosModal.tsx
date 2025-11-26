/**
 * Give Kudos Modal Component
 * 
 * Modal dialog for giving kudos to a teammate.
 * Includes user selection dropdown and message input with character count.
 */

'use client';

import { useState } from 'react';
import { giveKudos } from '@/lib/api';
import type { User } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getUserInitials } from '@/lib/utils';
import { Heart, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface GiveKudosModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  users: User[];
  onSuccess: () => void;
}

export default function GiveKudosModal({
  open,
  onOpenChange,
  users,
  onSuccess,
}: GiveKudosModalProps) {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedUser = users.find((u) => u.id === selectedUserId);
  const maxLength = 500;
  const remainingChars = maxLength - message.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUserId || !message.trim()) {
      return;
    }

    setLoading(true);

    try {
      await giveKudos({
        to_user_id: selectedUserId,
        message: message.trim(),
      });

      toast.success(`Kudos sent to ${selectedUser?.username}!`);
      
      // Reset form
      setSelectedUserId(null);
      setMessage('');
      
      // Close modal and refresh data
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      const errorMessage = error.response?.data?.non_field_errors?.[0] 
        || error.response?.data?.detail 
        || 'Failed to give kudos. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Heart className="w-5 h-5 mr-2 text-primary" />
            Give Kudos
          </DialogTitle>
          <DialogDescription>
            Recognize a teammate for their great work
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* User Selection */}
            <div className="space-y-2">
              <Label>Select teammate</Label>
              <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto border rounded-md p-2">
                {users.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => setSelectedUserId(user.id)}
                    className={`flex items-center space-x-3 p-3 rounded-md transition-colors text-left ${
                      selectedUserId === user.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback
                        className={
                          selectedUserId === user.id
                            ? 'bg-white text-primary'
                            : 'bg-primary/10 text-primary'
                        }
                      >
                        {getUserInitials(user.first_name, user.last_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {user.first_name && user.last_name
                          ? `${user.first_name} ${user.last_name}`
                          : user.username}
                      </p>
                      <p
                        className={`text-sm truncate ${
                          selectedUserId === user.id
                            ? 'text-white/80'
                            : 'text-gray-500'
                        }`}
                      >
                        @{user.username}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <Label htmlFor="message">Your message</Label>
              <Textarea
                id="message"
                placeholder="Write why you're giving this kudos... (e.g., 'Thanks for helping me debug that tricky issue!')"
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
                rows={4}
                disabled={loading}
                required
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  Share what made you appreciate their work
                </p>
                <p
                  className={`text-xs ${
                    remainingChars < 50 ? 'text-orange-600' : 'text-gray-500'
                  }`}
                >
                  {remainingChars} characters left
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !selectedUserId || !message.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Heart className="mr-2 h-4 w-4" />
                  Send Kudos
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
