import {
  addResult,
  getAllData,
  getData,
  getResult,
  getSubData,
  getUserResults,
} from "@/services/firestoreService";
import { useSelector } from "react-redux";


// Get ===================>

export async function getQuizzesMetaDataController() {
  try {
    const data = await getAllData("tests");
    return data;
  } catch (error) {
    console.error("Error : getQuizzesMetaDataController ", error);
    console.log("Error : Message ", error.message);
    throw new Error("Error : getQuizzesMetaDataController ", error);
  }
}

export async function getQuizMetaDataController(id) {
  try {
    if (!id) throw new Error("Id is Required");
    const data = await getData("tests", id);
    return data;
  } catch (error) {
    console.error("Error : getQuizMetaDataController ", error);
    console.log("Error : Message ", error.message);
    throw new Error("Error : getQuizMetaDataController ", error);
  }
}

export async function getQuizQuestionsController(id) {
  try {
    if (!id) throw new Error("Id is Required");
    const data = await getSubData("tests", id, "questions");
    return data;
  } catch (error) {
    console.error("Error : getQuizQuestionsController ", error);
  }
}

// get result
export async function getResultController(id) {
  try {
    if (!id) throw new Error("ID is Required");
    const data = await getResult(id);
    return data;
  } catch (error) {
    console.error("Error : getResultController ", error);
    console.log("Error : Message ", error.message);
    throw new Error("Error : getResultController ", error);
  }
}

// get User Results
export async function getUserResultsController(userID) {
  try {
    if (!userID) throw new Error("User ID Must enter");
    return await getUserResults(userID)
  } catch (error) {
    console.log(error)
  }
}


// Set =============>

export async function addResultController(resultData) {
  try {
    if (!resultData) throw new Error("Result is Required");
    const data = await addResult(resultData);
    return data;
  } catch (error) {
    console.error("Error : addResultController ", error);
    console.log("Error : Message ", error.message);
    throw new Error("Error : addResultController ", error);
  }
}


