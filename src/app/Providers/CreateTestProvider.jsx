import { updateCreateTest } from "@/features/CreateTest/createTestSlices"
import { useDispatch } from "react-redux"


export default function CreateTestProvider({ children }) {
    const createTest = localStorage.getItem("createTest")
    const dispatch = useDispatch()
    if (createTest) {
        dispatch(updateCreateTest(JSON.parse(createTest)))
    }
    return <>{ children }
    </>
}
