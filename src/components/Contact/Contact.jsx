import React, { useRef, useState, useEffect } from "react";
import Header from "../Header/Header";
import Navi from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";
import "./Contact.css";

const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
const EMAILJS_USER_ID = process.env.REACT_APP_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = process.env.REACT_APP_SERVICE_ID;

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    // A basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const { from_name, from_email, message } = formData;

    if (!from_name.trim()) {
      toast.error("Please enter your name");
      return false;
    }

    if (!validateEmail(from_email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!message.trim()) {
      toast.error("Please enter a message");
      return false;
    }

    return true;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Send the email
    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current,
        EMAILJS_USER_ID
      )
      .then(
        (response) => {
          window.location.href = `${window.location.pathname}?success=true`;
        },
        (error) => {
          // Store the error message in local storage
          localStorage.setItem("error_message", "An error occurred");
          window.location.reload();
        }
      );
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("success")) {
      toast.success("Email sent successfully");
      // Clear the success flag from the URL
      window.history.replaceState(null, null, window.location.pathname);
    }

    // Check if there is an error message in local storage
    const errorMessage = localStorage.getItem("error_message");
    if (errorMessage) {
      toast.error(errorMessage);
      // Clear the error message from local storage
      localStorage.removeItem("error_message");
    }
  }, []);

  return (
    <div className="bg-pink-600">
      <Header />
      <Navi />

      <div className="background">
        <div className="containerz">
          <div className="screen">
            <form ref={form} onSubmit={sendEmail}>
              <div className="screen-header">
                <div className="screen-header-left">
                  <div className="screen-header-button close" />
                  <div className="screen-header-button maximize" />
                  <div className="screen-header-button minimize" />
                </div>
                <div className="screen-header-right">
                  <div className="screen-header-ellipsis" />
                  <div className="screen-header-ellipsis" />
                  <div className="screen-header-ellipsis" />
                </div>
              </div>
              <div className="screen-body">
                <div className="screen-body-item left">
                  <div className="app-title">
                    <span>CONTACT</span>
                    <span>ME</span>
                  </div>
                </div>
                <div className="screen-body-item">
                  <div className="app-form">
                    <div className="app-form-group">
                      <input
                        className="app-form-control"
                        placeholder="NAME"
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="app-form-group">
                      <input
                        className="app-form-control"
                        placeholder="EMAIL"
                        name="from_email"
                        value={formData.from_email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="app-form-group message">
                      <input
                        className="app-form-control"
                        placeholder="MESSAGE"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="app-form-group buttons">
                      <button className="app-form-button" onClick={sendEmail}>
                        SEND
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;
