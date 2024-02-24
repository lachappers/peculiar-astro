import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export default function ContactMessageNetlify() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>({
    mode: "OnChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [state, setState] = React.useState({});
  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });
  const onSubmit = (data: Inputs, e) => {
    // netlify
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contactForm",
        ...data,
      }),
    })
      .then((response) => {
        // console.log("success!");
        // reset();
        navigate(form.getAttribute("action"));
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const characterCount = watch("message")?.length;

  // console.log("errors", errors);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      id="contactForm"
      name="contactForm"
      onSubmit={handleSubmit(onSubmit)}
      className="contactForm relative z-10 flex w-full flex-col items-center justify-center gap-4 shadow-postMod"
      data-netlify="true"
      netlify-honeypot="bot-field"
      method="POST"
    >
      <p className="hidden">
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
      </p>
      <div className="w-full">
        <label className="mb-2">Name</label>
        <input
          {...register("name", {
            required: "Your Name is required",
            maxLength: { value: 60, message: "Your name is too long!" },
          })}
          aria-invalid={errors.name ? "true" : "false"}
          placeholder={"Ada Lovelace"}
          className="form-input rounded border-2 border-[--font-color] bg-inherit"
          autoComplete="name"
          disabled={isSubmitting || isSubmitSuccessful}
        />
        <p className="text-sm font-medium text-[--error]">
          {errors.name?.message}
        </p>
      </div>

      <div className="w-full">
        <label className="mb-2">Email Address</label>
        <input
          {...register("email", {
            required: "Email Address is required",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid",
            },
          })}
          aria-invalid={errors.email ? "true" : "false"}
          placeholder="adalovelace@example.com"
          className="form-input rounded border-2 border-[--font-color] bg-inherit"
          autoComplete="email"
          disabled={isSubmitting || isSubmitSuccessful}
        />
        <p className="text-sm font-medium text-[--error]">
          {errors.email?.message}
        </p>
      </div>

      <div className=" w-full">
        <label className="mb-2">Message</label>
        <textarea
          {...register("message", {
            required: "A Message is required",
            minLength: {
              value: 20,
              message: "Please enter a message more than 20 characters",
            },
            maxLength: {
              value: 1500,
              message: "Please enter a message less than 1500 characters",
            },
          })}
          aria-invalid={errors.message ? "true" : "false"}
          placeholder="Let us know how we can help!"
          className="form-textarea rounded border-2 border-[--font-color] bg-inherit md:h-56"
          disabled={isSubmitting || isSubmitSuccessful}
        />
        <div className="flex w-full items-start justify-between gap-2">
          <p className="w-full text-sm font-medium text-[--error]">
            {errors.message?.message}
          </p>
          <p
            className={`w-fit text-right font-medium ${
              characterCount > 1500 && "text-[--error]"
            }`}
          >
            {characterCount || 0}/1500
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="button color-primary mt-4 w-full"
        aria-live="assertive"
        disabled={isSubmitting || isSubmitSuccessful}
      >
        {isSubmitting ? (
          <span
            className="btnSubmit-text inline-flex w-full items-center justify-center gap-2"
            aria-label="Sending message, please wait..."
          >
            <svg
              className="mr-3 h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              width={96}
              height={96}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8"
              ></path>
            </svg>
            Sending
          </span>
        ) : isSubmitSuccessful ? (
          <span className="btnSubmit-text">Message Sent</span>
        ) : (
          <span className="btnSubmit-text">Send Message</span>
        )}

        <span
          className="js-loadingMsg sr-only"
          data-loading-msg="Sending message, wait..."
        ></span>
      </button>
      {isSubmitSuccessful && (
        <>
          <p className="w-full rounded border border-[--success] bg-[--success] p-2 text-center font-normal text-[--on-success]">
            Message received - We'll be in touch ASAP.
          </p>
          <button
            className="button size-small color-secondary w-fit"
            type="reset"
            onClick={() => {
              reset();
            }}
          >
            Clear Form
          </button>
        </>
      )}
    </form>
  );
}
