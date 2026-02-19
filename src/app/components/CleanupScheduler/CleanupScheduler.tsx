"use client";

import { useEffect } from "react";

export default function CleanupScheduler() {
  useEffect(() => {
    // Run cleanup immediately once
    fetch("/api/cleanup-expired-payments");

    // Then run every 3 minutes (180,000 ms)
    const interval = setInterval(() => {
      fetch("/api/cleanup-expired-payments");
    }, 180000); // 3 minutes

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return null; // renders nothing
}
