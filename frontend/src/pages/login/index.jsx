import UserLayout from "@/layout/UserLayout/UserLayout";
import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  registerUser,
} from "../../../config/redux/action/authAction";
import { emptyMessage } from "../../../config/redux/reducer/authReducer";

function LoginComponent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoginMethod, setIsLoginMethod] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (authState.loggedIn) {
      router.push("/dashboard");
    }
  }, [authState.loggedIn]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/dashboard");
    }
  }, []);

  useEffect(() => {
    dispatch(emptyMessage());
  }, [isLoginMethod]);

  const handleRegister = () => {
    dispatch(registerUser({ name, username, email, password }));
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <UserLayout>
        <div className={styles.container}>
          <div className={styles.cardContainer}>
            <div className={styles.cardContainer_left}>
              <p className={styles.cardContainer_left_heading}>
                {isLoginMethod ? "Sign In" : "Sign Up"}
              </p>

              <div className={styles.inputContainer}>
                <div
                  className={styles.inputRow}
                  style={isLoginMethod ? { display: "none" } : { display: "" }}
                >
                  <input
                    className={styles.inputField}
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <input
                    className={styles.inputField}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div className={styles.inputColumn}>
                  <input
                    style={{ marginBottom: 16 }}
                    className={styles.inputField}
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <input
                    className={styles.inputField}
                    type="password"
                    s
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <p style={{ color: authState.isError ? "red" : "#534ab7" }}>
                  {authState.message}
                </p>
                <div
                  onClick={() => {
                    if (isLoginMethod) {
                      handleLogin();
                    } else {
                      handleRegister();
                    }
                  }}
                  className={styles.buttonWithOutline}
                >
                  <p>{isLoginMethod ? "Sign In" : "Sign Up"}</p>
                </div>
              </div>
            </div>
            <div className={styles.cardContainer_right}>
              <div>
                <img
                  className={styles.loginImage}
                  src={
                    isLoginMethod
                      ? "images/Mobile login-cuate.svg"
                      : "images/Sign up-pana.svg"
                  }
                  alt=""
                />
              </div>
              <div className={styles.loginSetupContainer}>
                <div className={styles.loginSetup}>
                  {!isLoginMethod ? (
                    <p>
                      Already have an account ?{" "}
                      <span
                        onClick={() => {
                          setIsLoginMethod(!isLoginMethod);
                        }}
                        className={styles.loginSetupButton}
                      >
                        Login
                      </span>
                    </p>
                  ) : (
                    <p>
                      Don't have an account ?{" "}
                      <span
                        onClick={() => {
                          setIsLoginMethod(!isLoginMethod);
                        }}
                        className={styles.loginSetupButton}
                      >
                        Register
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
}

export default LoginComponent;
