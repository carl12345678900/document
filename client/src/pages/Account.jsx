/* import { useState } from "react"; */
import { SignIn } from "../components/SignIn"; /* 
import { SignUp } from "../components/SignUp"; */
import { Link } from "react-router";
import "../index.css";

export function Account() {
  /* 
  const [isSignIn, setIsSignIn] = useState(true); */

  return (
    <div className="container">
      <div className="shape">
        <h4>
          <img src="/logo.svg" /> NotesHub
        </h4>
        <div>
          <img src="/hero.svg" />
          <div>
            <h1>
              Your
              <span> Notes Are Waiting...</span>
              {/*   {isSignIn ? (
                <>
                  Your
                  <span> Notes Are Waiting...</span>
                </>
              ) : (
                <>
                  Join
                  <span> NotesHub!</span>
                </>
              )}
            */}
            </h1>

            <p>
              Sign in to manage your personal notes and stay productive every
              day.
              {/*  {isSignIn
                ? "Sign in to manage your personal notes and stay productive every day."
                : "Create an account to keep your notes accessible wherever you go."} */}
            </p>
          </div>
        </div>
      </div>

      <div className="form-container">
        {/* sign in form */}
        <div>
          {" "}
          <SignIn />
          {/*  {isSignIn ? (
            <SignIn />
          ) : (
            <SignUp setIsSignIn={setIsSignIn} isSignIn={isSignIn} />
          )} */}
          <div>
            <p>
              {/*  {isSignIn
                ? "Dont have an account yet?"
                : "Already have an account?"} */}
              Forgot password?
              <Link to={"/account/forgotpassword"}> Click here!</Link>
            </p>

            {/* <button className="sign-btn" onClick={() => setIsSignIn(!isSignIn)}>
              Sign In
                {isSignIn ? "Sign Up" : "Sign In"}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
