import {
  addTest,
  getData,
  setQuestion,
  setQuestions,
  updateTest,
} from "@/services/firestoreService";
import { getQuizMetaDataController, getQuizQuestionsController } from "../Quiz/QuizControllers";
import { toast } from "sonner";

export async function addTestController(testData) {
  try {
    if (!testData)
      throw new Error("Please Enter Test Data - addTestController");

    if (!testData.length === 5)
      throw new Error("Please enter all feilds - addTestController", testData);


    return await addTest(testData);
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateTestController(testId, updatedData) {
  try {
    if (!testId || !updatedData) throw new Error("TestID and updatedData are required.");
    await updateTest(testId, updatedData)
  } catch (error) {
    console.error(error);
  }
}

export async function getTestController(testId) { // This Function is unuse
  try {
    if (!testId) throw new Error("Test ID is required.");
    const metaData = await getQuizMetaDataController(testId);

    return metaData
  } catch (error) {
    console.error(error);
  }
}

export async function setQuestionController(testId, question) {
  try {
    if (!testId)
      throw new Error("Please Enter Test ID - setQuestionController");

    if (!question)
      throw new Error("Please enter question- setQuestionController");

    await setQuestion(testId, question);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function setQuestionsController(testId, questions) {
  try {
    if (!testId)
      throw new Error("Please Enter Test ID :: setQuestionsController");

    if (!questions)
      throw new Error("Please enter question :: setQuestionsController");

    await setQuestions(testId, questions);
    return true;
  } catch (error) {
    console.error(error);
    toast.error("Error ! : ",error)
    return false;
  }
}
