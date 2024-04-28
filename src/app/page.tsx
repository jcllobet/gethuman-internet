import React from "react";
import Layout from "./components/Layout";
import { WebAuthPage } from "./webAuthn/page";

export default function Home() {
  return (
    <Layout>
      <WebAuthPage />
    </Layout>
  );
}
