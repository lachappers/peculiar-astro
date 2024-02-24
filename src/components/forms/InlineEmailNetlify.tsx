import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  email: string;
};

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export default function InlineEmail() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>({
    mode: "OnChange",
    defaultValues: {
      email: "",
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
        "form-name": "signup-form",
        ...data,
      }),
    })
      .then((response) => {
        // console.log("success!");
        reset();
        navigate(form.getAttribute("action"));
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log("errors", errors);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      method="POST"
      className="w-full md:max-w-lg"
      data-netlify="true"
      netlify-honeypot="bot-field"
      id="signup-form"
      name="signup-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="hidden">
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
      </p>
      <div className="flex h-fit w-full flex-col items-center gap-2 sm:flex-row sm:gap-3">
        <div className="relative inline-flex w-full items-center ">
          <label htmlFor="signup-email" className="sr-only">
            Email Address
          </label>
          <svg
            className="pointer-events-none absolute inset-y-0 left-0 flex h-full w-fit items-center p-4 pl-3 text-[--outline-variant]"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"
            />
          </svg>
          <input
            {...register("email", {
              required: "Email Address is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid",
              },
            })}
            aria-invalid={errors.email ? "true" : "false"}
            placeholder="Email Address"
            className="block h-fit w-full rounded-lg border border-[--outline] bg-[--surface-container-lowest] px-4 py-3 pl-10 text-sm disabled:pointer-events-none disabled:opacity-50"
            autoComplete="email"
            disabled={isSubmitting || isSubmitSuccessful}
            id="signup-email"
          />
        </div>
        <p
          aria-live="assertive"
          className="mt-0.5 w-full text-sm font-medium text-[--error]"
        >
          {errors.email?.message}
        </p>
        <button
          type="submit"
          className={`button ${
            isSubmitSuccessful ? "color-success" : "color-primary"
          } size-small `}
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
              Subscribe
            </span>
          ) : isSubmitSuccessful ? (
            <span className="btnSubmit-text">Success!</span>
          ) : (
            <span className="btnSubmit-text">Subscribe</span>
          )}
          <span
            className="js-loadingMsg sr-only"
            data-loading-msg="Sending message, wait..."
          ></span>
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-[--on-surface-variant] sm:text-left sm:text-sm">
        No spam, unsubscribe at any time.{" "}
        <a href="/policies/privacy" className="font-semibold">
          Read our Privacy Policy.
        </a>
      </p>
    </form>
  );
}
