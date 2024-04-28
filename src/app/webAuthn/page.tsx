"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { client, parsers } from "@passwordless-id/webauthn";
import { AuthenticationParsed } from "@passwordless-id/webauthn/dist/esm/types";

export const WebAuthPage: FC = () => {
  const [username, setUsername] = useState<string>(
    typeof window !== "undefined"
      ? window.localStorage.getItem("username") || ""
      : ""
  );

  const [isClientAvailable, setIsClientAvailable] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClientAvailable(client.isAvailable());
    }
  }, []);

  const [isRegistered, setIsRegistered] = useState(false);
  const challenge =
    typeof window !== "undefined"
      ? window.localStorage.getItem("challenge_" + username) ||
        window.crypto.randomUUID()
      : "";

  const checkIsRegistered = useCallback(async () => {
    setIsRegistered(
      typeof window !== "undefined"
        ? !!window.localStorage.getItem("credential_" + username)
        : false
    );
  }, [username]);

  useEffect(() => {
    if (username) {
      checkIsRegistered();
    }
  }, [checkIsRegistered, username]);

  const register = useCallback(async () => {
    if (typeof window !== "undefined") {
      const res = await client.register(username, challenge, {
        authenticatorType: "auto",
        userVerification: "required",
        timeout: 60000,
        attestation: false,
        debug: false,
      });
      const parsed = parsers.parseRegistration(res);
      window.localStorage.setItem("username", username);
      window.localStorage.setItem(
        "credential_" + username,
        parsed.credential.id
      );
      window.localStorage.setItem("challenge_" + username, challenge);
      checkIsRegistered();
    }
  }, [challenge, checkIsRegistered, username]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticationData, setAuthenticationData] =
    useState<AuthenticationParsed | null>(null);

  const login = useCallback(async () => {
    if (typeof window !== "undefined") {
      const res = await client.authenticate(
        [window.localStorage.getItem("credential_" + username) || ""],
        challenge,
        {
          authenticatorType: "auto",
          userVerification: "required",
          timeout: 60000,
        }
      );
      const parsed = parsers.parseAuthentication(res);
      setIsAuthenticated(true);
      setAuthenticationData(parsed);
    }
  }, [challenge, username]);

  if (!isClientAvailable) {
    return <div>WebAuthn is not available</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="flex justify-between w-full">
        <b className="p-2">Status:</b>
        {username.length > 1 ? (
          <b className="p-2">You have an account already</b>
        ) : (
          <b className="p-2">You dont have account yet</b>
        )}
      </p>

      <p className="flex justify-between w-full">
        <b className="p-2">Username:</b>
        <input
          className="border border-gray-800 p-2 rounded-lg bg-transparent text-gray-800"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </p>

      <p className="flex w-full">
        <button
          className={`px-4 py-2 border border-gray-800 rounded-lg ${
            isRegistered
              ? "bg-gray-800 text-white"
              : "bg-transparent text-gray-800"
          } hover:bg-gray-700 hover:text-white`}
          disabled={isRegistered || !!authenticationData}
          onClick={register}
        >
          Register
        </button>
        <span style={{ width: 300 }}> </span>
        <button
          className="px-4 py-2 border border-gray-800 rounded-lg bg-transparent text-gray-800 hover:bg-gray-700 hover:text-white"
          disabled={!isRegistered || !!authenticationData}
          onClick={login}
        >
          Login
        </button>
      </p>

      {authenticationData && (
        <>
          <p className="flex justify-between w-full">
            <h3 className="p-2">Clear Data</h3>
            <button
              className="px-4 py-2 border border-gray-800 rounded-lg bg-transparent text-gray-800 hover:bg-gray-700 hover:text-white"
              onClick={() => {
                setUsername("");
                setAuthenticationData(null);
              }}
            >
              Clear
            </button>
          </p>
          <h3 className="p-2">AuthenticationData</h3>
          <pre className="border border-gray-800 p-4 bg-white text-gray-800 font-mono rounded-lg whitespace-pre-wrap overflow-auto w-4/5">
            <code aria-multiline={true}>
              {JSON.stringify(authenticationData, null, 2)}
            </code>
          </pre>
        </>
      )}
    </div>
  );
};
