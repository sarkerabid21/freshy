"use client";
import { useState, useEffect } from "react";

// Simple placeholder auth hook
export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Example: get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return { user };
}
