"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  // All hooks at the top!
  const [user, setUser] = useState<{name: string, username: string, email: string} | null>(null);
  const [invitations, setInvitations] = useState<any[]>([]);
  const [loadingInvites, setLoadingInvites] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        router.replace("/login");
      } else {
        try {
          const userObj = JSON.parse(userStr);
          setUser({ name: userObj.name, username: userObj.username, email: userObj.email });
        } catch {
          router.replace("/login");
        }
      }
    }
  }, [router]);

  // Fetch invitations
  useEffect(() => {
    if (!user?.username) return;
    setLoadingInvites(true);
    fetch(`/api/invitations?username=${user.username}`)
      .then(res => res.json())
      .then(data => setInvitations(data.invitations || []))
      .catch(() => setInviteError("Failed to load invitations"))
      .finally(() => setLoadingInvites(false));
  }, [user]);

  // Handle accept/reject
  const handleInvitation = async (id: number, action: "accept" | "decline") => {
    setLoadingInvites(true);
    setInviteError("");
    const res = await fetch(`/api/invitations/${id}/respond`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const data = await res.json();
    if (res.ok) {
      setInvitations(prev => prev.filter(inv => inv.id !== id));
    } else {
      setInviteError(data.error || "Failed to respond to invitation");
    }
    setLoadingInvites(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black/90 text-white">
      <div className="bg-black/80 p-10 rounded-2xl shadow-2xl border border-white/10 max-w-md w-full flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center text-3xl font-bold text-white mb-4">
          {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <h1 className="text-2xl font-bold mb-4">Account Details</h1>
        <div className="w-full flex flex-col gap-4 mb-8">
          <div className="flex flex-col">
            <span className="text-white/60 text-sm font-semibold">Name</span>
            <span className="text-lg font-bold text-white">{user.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white/60 text-sm font-semibold">Username</span>
            <span className="text-lg font-bold text-white">{user.username}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white/60 text-sm font-semibold">Email</span>
            <span className="text-lg font-bold text-white">{user.email}</span>
          </div>
        </div>
        {/* Invitations Section */}
        <div className="w-full mt-4">
          <h2 className="text-xl font-bold mb-2">Pending Group Invites</h2>
          {loadingInvites && <div className="text-white/60">Loading...</div>}
          {inviteError && <div className="text-red-400 mb-2">{inviteError}</div>}
          {invitations.length === 0 && !loadingInvites ? (
            <div className="text-white/60">No pending invites.</div>
          ) : (
            <ul className="space-y-3">
              {invitations.map(invite => (
                <li key={invite.id} className="bg-white/10 rounded-lg p-4 flex flex-col gap-2">
                  <div>
                    <span className="font-bold text-purple-300">{invite.group}</span> — Invited by <span className="font-semibold">{invite.inviter}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleInvitation(invite.id, "accept")} className="px-4 py-1 rounded bg-green-500 text-white font-bold hover:bg-green-600 transition">Accept</button>
                    <button onClick={() => handleInvitation(invite.id, "decline")} className="px-4 py-1 rounded bg-red-500 text-white font-bold hover:bg-red-600 transition">Reject</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 