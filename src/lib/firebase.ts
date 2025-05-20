import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc as firestoreDoc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  update,
} from 'firebase/database';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAeuemszrpB7QVPsTuTmp3CI6-X5MDtFqE",
  authDomain: "claw-f0b1d.firebaseapp.com",
  databaseURL: "https://claw-f0b1d-default-rtdb.firebaseio.com",
  projectId: "claw-f0b1d",
  storageBucket: "claw-f0b1d.appspot.com",
  messagingSenderId: "176904127690",
  appId: "1:176904127690:web:37f6f50dcf7446dbe9e033",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const database = getDatabase(app);

// Interfaces
export interface User {
  id: string;
  email: string;
  discordUsername: string;
  discordID: string;
  verified: boolean;
  createdAt: any;
}

// -------------------- REPORT FUNCTIONS (Firestore + Realtime DB for status) --------------------

/**
 * Submit a user report (stored in Firestore)
 */
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
    // Save report in Firestore
    const docRef = await addDoc(collection(firestore, 'userReports'), {
      reporterEmail,
      reporterDiscordId,
      targetUsername,
      targetDiscordId,
      serverName,
      serverId,
      description,
      screenshotUrl: screenshotUrl || null,
      status: 'open',
      createdAt: Timestamp.now(),
      closedAt: null,
      type: 'user',
    });

    // Initialize status in Realtime DB for quick status updates
    const statusRef = ref(database, `reportStatus/user/${docRef.id}`);
    await set(statusRef, { status: 'open' });

    return { success: true, reportId: docRef.id };
  } catch (error) {
    return { success: false, error };
  }
};

/**
 * Submit a bug report (stored in Firestore)
 */
const submitBugReport = async (
  reporterEmail: string,
  reporterDiscordId: string,
  description: string,
  stepsToReproduce: string,
  screenshotUrl?: string
) => {
  try {
    // Save report in Firestore
    const docRef = await addDoc(collection(firestore, 'bugReports'), {
      reporterEmail,
      reporterDiscordId,
      description,
      stepsToReproduce,
      screenshotUrl: screenshotUrl || null,
      status: 'open',
      createdAt: Timestamp.now(),
      closedAt: null,
      type: 'bug',
    });

    // Initialize status in Realtime DB for quick status updates
    const statusRef = ref(database, `reportStatus/bug/${docRef.id}`);
    await set(statusRef, { status: 'open' });

    return { success: true, reportId: docRef.id };
  } catch (error) {
    return { success: false, error };
  }
};

/**
 * Get all reports combined from Firestore
 */
const getAllReports = async (): Promise<any[]> => {
  try {
    const userSnapshot = await getDocs(collection(firestore, 'userReports'));
    const bugSnapshot = await getDocs(collection(firestore, 'bugReports'));

    const userReports = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const bugReports = bugSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const allReports = [...userReports, ...bugReports];
    allReports.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

    return allReports;
  } catch (error) {
    return [];
  }
};

/**
 * Update report status in Realtime DB and Firestore
 * Status can be 'open', 'resolved', or 'closed'.
 * When status = 'closed', saves closedAt timestamp in Firestore.
 */
const updateReportStatus = async (
  reportId: string,
  reportType: 'user' | 'bug',
  status: 'open' | 'resolved' | 'closed'
) => {
  try {
    // Update status in Realtime DB
    const statusRef = ref(database, `reportStatus/${reportType}/${reportId}`);
    await update(statusRef, { status });

    // Update Firestore report document
    const reportDocRef = firestoreDoc(firestore, `${reportType}Reports`, reportId);

    const updateData: any = { status };
    if (status === 'closed') {
      updateData.closedAt = Timestamp.now();
    } else {
      updateData.closedAt = null;
    }

    await updateDoc(reportDocRef, updateData);

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

// -------------------- FEEDBACK (Firestore) --------------------

const submitFeedback = async (
  name: string,
  email: string,
  message: string
) => {
  try {
    await addDoc(collection(firestore, 'feedback'), {
      name,
      email,
      message,
      createdAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return { success: false, error };
  }
};

// -------------------- BOT STATUS (Realtime DB) --------------------

const botStatusRef = ref(database, 'botStatus');

// -------------------- EXPORTS --------------------

export {
  firestore,
  database,
  submitUserReport,
  submitBugReport,
  getAllReports,
  updateReportStatus,
  submitFeedback,
  botStatusRef,
  onValue,
  update,
};
