/**
 * Dashboard Page
 * 
 * Main application page where users can:
 * - See their remaining kudos
 * - View kudos they've received
 * - Give kudos to teammates
 * - View their organization info
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { usePusherKudos } from '@/hooks/usePusher';
import { getReceivedKudos, getSentKudos, getRemainingKudos, getOrganizationUsers } from '@/lib/api';
import type { Kudo, User } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, LogOut, Users, Award } from 'lucide-react';
import GiveKudosModal from '@/components/GiveKudosModal';
import KudosCard from '@/components/KudosCard';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const { user, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const [kudos, setKudos] = useState<Kudo[]>([]);
  const [sentKudos, setSentKudos] = useState<Kudo[]>([]);
  const [remainingKudos, setRemainingKudos] = useState<number | null>(null);
  const [orgUsers, setOrgUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  // Load dashboard data
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        const [kudosData, sentKudosData, remainingData, usersData] = await Promise.all([
          getReceivedKudos(),
          getSentKudos(),
          getRemainingKudos(),
          getOrganizationUsers(),
        ]);

        // Check which kudos are within 2 minutes and update is_new flag
        const now = new Date().getTime();
        const twoMinutes = 2 * 60 * 1000; // 2 minutes in milliseconds
        
        const processedKudos = kudosData.results.map((kudo) => {
          const kudoTime = new Date(kudo.created_at).getTime();
          const isWithinTwoMinutes = (now - kudoTime) < twoMinutes;
          return { ...kudo, is_new: kudo.is_new && isWithinTwoMinutes };
        });

        setKudos(processedKudos);
        setSentKudos(sentKudosData.results);
        setRemainingKudos(remainingData.remaining_kudos);
        setOrgUsers(usersData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Auto-clear is_new flag after 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const twoMinutes = 2 * 60 * 1000;
      
      setKudos((prevKudos) =>
        prevKudos.map((kudo) => {
          const kudoTime = new Date(kudo.created_at).getTime();
          const isWithinTwoMinutes = (now - kudoTime) < twoMinutes;
          return { ...kudo, is_new: kudo.is_new && isWithinTwoMinutes };
        })
      );
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle new kudos from Pusher
  const handleNewKudo = useCallback((newKudo: Kudo) => {
    // Mark as new when received via Pusher
    setKudos((prevKudos) => [{ ...newKudo, is_new: true }, ...prevKudos]);
    toast.success(`New kudos from ${newKudo.from_user.first_name || newKudo.from_user.username}!`);
  }, []);

  // Subscribe to Pusher for real-time updates
  usePusherKudos(user?.id, handleNewKudo);

  // Refresh data after giving kudos
  const handleKudosGiven = async () => {
    try {
      const [kudosData, sentKudosData, remainingData] = await Promise.all([
        getReceivedKudos(),
        getSentKudos(),
        getRemainingKudos(),
      ]);

      // Check which kudos are within 2 minutes and update is_new flag
      const now = new Date().getTime();
      const twoMinutes = 2 * 60 * 1000;
      
      const processedKudos = kudosData.results.map((kudo) => {
        const kudoTime = new Date(kudo.created_at).getTime();
        const isWithinTwoMinutes = (now - kudoTime) < twoMinutes;
        return { ...kudo, is_new: kudo.is_new && isWithinTwoMinutes };
      });

      setKudos(processedKudos);
      setSentKudos(sentKudosData.results);
      setRemainingKudos(remainingData.remaining_kudos);
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  };

  if (authLoading || loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Kudos</h1>
                <p className="text-sm text-gray-600">{user.organization.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {user.first_name || user.username} {user.last_name || ''} <small>({user.username})</small>
                </p>
                <p className="text-xs text-gray-500">
                  {remainingKudos !== null && (
                    <>{remainingKudos} kudos remaining</>
                  )}
                </p>
              </div>
              <Button onClick={logout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Stats and Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Remaining Kudos Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-primary" />
                  Your Kudos
                </CardTitle>
                <CardDescription>This week's allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {remainingKudos !== null ? remainingKudos : '—'}
                  </div>
                  <p className="text-sm text-gray-600">
                    {remainingKudos === 1 ? 'kudo' : 'kudos'} remaining
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Give Kudos Button - Primary CTA */}
            <Button
              onClick={() => setModalOpen(true)}
              className="w-full h-14 text-lg"
              disabled={remainingKudos === 0}
            >
              <Heart className="w-5 h-5 mr-2" />
              Give Kudos
            </Button>

            {remainingKudos === 0 && (
              <p className="text-sm text-center text-gray-600">
                You've used all your kudos this week. New kudos arrive Monday!
              </p>
            )}

            {/* Organization Users */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <Users className="w-4 h-4 mr-2" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-900">{orgUsers.length}</p>
                <p className="text-sm text-gray-600">colleagues in your organization</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Received Kudos */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kudos You've Received</CardTitle>
                <CardDescription>
                  Recognition from your teammates
                </CardDescription>
              </CardHeader>
              <CardContent>
                {kudos.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">No kudos yet</p>
                    <p className="text-sm text-gray-500">
                      When teammates recognize your work, it will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {kudos.map((kudo) => (
                      <KudosCard key={kudo.id} kudo={kudo} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sent Kudos */}
            <Card>
              <CardHeader>
                <CardTitle>Kudos You've Sent</CardTitle>
                <CardDescription>
                  Recognition you've given to teammates
                </CardDescription>
              </CardHeader>
              <CardContent>
                {sentKudos.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">No kudos sent yet</p>
                    <p className="text-sm text-gray-500">
                      Start recognizing great work by giving kudos to your teammates
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sentKudos.map((kudo) => (
                      <KudosCard key={kudo.id} kudo={{ ...kudo, is_new: false }} sent />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Give Kudos Modal */}
      <GiveKudosModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        users={orgUsers}
        onSuccess={handleKudosGiven}
      />
    </div>
  );
}
