import { Link } from "react-router-dom";
import Header from "../components/Header";

function PageNotFound() {
  return (
    <div className="w-full">
      <Header />
      <div className="flex justify-around items-center flex-col h-1/4">
        <p className="text-secondary text-center font-bolder text-3xl">404</p>
        <p>
          Page not found, return to the{" "}
          <Link to={"/"} className="text-primary font-bolder underline">
            homepage
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
