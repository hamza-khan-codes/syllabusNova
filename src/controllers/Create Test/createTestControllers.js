import {
  addTest,
  setQuestion,
  setQuestions,
} from "@/services/firestoreService";

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
      throw new Error("Please Enter Test ID - setQuestionsController");

    if (!questions)
      throw new Error("Please enter question- setQuestionsController");

    await setQuestions(testId, questions);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
