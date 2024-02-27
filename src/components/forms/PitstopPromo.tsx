import React, { useEffect, useState, useRef } from "react";
import { useForm, Form } from "react-hook-form";

type FormData = {
  customer: string;
  email: string;
  company: string;
  website: string;
};

export default function PitstopPromo() {
  const {
    register,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    defaultValues: {
      customer: "",
      email: "",
      company: "",
      website: "",
    },
  });

  const onSubmit = async ({ formData, data, formDataJson, event }) => {
    await fetch(
      "https://script.google.com/macros/s/AKfycbyF8V4Jy4h5uRlnlxqDkJNHpYIyEe648mJ9dMvObzieE30fd0usFvjM_xn31tvFxpxGag/exec",
      {
        redirect: "follow",
        method: "POST",
        body: formData,
      }
    )
      .then((res) => {
        // const result = res;
        const result = res;
        console.log("result", result);
        console.log("submitted");
        // reset();
      })
      .catch((err) => {
        console.log("successSubmit", isSubmitSuccessful);
        // console.log(err);
        console.log("there was an error");
        reset(undefined, { keepDirtyValues: true });
      });
  };

  // console.log("errors", errors);

  return (
    <Form
      id="promoForm"
      name="promoForm"
      method="post"
      onSubmit={onSubmit}
      control={control}
      className=" relative z-10 flex w-full flex-col items-center justify-center gap-4 rounded-lg border-[3px] border-[--font-color] p-8 text-base shadow-postMod"
    >
      <div className="w-full">
        <label className="mb-2 font-bold">Name</label>
        <input
          {...register("customer", {
            required: "Your Name is required",
            maxLength: { value: 60, message: "Your name is too long!" },
          })}
          aria-invalid={errors.customer ? "true" : "false"}
          placeholder={"Homer Simpson"}
          className="form-input rounded border-2 border-[--font-color] bg-inherit"
          autoComplete="name"
          name="customer"
          type="text"
          disabled={isSubmitting || isSubmitSuccessful}
        />
        <p aria-live="assertive" className="text-sm font-medium text-[--error]">
          {errors.customer?.message}
        </p>
      </div>

      <div className="w-full">
        <label className="mb-2 font-bold">Email Address</label>
        <input
          {...register("email", {
            required: "Email Address is required",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid",
            },
          })}
          aria-invalid={errors.email ? "true" : "false"}
          placeholder="homer@example.com"
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

      <div className="w-full">
        <label className="mb-2 font-bold">Company Name</label>
        <input
          {...register("company")}
          aria-invalid={errors.company ? "true" : "false"}
          className="form-input rounded border-2 border-[--font-color] bg-inherit"
          name="company"
          type="text"
          placeholder="Compu-Global-Hyper-Mega-Net"
          disabled={isSubmitting || isSubmitSuccessful}
        />
        <p aria-live="assertive" className="text-sm font-medium text-[--error]">
          {errors.company?.message}
        </p>
      </div>

      <div className="w-full">
        <label className="mb-2 font-bold">Company Website</label>
        <input
          {...register("website", {
            required: "Website is required",
            pattern: {
              value:
                /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
              message: "Enter a valid URL",
            },
          })}
          aria-invalid={errors.website ? "true" : "false"}
          className="form-input rounded border-2 border-[--font-color] bg-inherit"
          name="website"
          placeholder="https://Compu-Global-Hyper-Mega-Net.com"
          type="url"
          disabled={isSubmitting || isSubmitSuccessful}
        />
        <p aria-live="assertive" className="text-sm font-medium text-[--error]">
          {errors.website?.message}
        </p>
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
            aria-label="Sending registration, please wait..."
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
          <span className="btnSubmit-text">Registration Sent</span>
        ) : (
          <span className="btnSubmit-text">Register</span>
        )}

        <span
          className="js-loadingMsg sr-only"
          data-loading-msg="Sending registration, wait..."
        ></span>
      </button>
      {isSubmitSuccessful && (
        <>
          <p className="w-full rounded border border-[--success] bg-[--success] p-2 text-center font-normal text-[--on-success]">
            Registration received - We'll share your report in 5-10 working
            days.
          </p>

          {/* <input
            type="button"
            onClick={() => reset()}
            value="Clear Form"
            className="button size-small color-secondary w-fit"
          /> */}
        </>
      )}
    </Form>
  );
}
