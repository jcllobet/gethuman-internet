import React from "react";

const About = () => {
  const githubRepoUrl = "https://github.com/";
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p className="text">
        The WebAuthPage component in this project is a Next.js page that
        provides a web authentication interface for users. It leverages the
        @passwordless-id/webauthn library to handle the registration and login
        processes securely.
        {"\n"} {"\n"}
        When users access the WebAuthPage, they are presented with a form that
        displays their registration status. If they are already registered, a
        message informs them that they have an account. Otherwise, they are
        prompted to enter a username to register.
        {"\n"} {"\n"}
        The registration process begins when users click the
        &quot;Register&quot; button. This triggers the register function, which
        communicates with the web authentication client. The client generates a
        challenge and initiates the registration process. Upon successful
        registration, the user&apos;s credential ID is stored in the local
        storage, associating it with the provided username.
        {"\n"} {"\n"}
        To log in, users enter their username and click the &quot;Login&quot;
        button. The login function is called, initiating the authentication
        process. The web authentication client verifies the user&apos;s identity
        using their stored credential ID and the challenge generated during
        login. If authentication succeeds, the user is considered authenticated,
        and the authentication data is displayed on the page.
        {"\n"} {"\n"}
        If the web authentication client is not available, a message is
        displayed indicating that web authentication is not supported in the
        user&apos;s browser.
        {"\n"} {"\n"}
        The WebAuthPage component provides a simple and secure way for users to
        register and authenticate using web authentication. It demonstrates the
        usage of the @passwordless-id/webauthn library and showcases the power
        and convenience of web authentication in modern web applications.
      </p>
      <a href={githubRepoUrl} target="_blank" rel="noopener noreferrer">
        <button className="button">GitHub Repo</button>
      </a>
    </div>
  );
};

export default About;
