import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset, selectCounter } from "@/store/slices/counterSlice";

const ReduxToolkitPage = () => {
    const dispatch = useDispatch();
    const counter = useSelector(selectCounter);

    return (
        <div className="p-4 text-center">
            <h1 className="font-bold">Redux Toolkit Page</h1>
            <p>Counter: {counter}</p>
            <Button onClick={() => dispatch(increment())}>Up</Button>
            <Button onClick={() => dispatch(decrement())}>Down</Button>
            <Button onClick={() => dispatch(reset())}>Reset</Button>
        </div>
    );
};

export default ReduxToolkitPage;
