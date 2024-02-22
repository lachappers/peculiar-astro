import React, { useEffect, useState, useRef } from "react";

function checkNameValidation() {}

export default function ContactForm() {
  const formRef = useRef(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseBackground, setResponseBackground] =
    useState("bg-secondary-100");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function submitData(e) {
    e.preventDefault();
    if (e.target.classList.contains("submitted"))
      return console.log("already submitted");
    console.log("submitting");
    const formData = new FormData(formRef.current);
    console.log("formdata", formData);
    setLoading(true);
    e.target.classList.add("submitted");
    console.log("event", e);

    fetch(
      "https://script.google.com/macros/s/AKfycbxsNrMMVOqB6N6B7ocFwkKdbPIk3lQ_u4X8jZj_PF62bnguR-ZD4a6I_U6mhQ4Uy_-OdQ/exec",
      {
        method: "POST",
        body: formData,
        mode: "cors",
      }
    )
      .then((res) => {
        const result = res;
        console.log("res", res);

        // console.log(JSON.parse(res));
        console.log("submitted");
        // setLoading(false);
        setResponseBackground("bg-green-200");
        setResponseMessage("Message received - We'll be in touch ASAP.");
      })
      .catch((err) => {
        console.log(err);
        console.log("there was an error");
        // setLoading(false);
        setResponseBackground("bg-red-200");
        setResponseMessage(
          "There was an error submitting your message. Please resubmit or try again later."
        );
      });
  }

  return (
    <form
      id="contactForm"
      name="contactForm"
      method="post"
      ref={formRef}
      onSubmit={submitData}
      className="contactForm relative z-10 flex w-full flex-col justify-center shadow-postMod"
    >
      {/* <span className="absolute left-0 right-0 z-20 h-full w-full rounded bg-[--gray] opacity-30"></span> */}

      <div className="mt-4">
        <label className="mb-2">Name</label>
        <input
          name="name"
          type="text"
          placeholder="Ada Lovelace"
          className="form-input rounded border-2 border-[--font-color] bg-inherit"
          required
        />
        <p
          aria-live="assertive"
          id="nameError"
          className="fieldError js-nameError"
        ></p>
      </div>

      <div className="mt-4">
        <label className="mb-2">Email address</label>
        <input
          name="email"
          type="email"
          placeholder="adalovelace@example.com"
          className="form-input rounded border-2 border-[--font-color] bg-inherit"
          required
        />
      </div>

      <div className="mt-4 w-full">
        <label className="mb-2">Message</label>
        <textarea
          name="message"
          className="form-textarea rounded border-2 border-[--font-color] bg-inherit md:h-56"
          placeholder="Message"
          required
          minLength="20"
          maxLength="1500"
        ></textarea>
      </div>

      <button type="submit" className="button mt-4 w-full">
        {/* {" "}
        Send message */}
        <span className="btnSubmit-text">Send Message</span>
        <span
          className="js-loadingMsg sr-only"
          aria-live="assertive"
          data-loading-msg="Adding to cart, wait..."
        ></span>
      </button>

      {loading && (
        <div
          role="status"
          live="assertive"
          className={`mt-4 flex w-full items-center justify-center rounded p-4 font-medium ${responseBackground}`}
        >
          {responseMessage ? (
            <p>{responseMessage}</p>
          ) : (
            <p>Sending message... </p>
          )}
        </div>
      )}
    </form>
  );
}
