import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function InlineEmail() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: Inputs, event) => {};

  // console.log("errors", errors);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      method="post"
      className="grid max-w-sm flex-auto grid-cols-1 content-center justify-items-center gap-x-4 md:max-w-lg lg:w-full lg:grid-cols-3"
      data-netlify="true"
      netlify-honeypot="bot-field"
      id="signup-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p class="hidden">
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
      </p>
      <div className="relative inline-flex w-full max-w-sm items-center lg:col-span-2 ">
        <label for="signup-email" class="sr-only">
          Email Address
        </label>
        <svg
          className="pointer-events-none absolute inset-y-0 left-0 flex h-full w-fit items-center p-4 pl-3 text-[--outline-variant]"
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="96"
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
          className="block w-full rounded-lg border border-[--outline] bg-[--surface-container-lowest] px-4 py-3 pl-10 text-sm disabled:pointer-events-none disabled:opacity-50"
          autoComplete="email"
          disabled={isSubmitting || isSubmitSuccessful}
          id="signup-email"
        />
      </div>

      <button
        type="submit"
        className={`button ${
          isSubmitSuccessful ? "color-success" : "color-primary"
        } size-small col-span-1 my-0.5`}
        aria-live="assertive"
        disabled={isSubmitting}
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
      <p className="mt-0.5 w-full text-sm font-medium text-[--error]">
        {errors.email?.message}
      </p>

      <p class="col-span-full mt-1 w-full max-w-sm text-center text-sm text-[--on-surface-variant] lg:text-left">
        No spam, unsubscribe at any time.{" "}
        <a href="/policies/privacy" class="font-semibold">
          Read our Privacy Policy.
        </a>
      </p>
    </form>
  );
}
