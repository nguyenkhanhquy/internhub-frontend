import { useDispatch, useSelector } from "react-redux";
import { selectCount } from "@/store/manufacturerData/manufacturerSelectors";
import { downCount, upCount } from "@/store/manufacturerData/manufacturerActions";
import { Button } from "@mui/material";

const ReduxToolkitPage = () => {
    const dispatch = useDispatch();
    const count = useSelector(selectCount);

    return (
        <div className="p-4 text-center">
            <h1 className="font-bold">Redux Toolkit Page</h1>
            <p>Count: {count}</p>
            <Button onClick={() => dispatch(upCount())}>Up</Button>
            <Button onClick={() => dispatch(downCount())}>Down</Button>
        </div>
    );
};

export default ReduxToolkitPage;
