"use client";
import React from "react";

function Layout({ children }) {
  return (
    <>
      <div className="content">{children}</div>
      <style jsx>{`
        .content {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </>
  );
}

export default Layout;
