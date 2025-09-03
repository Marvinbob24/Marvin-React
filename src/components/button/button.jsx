import { Link } from "react-router-dom";
import "./button.css";

export const Button = () => {
  return (
    <Link to="/shop">
      <button className="btn">
        <span>shop now</span>
      </button>
    </Link>
  );
};
