import React from "react";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import { GrClose } from "react-icons/gr";
const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();
  return (
    <div className="goal">
      <div className="goal-date">
        {new Date(goal.createdAt).toLocaleString("en-US")}
      </div>
      <h2 className="goal-text">{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
        <GrClose style={{ fontSize: "1.4rem" }} />
      </button>
    </div>
  );
};

export default GoalItem;
