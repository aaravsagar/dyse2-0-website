import { useEffect, useState, useRef } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { botStatusRef, firestore, onValue } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export function StatusPage() {
  const [isBotOnline, setIsBotOnline] = useState<boolean | null>(null);
  const [serverCount, setServerCount] = useState<number | null>(null);
  const [uptimeSeconds, setUptimeSeconds] = useState<number>(0);
  const [offlineSince, setOfflineSince] = useState<Date | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Fetch botStatus.online and uptimeSeconds from RTDB
  useEffect(() => {
    const unsubscribe = onValue(botStatusRef, (snapshot) => {
      const status = snapshot.val();
      if (status) {
        setIsBotOnline(Boolean(status.online));
        setUptimeSeconds(status.uptimeSeconds || 0);
      }
    });
    return () => {
      unsubscribe();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Fetch serverCount from Firestore at botStats/serverCount
  useEffect(() => {
    async function fetchServerCount() {
      const docRef = doc(firestore, "botStats", "serverCount");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Assuming the count is stored as a number field named 'count'
        if (typeof data.count === "number") {
          setServerCount(data.count);
        } else {
          setServerCount(null);
        }
      } else {
        setServerCount(null);
      }
    }
    fetchServerCount();
  }, []);

  // Track offline detection: if uptimeSeconds hasn't changed in 2 minutes => offline
  const prevUptimeRef = useRef<number>(0);
  const lastUpdatedRef = useRef<Date>(new Date());

  useEffect(() => {
    if (uptimeSeconds !== prevUptimeRef.current) {
      prevUptimeRef.current = uptimeSeconds;
      lastUpdatedRef.current = new Date();
      setOfflineSince(null); // reset offline timer
      setIsBotOnline(true);  // mark bot online on update
    }
  }, [uptimeSeconds]);

  // Check uptimeSeconds updates every second and mark offline if > 2 mins no update
useEffect(() => {
  intervalRef.current = window.setInterval(() => {
    const now = new Date();
    const diffMs = now.getTime() - lastUpdatedRef.current.getTime();
    if (diffMs > 120000) {
      if (!offlineSince) setOfflineSince(lastUpdatedRef.current);
      setIsBotOnline(false);
    } else {
      setOfflineSince(null);
    }
  }, 1000);

  return () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }
  };
}, [offlineSince]);


  // Format offline countdown (time since offline)
  const formatOfflineDuration = () => {
    if (!offlineSince) return null;
    const diff = Math.floor((new Date().getTime() - offlineSince.getTime()) / 1000);
    const mins = Math.floor(diff / 60);
    const secs = diff % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">DYSE 2.0 Status</h1>

      <div
        className={`border rounded p-4 mb-6 flex items-center space-x-4 ${
          isBotOnline ? "border-green-500" : "border-red-500"
        }`}
      >
        {isBotOnline ? (
          <CheckCircle2 className="text-green-500" size={36} />
        ) : (
          <XCircle className="text-red-500" size={36} />
        )}
        <div>
          <h2 className="text-xl font-semibold">
            Bot is {isBotOnline ? "Online" : "Offline"}
          </h2>
          {isBotOnline && (
            <p className="text-green-600 italic">
              <span className="inline-block h-2 w-2 mr-2 rounded-full border-2 border-green-500 animate-pulse" />
              All system operationals
            </p>
          )}
          {!isBotOnline && offlineSince && (
            <p className="text-red-600">
              Bot has been offline since{" "}
              {offlineSince.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })} (
              {formatOfflineDuration()} ago)
            </p>
          )}
          <p className="mt-1 text-gray-600">Uptime Seconds: {uptimeSeconds}</p>
        </div>
      </div>

      <div className="border rounded p-4">
        <h2 className="text-lg font-bold mb-2">Server Count</h2>
        {serverCount !== null ? (
          <p className="text-xl font-semibold">{serverCount}</p>
        ) : (
          <p className="text-gray-500 italic">Loading server count...</p>
        )}
      </div>
    </div>
  );
}
