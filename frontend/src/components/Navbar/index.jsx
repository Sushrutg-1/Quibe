import React from "react";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();

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
            <div
              onClick={() => {
                router.push("/login");
              }}
              className={styles.buttonJoin}
            >
              Login
            </div>
            <div
              onClick={() => {
                router.push("/login");
              }}
              className={styles.buttonJoin}
            >
              SignUp
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
