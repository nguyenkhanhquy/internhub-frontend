import { useDispatch, useSelector } from "react-redux";
import { selectManufacturerCount } from "@/store/manufacturerData/manufacturerSelectors";
import { downCount, upCount } from "@/store/manufacturerData/manufacturerActions";
import { Button } from "@mui/material";

const ReduxToolkitPage = () => {
    const count = useSelector(selectManufacturerCount);
    const dispatch = useDispatch();

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
