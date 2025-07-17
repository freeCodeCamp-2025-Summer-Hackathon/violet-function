"use client";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { EllipsisVertical } from "lucide-react";

const SOCKET_URL = "http://localhost:5000";

function Toast({ message, type, onClose }: { message: string, type: "success" | "error", onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 2500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-8 left-8 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-bold ${type === "success" ? "bg-green-600" : "bg-red-500"}`}>{message}</div>
  );
}

export default function GroupsSection({ user, telegramStyle = false }: { user: { username: string }, telegramStyle?: boolean }) {
  const [groups, setGroups] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [invitations, setInvitations] = useState<any[]>([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [inviteUsername, setInviteUsername] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [joinLink, setJoinLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);
  const socketRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  // Fetch groups and invitations
  const fetchGroupsAndInvites = async () => {
    if (!user?.username) return;
    setLoading(true);
    try {
      const gRes = await fetch(`/api/groups?username=${user.username}`);
      const gData = await gRes.json();
      setGroups(gData.groups || []);
      const iRes = await fetch(`/api/invitations?username=${user.username}`);
      const iData = await iRes.json();
      setInvitations(iData.invitations || []);
    } catch (e) {
      setError("Failed to load groups or invitations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGroupsAndInvites(); }, [user]);

  // Fetch members and messages when group selected
  useEffect(() => {
    if (!selectedGroup) return;
    fetch(`/api/groups/${selectedGroup.id}/members`)
      .then(res => res.json())
      .then(data => setMembers(data.members || []));
    fetch(`/api/groups/${selectedGroup.id}/messages`)
      .then(res => res.json())
      .then(data => setMessages(data.messages || []));
  }, [selectedGroup]);

  // Socket.io for real-time chat
  useEffect(() => {
    if (!selectedGroup) return;
    if (!user?.username) return;
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    const socket = io(SOCKET_URL);
    socketRef.current = socket;
    socket.emit("join_group", { group_id: selectedGroup.id });
    socket.on("group_message", (msg: any) => {
      if (msg.group_id === selectedGroup.id) {
        setMessages((prev: any[]) => [...prev, msg]);
      }
    });
    return () => { socket.disconnect(); };
  }, [selectedGroup, user]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handlers
  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;
    setLoading(true);
    setError("");
    const res = await fetch("/api/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newGroupName, username: user.username }),
    });
    const data = await res.json();
    if (res.ok) {
      setNewGroupName("");
      fetchGroupsAndInvites();
      setToast({ message: "Group created!", type: "success" });
    } else {
      setError(data.error || "Failed to create group");
      setToast({ message: data.error || "Failed to create group", type: "error" });
    }
    setLoading(false);
  };

  const handleInvite = async () => {
    if (!inviteUsername.trim() || !selectedGroup) return;
    setLoading(true);
    setError("");
    setJoinLink(null);
    try {
      const res = await fetch(`/api/groups/${selectedGroup.id}/invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviter: user.username, invitee: inviteUsername }),
      });
      let data = null;
      try { data = await res.json(); } catch { data = { error: "Unexpected server error. Please try again." }; }
      setInviteUsername("");
      if (res.ok && data && !data.error) {
        setJoinLink(data?.join_link || null);
        setToast({ message: "Invite sent!", type: "success" });
      } else {
        setError(data?.error || "Failed to invite");
        setToast({ message: data?.error || "Failed to invite. Please check the username and try again.", type: "error" });
      }
    } catch {
      setToast({ message: "Failed to invite. Please check your connection.", type: "error" });
    }
    setLoading(false);
  };

  const handleInvitation = async (id: number, action: "accept" | "decline") => {
    setLoading(true);
    setError("");
    const res = await fetch(`/api/invitations/${id}/respond`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const data = await res.json();
    if (res.ok) {
      fetchGroupsAndInvites();
      setToast({ message: `Invitation ${action}ed!`, type: "success" });
    } else {
      setError(data.error || "Failed to respond to invitation");
      setToast({ message: data.error || "Failed to respond to invitation", type: "error" });
    }
    setLoading(false);
  };

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedGroup) return;
    socketRef.current.emit("send_group_message", {
      group_id: selectedGroup.id,
      username: user.username,
      content: newMessage,
    });
    setNewMessage("");
  };

  const handleCopy = () => {
    if (joinLink) {
      navigator.clipboard.writeText(joinLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  // Leave group
  const handleLeaveGroup = async (groupId: number) => {
    setLoading(true);
    setError("");
    const res = await fetch(`/api/groups/${groupId}/leave`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username }),
    });
    const data = await res.json();
    if (res.ok) {
      setToast({ message: "Left group!", type: "success" });
      fetchGroupsAndInvites();
      if (selectedGroup?.id === groupId) setSelectedGroup(null);
    } else {
      setError(data.error || "Failed to leave group");
      setToast({ message: data.error || "Failed to leave group", type: "error" });
    }
    setLoading(false);
  };
  // Delete group
  const handleDeleteGroup = async (groupId: number) => {
    setLoading(true);
    setError("");
    const res = await fetch(`/api/groups/${groupId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username }),
    });
    const data = await res.json();
    if (res.ok) {
      setToast({ message: "Group deleted!", type: "success" });
      fetchGroupsAndInvites();
      if (selectedGroup?.id === groupId) setSelectedGroup(null);
    } else {
      setError(data.error || "Failed to delete group");
      setToast({ message: data.error || "Failed to delete group", type: "error" });
    }
    setLoading(false);
  };

  // Filtered groups for search
  const filteredGroups = groups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex h-[80vh] w-full rounded-2xl overflow-hidden shadow-2xl bg-black/80 border border-white/10">
      {/* Left: Group List */}
      <div className="w-72 bg-black/90 border-r border-white/10 flex flex-col p-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search groups..."
          className="mb-4 px-3 py-2 rounded-lg bg-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none"
        />
        <div className="flex-1 overflow-y-auto">
          {filteredGroups.map(g => (
            <div
              key={g.id}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl mb-2 cursor-pointer transition ${selectedGroup?.id === g.id ? "bg-purple-700/60" : "hover:bg-white/10"}`}
              onClick={() => setSelectedGroup(g)}
            >
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-lg font-bold text-white">
                {g.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white/90">{g.name}</div>
                <div className="text-xs text-white/50 truncate">{g.lastMessage || "No messages yet"}</div>
              </div>
              {/* 3-dots menu */}
              <div className="relative" onClick={e => { e.stopPropagation(); setMenuOpen(menuOpen === g.id ? null : g.id); }}>
                <button className="p-1 rounded-full hover:bg-white/10">
                  <EllipsisVertical className="w-5 h-5 text-white/70" />
                </button>
                {menuOpen === g.id && (
                  <div className="absolute right-0 top-8 z-50 bg-black/95 border border-white/10 rounded-lg shadow-lg min-w-[140px]">
                    {g.owner === user.username ? (
                      <button
                        className="block w-full text-left px-4 py-2 text-red-400 hover:bg-white/10 rounded-t-lg"
                        onClick={() => { handleDeleteGroup(g.id); setMenuOpen(null); }}
                      >Delete group</button>
                    ) : (
                      <button
                        className="block w-full text-left px-4 py-2 text-red-400 hover:bg-white/10 rounded-b-lg"
                        onClick={() => { handleLeaveGroup(g.id); setMenuOpen(null); }}
                      >Leave group</button>
                    )}
                  </div>
                )}
              </div>
              {/* Unread dot placeholder */}
              <div className="w-3 h-3 rounded-full bg-green-400" style={{ opacity: 0 }} />
            </div>
          ))}
        </div>
        <form className="flex gap-2 mt-4" onSubmit={e => { e.preventDefault(); handleCreateGroup(); }}>
          <input
            type="text"
            value={newGroupName}
            onChange={e => setNewGroupName(e.target.value)}
            placeholder="New group name"
            className="flex-1 px-2 py-2 rounded bg-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <button type="submit" className="bg-purple-500 px-4 py-2 rounded text-white font-bold hover:bg-purple-600 transition">Create</button>
        </form>
      </div>
      {/* Middle: Chat */}
      <div className="flex-1 flex flex-col bg-black/85">
        {selectedGroup ? (
          <>
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-black/70 shadow-lg">
              <div>
                <div className="text-2xl font-bold text-purple-300 mb-1">{selectedGroup.name}</div>
                <div className="text-xs text-white/60">Owner: {selectedGroup.owner}</div>
                <div className="text-xs text-white/60">Members: {members.map(m => m.username).join(", ")}</div>
              </div>
              <form className="flex gap-2" onSubmit={e => { e.preventDefault(); handleInvite(); }}>
                <input
                  type="text"
                  value={inviteUsername}
                  onChange={e => setInviteUsername(e.target.value)}
                  placeholder="Invite by username"
                  className="px-2 py-2 rounded bg-white/10 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                />
                <button type="submit" className="bg-pink-500 px-4 py-2 rounded text-white font-bold hover:bg-pink-600 transition">Invite</button>
              </form>
            </div>
            <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-3" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-end gap-2 ${msg.user === user.username ? "justify-end" : "justify-start"}`}> 
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-base font-bold text-white">
                    {msg.user.slice(0, 2).toUpperCase()}
                  </div>
                  <div className={`rounded-2xl px-5 py-3 max-w-xl shadow ${msg.user === user.username ? "bg-purple-500 text-white ml-2" : "bg-white/10 text-white mr-2"}`}>
                    <span className="font-bold">{msg.user}</span>
                    <span className="ml-2">{msg.content}</span>
                    <span className="ml-2 text-xs text-white/40">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form className="flex gap-2 p-6 border-t border-white/10 bg-black/70" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-2xl bg-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <button type="submit" className="bg-purple-500 px-6 py-3 rounded-2xl text-white font-bold hover:bg-purple-600 transition">Send</button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full text-white/60">
            <span className="text-2xl mb-2">Select a group to start chatting</span>
          </div>
        )}
      </div>
      {/* Right: Group Info & Watch List */}
      <div className="w-80 bg-black/95 border-l border-white/10 flex flex-col p-6">
        {selectedGroup ? (
          <>
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center text-3xl font-bold text-white mb-2">
                {selectedGroup.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="text-xl font-bold text-white mb-1">{selectedGroup.name}</div>
              <div className="text-xs text-white/60 mb-2">Owner: {selectedGroup.owner}</div>
              <div className="text-xs text-white/60 mb-2">Members: {members.map(m => m.username).join(", ")}</div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="text-lg font-bold text-white mb-2">Watch List</div>
              <div className="flex-1 bg-white/5 rounded-lg p-4 text-white/60 flex items-center justify-center">
                <span>Movie/TV watch list placeholder</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full text-white/60">
            <span className="text-lg">Select a group to see info</span>
          </div>
        )}
      </div>
      {/* Toasts */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
} 