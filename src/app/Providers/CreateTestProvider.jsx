import CreateTestInitial from "@/components/CreateTest/CreateTestInitial"
import { getTestController } from "@/controllers/Create Test/createTestControllers"
import { getQuizMetaDataController, getQuizQuestionsController } from "@/controllers/Quiz/QuizControllers"
import createTestInitialState from "@/features/CreateTest/createTestInitialState"
import { updateCreateTest } from "@/features/CreateTest/createTestSlices"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Outlet, useParams } from "react-router-dom"


export default function CreateTestProvider({ children }) {
    const { testId } = useParams()
    const [test, setTest] = useState(null)
    const dispatch = useDispatch()
    console.log("Test ID", testId)
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                let q = createTestInitialState.questions
                const res = await getQuizMetaDataController(testId)
                const questions = await getQuizQuestionsController(testId)
                console.log("Firebase Question :: ", questions)
                console.log("Firebase test :: ", res)
                if (questions) {
                    q = questions.map((Q) =>({
                        ...Q,
                        createdAt: questions?.createdAt?.toDate().toISOString(),
                        updatedAt: questions?.updatedAt?.toDate().toISOString()
                    }))
                }
                setTest({...res,questions:q})
            } catch (error) {
                console.error(error);
                
            }
        }

        if (testId) fetchData()


        console.log("Test ID", testId)
        console.log("New CreateTest Data :", test)

    }, [testId])

    useEffect(() => {
        if (test) {
            console.log("Test ::", test)

            dispatch(updateCreateTest({
                ...test,
                createdAt: test?.createdAt?.toDate().toISOString(),
                updatedAt: test?.updatedAt?.toDate().toISOString(),
            }))
        }

    }, [test, dispatch])

    console.log("New CreateTest Data laja:", test)

    return <Outlet />


}
