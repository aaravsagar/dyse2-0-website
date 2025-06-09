'use client';

import { useEffect, useState, useRef } from "react";
import { CheckCircle2, XCircle, Activity, Users, Zap, Clock } from "lucide-react";
import { botStatusRef, firestore, onValue } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export function StatusPage() {
  const [isBotOnline, setIsBotOnline] = useState<boolean | null>(null);
  const [serverCount, setServerCount] = useState<number | null>(null);
  const [uptimeSeconds, setUptimeSeconds] = useState<number>(0);
  const [offlineSince, setOfflineSince] = useState<Date | null>(null);
  const intervalRef = useRef<number | null>(null);

  const prevUptimeRef = useRef<number>(0);
  const lastUpdatedRef = useRef<Date>(new Date());

  // Listen for bot status from Realtime DB
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
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, []);

  // Fetch server count from Firestore
  useEffect(() => {
    async function fetchServerCount() {
      const docRef = doc(firestore, "botStats", "serverCount");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
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

  // Detect when uptimeSeconds changes and update tracking
  useEffect(() => {
    if (uptimeSeconds !== prevUptimeRef.current) {
      prevUptimeRef.current = uptimeSeconds;
      lastUpdatedRef.current = new Date();
      setOfflineSince(null);
      setIsBotOnline(true);
    }
  }, [uptimeSeconds]);

  // Watch every second, and if no change for 2 mins, mark offline
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

  // Format duration since bot went offline
  const formatOfflineDuration = () => {
    if (!offlineSince) return null;
    const diff = Math.floor((new Date().getTime() - offlineSince.getTime()) / 1000);
    const mins = Math.floor(diff / 60);
    const secs = diff % 60;
    return `${mins}m ${secs}s`;
  };

  // Format uptime
  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (days > 0) return `${days}d ${hours}h ${mins}m`;
    if (hours > 0) return `${hours}h ${mins}m ${secs}s`;
    return `${mins}m ${secs}s`;
  };

  const stats = [
    {
      label: 'Server Count',
      value: serverCount !== null ? serverCount.toLocaleString() : 'Loading...',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Uptime',
      value: formatUptime(uptimeSeconds),
      icon: Clock,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Performance',
      value: isBotOnline ? 'Optimal' : 'Degraded',
      icon: Zap,
      color: isBotOnline ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">DYSE 2.0 Status</h1>
        <p className="text-xl text-gray-400">Real-time monitoring of bot performance and availability</p>
      </motion.div>

      {/* Main Status Card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <Card className={`enhanced-card p-8 border-2 transition-all duration-300 ${
          isBotOnline 
            ? 'border-green-500/30 bg-gradient-to-r from-green-500/10 to-green-600/5' 
            : 'border-red-500/30 bg-gradient-to-r from-red-500/10 to-red-600/5'
        }`}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              {isBotOnline ? (
                <div className="relative">
                  <CheckCircle2 className="text-green-500 w-16 h-16" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full animate-pulse" />
                </div>
              ) : (
                <XCircle className="text-red-500 w-16 h-16" />
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h2 className="text-3xl font-bold">
                  Bot is {isBotOnline ? 'Online' : 'Offline'}
                </h2>
                <Badge 
                  className={`text-sm px-3 py-1 ${
                    isBotOnline 
                      ? 'bg-green-600 text-white' 
                      : 'bg-red-600 text-white'
                  }`}
                >
                  {isBotOnline ? 'Operational' : 'Down'}
                </Badge>
              </div>
              
              {isBotOnline && (
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <Activity className="w-5 h-5" />
                  <span className="font-medium">All systems operational</span>
                </div>
              )}
              
              {!isBotOnline && offlineSince && (
                <div className="text-red-400 mb-2">
                  <p className="font-medium">
                    Bot has been offline since{" "}
                    {offlineSince.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })}
                  </p>
                  <p className="text-sm">
                    Duration: {formatOfflineDuration()}
                  </p>
                </div>
              )}
              
              <p className="text-gray-400">
                Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
          >
            <Card className="enhanced-card p-6 hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-2xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-8"
      >
        <Card className="enhanced-card p-6">
          <h3 className="text-xl font-bold mb-4 text-white">System Information</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Monitoring Interval:</span>
              <span className="text-white ml-2">Real-time</span>
            </div>
            <div>
              <span className="text-gray-400">Data Source:</span>
              <span className="text-white ml-2">Firebase Realtime Database</span>
            </div>
            <div>
              <span className="text-gray-400">Update Frequency:</span>
              <span className="text-white ml-2">Every second</span>
            </div>
            <div>
              <span className="text-gray-400">Offline Threshold:</span>
              <span className="text-white ml-2">2 minutes</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}