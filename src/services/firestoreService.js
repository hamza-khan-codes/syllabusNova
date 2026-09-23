import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  writeBatch,
} from "firebase/firestore";

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
  throw new Error("Data does not exist.! - getSubCollectionData :: service");
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

// get user Result
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
