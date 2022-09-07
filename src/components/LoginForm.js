import React, { useState } from "react";
import Toggable from "./Toggable";
import PropTypes from "prop-types";
export default function LoginForm({
  handleSubmit,
  setUsername,
  setPassword,
  username,
  password,
}) {
  const UsernameChange = ({ target }) => {
    setUsername(target.value);
  };

  const PasswordChange = ({ target }) => {
    setPassword(target.value);
  };
  return (
    <div>
      <Toggable bottonLabel="Show Login">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={username}
              name="Username"
              placeholder="Username"
              onChange={UsernameChange}
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              name="Password"
              placeholder="Password"
              onChange={PasswordChange}
            />
          </div>
          <button>Login</button>
        </form>
      </Toggable>
    </div>
  );
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};
