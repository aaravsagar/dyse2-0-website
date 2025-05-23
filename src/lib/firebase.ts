import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  Timestamp,
  addDoc,
  updateDoc,
  doc as firestoreDoc,
} from "firebase/firestore";
import {
  getDatabase,
  ref,
  set,
  update,
  onValue as firebaseOnValue,
  DatabaseReference,
  DataSnapshot,
} from "firebase/database";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAUZbhbYqeIUIje1ajSi-99NhLz4ElHSDc",
  authDomain: "dyse2-0.firebaseapp.com",
  databaseURL: "https://dyse2-0-default-rtdb.firebaseio.com",
  projectId: "dyse2-0",
  storageBucket: "dyse2-0.firebasestorage.app",
  messagingSenderId: "157736910877",
  appId: "1:157736910877:web:c77287e43cb2fc6b6706f4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const database = getDatabase(app);

export interface Report {
  id: string;
  reporterEmail: string;
  reporterDiscordId: string;
  status: "open" | "resolved" | "closed";
  createdAt: Timestamp;
  closedAt?: Timestamp | null;
  type: "user" | "bug";
  [key: string]: any;
}

// Wrapper for onValue to properly type the snapshot parameter
export const onValue = (
  reference: DatabaseReference,
  callback: (snapshot: DataSnapshot) => void
) => {
  return firebaseOnValue(reference, callback);
};

// Submit a user report (Firestore + RTDB status)
const submitUserReport = async (
  reporterEmail: string,
  reporterDiscordId: string,
  targetUsername: string,
  targetDiscordId: string,
  serverName: string,
  serverId: string,
  description: string,
  screenshotUrl?: string
) => {
  try {
    const docRef = await addDoc(collection(firestore, "userReports"), {
      reporterEmail,
      reporterDiscordId,
      targetUsername,
      targetDiscordId,
      serverName,
      serverId,
      description,
      screenshotUrl: screenshotUrl || null,
      status: "open",
      createdAt: Timestamp.now(),
      closedAt: null,
      type: "user",
    });

    const statusRef = ref(database, `reportStatus/user/${docRef.id}`);
    await set(statusRef, { status: "open" });

    return { success: true, reportId: docRef.id };
  } catch (error) {
    return { success: false, error };
  }
};

// Submit a bug report (Firestore + RTDB status)
const submitBugReport = async (
  reporterEmail: string,
  reporterDiscordId: string,
  description: string,
  stepsToReproduce: string,
  screenshotUrl?: string
) => {
  try {
    const docRef = await addDoc(collection(firestore, "bugReports"), {
      reporterEmail,
      reporterDiscordId,
      description,
      stepsToReproduce,
      screenshotUrl: screenshotUrl || null,
      status: "open",
      createdAt: Timestamp.now(),
      closedAt: null,
      type: "bug",
    });

    const statusRef = ref(database, `reportStatus/bug/${docRef.id}`);
    await set(statusRef, { status: "open" });

    return { success: true, reportId: docRef.id };
  } catch (error) {
    return { success: false, error };
  }
};

// Get all reports from Firestore (userReports + bugReports)
const getAllReports = async (): Promise<Report[]> => {
  try {
    const userSnapshot = await getDocs(collection(firestore, "userReports"));
    const bugSnapshot = await getDocs(collection(firestore, "bugReports"));

    const userReports: Report[] = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as Report));

    const bugReports: Report[] = bugSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as Report));

    const allReports = [...userReports, ...bugReports];

    allReports.sort((a, b) => {
      return b.createdAt.seconds - a.createdAt.seconds;
    });

    return allReports;
  } catch {
    return [];
  }
};

// Update status and closedAt field for report in Firestore + RTDB
const updateReportStatus = async (
  reportId: string,
  reportType: "user" | "bug",
  status: "open" | "resolved" | "closed"
) => {
  try {
    const statusRef = ref(database, `reportStatus/${reportType}/${reportId}`);
    await update(statusRef, { status });

    const reportDocRef = firestoreDoc(firestore, `${reportType}Reports`, reportId);
    const updateData: Partial<Report> = { status };
    updateData.closedAt = status === "closed" ? Timestamp.now() : null;

    await updateDoc(reportDocRef, updateData);

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

// Submit feedback (Firestore)
const submitFeedback = async (
  name: string,
  email: string,
  message: string
) => {
  try {
    await addDoc(collection(firestore, "feedback"), {
      name,
      email,
      message,
      createdAt: Timestamp.now(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

// Bot status ref (Realtime DB)
const botStatusRef = ref(database, "botStatus");

export {
  firestore,
  database,
  submitUserReport,
  submitBugReport,
  getAllReports,
  updateReportStatus,
  submitFeedback,
  botStatusRef,
  ref,
  set,
  update,
};
