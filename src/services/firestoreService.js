import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { authState } from "./authService";
import { useSelector } from "react-redux";
import { authStateController } from "@/controllers/authControllers";

// SET ===== =>

// Create a new Test
export const addTest = async (testData) => {
  const testRef = await addDoc(collection(db, "tests"), {
    ...testData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return testRef;
};

// Add Result
export const addResult = async (resultData) => {
  const testRef = await addDoc(collection(db, "results"), {
    ...resultData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return testRef;
};

// Set Single Question
export const setQuestion = async (testId, question) => {
  await setDoc(doc(db, "tests", testId, "questions", question.questionId), {
    ...question,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

// Save multiple questions
export const setQuestions = async (testId, questions) => {
  const promises = questions.map((question) => setQuestion(testId, question));

  await Promise.all(promises);
};

// Create new user
export const setNewUser = async (user, uid) => {
  await setDoc(doc(db, "users", uid), {
    ...user,
    uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

// ======= GET ======= =>

// get all Data
export const getAllData = async (name) => {
  const querySnapshot = await getDocs(collection(db, name));

  const data = querySnapshot.docs.map((doc) => {
    return {
      ID: doc.id,
      DATA: doc.data(),
    };
  });
  return data;
};

// get Data
export const getData = async (name, id) => {
  const docRef = doc(db, name, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log(docSnap.data());
    return docSnap.data();
  }
  throw new Error("Data is not exists.! - getData :: service");
};

// get sub Data
export const getSubData = async (name, id, subName) => {
  const collectionRef = collection(db, name, id, subName);

  const querySnapshot = await getDocs(collectionRef);

  if (!querySnapshot.empty) {
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
  return null
};

// get single result
export const getResult = async (id) => {
  const testRef = doc(db, "results", id);
  const snapShort = await getDoc(testRef);
  if (snapShort.exists()) {
    console.log(snapShort.data());
    return snapShort.data();
  }
  throw new Error("Data does not exist.! - getResult :: service");
};

// get all Result
export const getAllResult = async () => {
  const snapshot = await getDocs(collection(db, "results"));

  const results = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(results);

  if (results.length === 0) {
    throw new Error("Data does not exist.! - getAllResult :: service");
  }

  return results;
};

// get User's results
export async function getUserResults(uid) {
  const q = query(
    collection(db, "results"),
    where("user.uid", "==", uid)
  );

  const snapshot = await getDocs(q);

  const results = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return results

}

export const getCurrentUser = async () => {
  return new Promise((resolve, reject) => {
    try {

      authStateController(async (User) => {
        const currentUser = await getDBCurrentUser()

        const USER = User
          ? {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.name,
            emailVerified: User.emailVerified,
            User: currentUser,
            createdAt: currentUser.createdAt?.toMillis(),
            updatedAt: currentUser.updatedAt?.toMillis(),

          }
          : null;
        resolve(USER)
      });
    } catch (error) {
      reject(error)
    }
  })
}

// get Current user 
export async function getDBCurrentUser() {

  return new Promise((resolve, reject) => {
    authState(async (User) => {
      try {
        if (!User) {
          resolve(null);
          return;
        }

        const userDoc = await getDoc(
          doc(db, "users", User.uid)
        );

        if (userDoc.exists()) {
          resolve(userDoc.data());
          return;
        }

        resolve(null);
      } catch (error) {
        console.error(error);

        reject(null);
      }
    });
  });
}

// Get All questions from all test

export const getAllQuestionsFromAllTests = async () => {
  const questionsRef = collectionGroup(db, "questions");
  const snapshot = await getDocs(questionsRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    testId: doc.ref.parent.parent?.id,
    ...doc.data(),
  }));
};






// ===================== Remove/

export async function deleteAllResults() {
  try {
    const resultsRef = collection(db, "results");
    const snapshot = await getDocs(resultsRef);

    const batch = writeBatch(db);

    snapshot.forEach((docSnap) => {
      batch.delete(docSnap.ref);
    });

    await batch.commit();

    console.log("All results deleted successfully!");
  } catch (error) {
    console.error("Error deleting results:", error);
  }
}

// ========================= Update

// Update User 
export async function updateUser(uid, update) {
  await updateDoc(doc(db, "users", uid), { ...update, updatedAt: new Date(), })
}

// Update Data
export async function updateTest(id, update) {
  const refTest = doc(db, "tests", id)
  await updateDoc(refTest, {
    ...update,
    updatedAt: serverTimestamp(),
  })
}
