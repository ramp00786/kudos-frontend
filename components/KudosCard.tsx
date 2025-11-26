/**
 * Kudos Card Component
 * 
 * Displays a single kudos with sender info, message, and timestamp.
 * Used in the dashboard to show received kudos.
 */

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { getUserInitials, formatRelativeTime } from '@/lib/utils';
import type { Kudo } from '@/types';
import { Quote, Sparkles } from 'lucide-react';

interface KudosCardProps {
  kudo: Kudo;
  sent?: boolean;
}

export default function KudosCard({ kudo, sent = false }: KudosCardProps) {
  // Show the other person (receiver if sent, sender if received)
  const displayUser = sent ? kudo.to_user : kudo.from_user;
  const prefix = sent ? 'To' : 'From';
  
  return (
    <Card className={`hover:shadow-md transition-shadow duration-200 ${kudo.is_new ? 'ring-2 ring-primary/50 bg-primary/5' : ''}`}>
      <CardContent className="pt-6">
        {kudo.is_new && (
          <div className="flex items-center gap-1 mb-3 animate-pulse">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">New</span>
          </div>
        )}
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {getUserInitials(displayUser.first_name, displayUser.last_name)}
            </AvatarFallback>
          </Avatar>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs text-gray-500 mb-1">{prefix}</p>
                <p className="font-semibold text-gray-900">
                  {displayUser.first_name && displayUser.last_name
                    ? `${displayUser.first_name} ${displayUser.last_name}`
                    : displayUser.username}
                </p>
                <p className="text-sm text-gray-500">
                  @{displayUser.username}
                </p>
              </div>
              <time className="text-sm text-gray-500 flex-shrink-0">
                {formatRelativeTime(kudo.created_at)}
              </time>
            </div>

            {/* Message */}
            <div className="relative bg-gray-50 rounded-lg p-4 mt-3">
              <Quote className="absolute top-2 left-2 w-5 h-5 text-gray-300" />
              <p className="text-gray-700 ml-6 italic">
                {kudo.message}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
