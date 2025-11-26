/**
 * Custom hook for Pusher real-time updates.
 * 
 * Subscribes to user-specific channels and listens for new kudos.
 */

import { useEffect } from 'react';
import Pusher from 'pusher-js';
import type { Kudo } from '@/types';

const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY!;
const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER!;

let pusherInstance: Pusher | null = null;

/**
 * Initialize Pusher instance (singleton pattern).
 */
function getPusherInstance(): Pusher {
  if (!pusherInstance) {
    pusherInstance = new Pusher(pusherKey, {
      cluster: pusherCluster,
    });
  }
  return pusherInstance;
}

/**
 * Hook to subscribe to new kudos for a specific user.
 * 
 * @param userId - The user ID to subscribe to
 * @param onNewKudo - Callback function when a new kudo is received
 */
export function usePusherKudos(
  userId: number | undefined,
  onNewKudo: (kudo: Kudo) => void
) {
  useEffect(() => {
    if (!userId) return;

    const pusher = getPusherInstance();
    const channel = pusher.subscribe(`user-${userId}`);

    // Listen for new kudos
    channel.bind('new-kudo', (data: Kudo) => {
      onNewKudo(data);
    });

    // Cleanup on unmount
    return () => {
      channel.unbind('new-kudo');
      pusher.unsubscribe(`user-${userId}`);
    };
  }, [userId, onNewKudo]);
}
