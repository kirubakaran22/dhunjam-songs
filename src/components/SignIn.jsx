import {
  Link,
  Form,
  redirect,
  useNavigation,
  useActionData,
} from "react-router-dom"; 

import "./Signin.css";

function Signin() {
  const navigation = useNavigation();
  const data = useActionData();
  return (
    <>
      {navigation.state === "submitting" && (
        <div className="loadingBar">
          <progress></progress>
        </div>
      )}

      <main className="main">
        <div className="container">
          <h1 className="header">Venue Admin Login</h1>
          <Form className="signInForm" method="POST">
            <input
              className={data?.usernameField ? "error" : "none"}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
            <input
              className={data?.passwordField ? "error" : "none"}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <button type="submit" id="signIn">
              Sign in
            </button>
            <Link to="/">New Registration?</Link>
          </Form>
        </div>
      </main>
    </>
  );
}

export default Signin;

export async function action({ request }) {
  const data = await request.formData();

  const enteredUserName = data.get("username");
  const enteredPassword = data.get("password");
  // Validation for empty values
  if (enteredPassword.length == 0 || enteredUserName.length == 0) {
    if (enteredPassword.length > 0) {
      return { usernameField: "This Field is Required" };
    }
    if (enteredUserName.length > 0) {
      return { passwordField: "This Field is Required" };
    }
    return {
      usernameField: "This Field is Required",
      passwordField: "This Field is Required",
    };
  }
  const loginData = {
    username: enteredUserName,
    password: enteredPassword,
  };

  const response = await fetch("https://stg.dhunjam.in/account/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    const error = new Error("Something went Wrong");
    error.info = "An error occurred while Logging In";
    throw error;
  }

  const resData = await response.json();
  console.log(resData.data);
  localStorage.setItem("id", resData.data.id);
  localStorage.setItem("token", resData.data.token);

  return redirect("/dashboard");
}
