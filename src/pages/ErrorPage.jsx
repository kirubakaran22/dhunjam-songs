import { Link, useRouteError } from "react-router-dom";

import "./ErrorPage.css";

function ErrorPage() {
  const error = useRouteError();
  const title = "Something Went Wrong";
  let message = "Unable to Process at the moment. Please try again Later";
  if (error.info) {
    message = error.info;
  }
  return (
    <main className="main">
      <div className="container error">
        <h1 className="header">{title}</h1>
        <p>{message}</p>

        <Link
          to={`${
            error.info === "An error occurred while Logging In"
              ? "/"
              : "/dashboard"
          }`}
        >
          <button className="errorButton">
            {error.info === "An error occurred while Logging In"
              ? "Retry"
              : "Back to DashBoard"}
          </button>
        </Link>
      </div>
    </main>
  );
}

export default ErrorPage;
