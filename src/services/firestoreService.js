import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

// Create a new Test
export const addTest = async (testData) => {
  const testRef = await addDoc(collection(db, "tests"), {
    ...testData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return testRef;
};

// set Single Question
export const setQuestion = async (testId, question) => {
  await setDoc(doc(db, "tests", testId, "questions", question.questionId), {
    ...question,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

// Save multiple questions
export const setQuestions = async (testId, questions) => {
  const promises = questions.map((question) =>
    setQuestion(testId, question)
  );

  await Promise.all(promises);
};
