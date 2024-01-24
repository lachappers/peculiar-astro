import { useEffect, useState, useRef } from "react";

export default function ContactForm() {
  const formRef = useRef(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseBackground, setResponseBackground] =
    useState("bg-secondary-100");
  const [loading, setLoading] = useState(false);

  function submitData(e) {
    e.preventDefault();
    console.log("submitting");
    const formData = new FormData(formRef.current);
    setLoading(true);

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
        console.log(res);

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
      className="contactForm"
    >
      {loading && (
        <div
          className={`mt-4 flex w-full items-center justify-center rounded p-4 font-medium ${responseBackground}`}
        >
          {responseMessage ? (
            <p>{responseMessage}</p>
          ) : (
            <p>Sending message... </p>
          )}
        </div>
      )}

      <div className="mt-4">
        <label className="mb-2">Name</label>
        <input
          name="name"
          type="text"
          placeholder="Ada Lovelace"
          className="form-input rounded border-2 bg-inherit"
          required
        />
      </div>

      <div className="mt-4">
        <label className="mb-2">Email address</label>
        <input
          name="email"
          type="email"
          placeholder="adalovelace@example.com"
          className="form-input rounded border-2 bg-inherit"
          required
        />
      </div>

      <div className="mt-4 w-full">
        <label className="mb-2">Message</label>
        <textarea
          name="message"
          className="form-textarea rounded border-2 bg-inherit md:h-56"
          placeholder="Message"
          required
          minLength="20"
          maxLength="1500"
        ></textarea>
      </div>

      <button type="submit" className="button mt-4 w-full">
        {" "}
        Send message
      </button>
    </form>
  );
}
