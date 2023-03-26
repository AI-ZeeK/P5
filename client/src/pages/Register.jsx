import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { register, reset } from "../features/auth/authSlice";
import GitHubLogin from "react-github-login";
import { GrGithub, GrGoogle } from "react-icons/gr";
import { GoogleLogin } from "react-google-login";

export const GITHUB_CLIENT_ID =
  process.env.REACT_APP_GITHUB_CLIENT_ID || "685a5d6f6731f0f2173e";
export const GOOGLE_CLIENT_ID =
  "105747698090-4k3ferdhldk418tdjd236p7h64l3a1ku.apps.googleusercontent.com";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const onSuccess = (response) => {
    console.log(response);
    // Here you can handle the GitHub authentication response
  };

  const onFailure = (response) => {
    console.error(response);
    // Here you can handle the GitHub authentication failure
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    console.log(result);

    // try {
    //   navigate("/");
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const googleFailure = (error) => {
    console.log(error);

    console.log("Google Sign in was Unsuccessful. try again later");
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUserAlt /> Register
        </h1>
        <p className="green-ish">Please create an account</p>
      </section>

      <section className="form">
        <form action="" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm your Password"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
        <div className="btn-box">
          <GitHubLogin
            clientId={GITHUB_CLIENT_ID}
            onSuccess={onSuccess}
            onFailure={onFailure}
            className="btn btn-block"
            redirectUri=""
            buttonText="Sign in with GitHub">
            <GrGithub />
            Sign in with GitHub
          </GitHubLogin>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <button className="btn btn-block" onClick={renderProps.onClick}>
                <GrGoogle /> Sign in with Google
              </button>
            )}
            onFailure={googleFailure}
            onSuccess={googleSuccess}
            cookiePolicy="single_host_origin"
            // isSignedIn={true}
          />
        </div>
      </section>
      <div>
        {/* <div className="btn btn-block"> */}

        {/* </div> */}
      </div>
    </>
  );
};

export default Register;
