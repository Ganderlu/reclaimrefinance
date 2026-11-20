"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { collection, onSnapshot, query, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * Subscribes to Firestore so newly submitted claims appear in the dashboard
 * without a manual refresh. When the real-time listener is unavailable
 * (for example, restrictive security rules) it fails silently and the
 * server-rendered data remains authoritative.
 */
export default function LiveRefresher() {
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!db) return;

    const unsubscribe = onSnapshot(
      query(collection(db, "claims"), limit(25)),
      () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => router.refresh(), 400);
      },
      () => {
        // Ignore listener errors — server data still renders.
      },
    );

    return () => {
      unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [router]);

  return null;
}
