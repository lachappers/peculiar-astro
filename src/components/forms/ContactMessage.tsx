import React, { useEffect, useState, useRef } from "react";
import { useForm, Form } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactMessage() {
  const {
    register,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async ({ formData, data, formDataJson, event }) => {
    await fetch(
      "https://script.google.com/macros/s/AKfycbxsNrMMVOqB6N6B7ocFwkKdbPIk3lQ_u4X8jZj_PF62bnguR-ZD4a6I_U6mhQ4Uy_-OdQ/exec",
      {
        method: "POST",
        body: formData,
        // mode: "cors",
      }
    )
      .then((res) => {
        const result = res;
        // console.log(res);
        console.log("submitted");
        // reset();
      })
      .catch((err) => {
        console.log(err);
        console.log("there was an error");
        reset(undefined, { keepDirtyValues: true });
      });
  };

  const characterCount = watch("message")?.length;

  // console.log("errors", errors);

  return (
    <Form
      id="contactForm"
      name="contactForm"
      method="post"
      onSubmit={onSubmit}
      control={control}
      className="contactForm relative z-10 flex w-full flex-col items-center justify-center gap-4 shadow-postMod"
    >
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
          name="name"
          type="text"
          disabled={isSubmitting || isSubmitSuccessful}
        />
        <p aria-live="assertive" className="text-sm font-medium text-[--error]">
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
          name="email"
          type="email"
          disabled={isSubmitting || isSubmitSuccessful}
        />
        <p aria-live="assertive" className="text-sm font-medium text-[--error]">
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
          name="message"
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
            aria-live="assertive"
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
    </Form>
  );
}
