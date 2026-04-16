"use client";

import Image from "next/image";
import { useState } from "react";
import Button from "./Button";
import { HERO_LEAD_EMAIL_INPUT_ID } from "@/lib/scroll-to-hero-lead";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [fieldError, setFieldError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    setFieldError(false);

    const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    if (!wordpressUrl) {
      setStatus("error");
      setFieldError(true);
      setMessage("WordPress URL is not configured.");
      return;
    }

    try {
      const response = await fetch(`${wordpressUrl}/wp-json/saas/v1/submit-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setMessage("Thanks! We will reach out to you shortly.");
        return;
      }

      setStatus("error");
      setFieldError(true);

      const contentType = response.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        const data = (await response.json()) as { message?: string };
        setMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setMessage(`Request failed (${response.status}). Please try again.`);
    } catch {
      setStatus("error");
      setFieldError(true);
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className="flex flex-col gap-[9px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-[6px] items-stretch sm:items-center"
      >
        <input
          type="email"
          id={HERO_LEAD_EMAIL_INPUT_ID}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (fieldError) setFieldError(false);
          }}
          placeholder="Enter your work email"
          required
          className={`scroll-mt-24 md:scroll-mt-[88px] h-[48px] rounded-[4px] px-4 text-[16px] leading-[22px] text-gray-900 placeholder:text-gray-500 bg-white focus:outline-none w-full sm:w-[280px] ${
            fieldError
              ? "border border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          }`}
        />
        <Button type="submit" variant="primary" size="lg" disabled={status === "loading"}>
          {status === "loading" ? "Submitting..." : "Start Free Trial"}
        </Button>
      </form>
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-1 items-center">
          <Image
            src="/feature-check-icon.svg"
            alt=""
            width={14}
            height={14}
            className="shrink-0"
          />
          <span className="text-[12px] leading-[20px] text-gray-900">No credit card required</span>
        </div>
        <div className="flex gap-1 items-center">
          <Image
            src="/feature-check-icon.svg"
            alt=""
            width={14}
            height={14}
            className="shrink-0"
          />
          <span className="text-[12px] leading-[20px] text-gray-900">14 days of JustCall AI on us</span>
        </div>
      </div>
      {message && (
        <p className={`text-[12px] leading-[20px] ${status === "success" ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
