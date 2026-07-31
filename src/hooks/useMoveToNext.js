import { changeStepPath } from "@/features/CreateTest/createTestSlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useMoveToNext = () => {
  const createTest = useSelector((state) => state.createTest);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const moveToNext = (path, save = false, searchStep = "Questions") => {
    dispatch(changeStepPath({ searchStep: searchStep, changePath: path }));
    navigate(path);

    const updatedStepOrder = createTest.workflow.stepOrder.map((step) => {
      if (step.step === searchStep) {
        return {
          step: step.step,
          path,
        };
      }
      return step;
    });

    const update = {
      ...createTest,
      workflow: {
        ...createTest.workflow,
        stepOder: updatedStepOrder,
      },
    };

    if (save) {
      localStorage.setItem("createTest", JSON.stringify(update));
    }
  };
  return moveToNext;
};

export default useMoveToNext;
