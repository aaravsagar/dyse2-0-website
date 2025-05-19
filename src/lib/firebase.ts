import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  Timestamp,
  updateDoc,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { 
  getDatabase, 
  ref, 
  set, 
  onValue, 
  push, 
  update,
  DatabaseReference
} from 'firebase/database';

// Your web app's Firebase configuration
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

export interface User {
  id: string;
  email: string;
  discordUsername: string;
  discordID: string;
  verified: boolean;
  createdAt: any;
}

// User management functions
const registerUser = async (email: string, discordUsername: string, discordID: string) => {
  try {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return { success: false, error: "User already exists" };
    }
    
    const userDoc = doc(usersRef);
    const userData: User = {
      id: userDoc.id,
      email,
      discordUsername,
      discordID,
      verified: false,
      createdAt: Timestamp.now()
    };
    
    await setDoc(userDoc, userData);
    return { success: true, user: userData };
  } catch (error) {
    return { success: false, error };
  }
};

const loginUser = async (email: string) => {
  try {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return { success: false, error: "User not found" };
    }
    
    const userData = {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data()
    } as User;
    
    return { success: true, user: userData };
  } catch (error) {
    return { success: false, error };
  }
};

const logoutUser = async () => {
  try {
    localStorage.removeItem('user');
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

const getUserData = async (userId: string) => {
  try {
    const docRef = doc(firestore, "users", userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const userData = {
        id: docSnap.id,
        ...docSnap.data()
      } as User;
      return { success: true, userData };
    } else {
      return { success: false, error: "User data not found" };
    }
  } catch (error) {
    return { success: false, error };
  }
};

const checkIsAdmin = async (userId: string) => {
  try {
    const userData = await getUserData(userId);
    if (userData.success && userData.userData) {
      return userData.userData.discordID === "746215033502957650";
    }
    return false;
  } catch (error) {
    return false;
  }
};

// Real-time Database functions
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
    const reportsRef = ref(database, 'reports/users');
    const newReportRef = push(reportsRef);
    
    await set(newReportRef, {
      reporterEmail,
      reporterDiscordId,
      targetUsername,
      targetDiscordId,
      serverName,
      serverId,
      description,
      screenshotUrl: screenshotUrl || null,
      status: 'open',
      createdAt: new Date().toISOString(),
      type: 'user'
    });
    
    return { success: true, reportId: newReportRef.key };
  } catch (error) {
    return { success: false, error };
  }
};

const submitBugReport = async (
  reporterEmail: string,
  reporterDiscordId: string,
  description: string,
  stepsToReproduce: string,
  screenshotUrl?: string
) => {
  try {
    const reportsRef = ref(database, 'reports/bugs');
    const newReportRef = push(reportsRef);
    
    await set(newReportRef, {
      reporterEmail,
      reporterDiscordId,
      description,
      stepsToReproduce,
      screenshotUrl: screenshotUrl || null,
      status: 'open',
      createdAt: new Date().toISOString(),
      type: 'bug'
    });
    
    return { success: true, reportId: newReportRef.key };
  } catch (error) {
    return { success: false, error };
  }
};

const getAllReports = (callback: (reports: any[]) => void) => {
  const userReportsRef = ref(database, 'reports/users');
  const bugReportsRef = ref(database, 'reports/bugs');
  
  let allReports: any[] = [];
  let userReportsLoaded = false;
  let bugReportsLoaded = false;
  
  const checkComplete = () => {
    if (userReportsLoaded && bugReportsLoaded) {
      // Sort by date, newest first
      allReports.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      callback(allReports);
    }
  };
  
  onValue(userReportsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const reportsList = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...(value as object)
      }));
      allReports = [...allReports.filter(r => r.type !== 'user'), ...reportsList];
    }
    userReportsLoaded = true;
    checkComplete();
  });
  
  onValue(bugReportsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const reportsList = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...(value as object)
      }));
      allReports = [...allReports.filter(r => r.type !== 'bug'), ...reportsList];
    }
    bugReportsLoaded = true;
    checkComplete();
  });
  
  return () => {
    // Return unsubscribe function if needed
  };
};

const updateReportStatus = async (reportId: string, reportType: 'user' | 'bug', status: 'open' | 'resolved') => {
  try {
    const reportRef = ref(database, `reports/${reportType}s/${reportId}`);
    await update(reportRef, { status });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

// Bot status
const botStatusRef = ref(database, 'botStatus');

// Export all functions and references
export {
  firestore,
  database,
  registerUser,
  loginUser,
  logoutUser,
  getUserData,
  checkIsAdmin,
  submitUserReport,
  submitBugReport,
  getAllReports,
  updateReportStatus,
  botStatusRef,
  onValue,
  update,
  User
};