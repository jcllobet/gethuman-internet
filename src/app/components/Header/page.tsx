"use client";
import React, { useState } from "react";

import Link from "next/link";
function NavBar() {
  const [click, setClick] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            WebAuthn
            <i className="fas fa-code"></i>
          </Link>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link href="/" className="nav-links">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-links">
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
