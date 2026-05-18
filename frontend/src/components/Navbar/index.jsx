import React from "react";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../../config/redux/reducer/authReducer";

function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.auth);

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.navbarLogoContainer}>
            <img
              onClick={() => {
                router.push("/");
              }}
              src="images/quibe-logo-tagline-horizontal.svg"
              alt="navbarLogo"
              className={styles.navbarLogoImage}
            />
          </div>
          <div className={styles.navbarOptionContainer}>
            {!authState.profileFetched && (
              <>
                {" "}
                <div
                  onClick={() => {
                    router.push("/login");
                  }}
                  className={styles.buttonJoin}
                >
                  Login
                </div>
              </>
            )}

            {authState.profileFetched && (
              <>
                <div className={styles.navbarUserDetailsContainer}>
                  <p>Hello , {authState.user?.userId?.name}</p>
                  <p
                    style={{ fontWeight: "bold", cursor: "pointer" }}
                    className={styles.userProfileButton}
                  >
                   My Profile
                  </p>
                  <p
                    style={{ fontWeight: "bold", cursor: "pointer" }}
                    className={styles.userProfileButton}
                    onClick={() => {
                      localStorage.removeItem("token");
                      router.push("/login");
                      dispatch(reset())
                    }}
                  >
                    Logout
                  </p>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
