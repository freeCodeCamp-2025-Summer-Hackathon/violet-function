"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GroupsSection from "../dashboard/GroupsSection";

export default function GroupsPage() {
  const [user, setUser] = useState<{name: string, username: string, email: string} | null>(null);
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

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-black/90 text-white mt-24">
      <GroupsSection user={user} telegramStyle={true} />
    </div>
  );
} 