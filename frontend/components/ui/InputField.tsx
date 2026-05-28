"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  /** Icon placed on the left side of the input */
  leadingIcon?: ReactNode;
  /** Button/icon placed on the right side (e.g., password toggle) */
  trailingAction?: ReactNode;
  /** Error message shown below the input */
  error?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, leadingIcon, trailingAction, error, className = "", ...props }, ref) => {
    const inputId = props.id ?? props.name;

    return (
      <div className="form-field">
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>

        <div className="form-input-wrapper">
          {leadingIcon && (
            <span className="form-input-icon" aria-hidden="true">
              {leadingIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={[
              "form-input",
              !leadingIcon && "pl-3",
              error && "form-input--error",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />

          {trailingAction && trailingAction}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="form-error-message" role="alert">
            <ErrorIcon />
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

// ─── Internal Icons ───────────────────────────────────────────────────────────

function ErrorIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0zm.75 9H5.25V7.5h1.5V9zm0-3H5.25V3h1.5v3z" />
    </svg>
  );
}

export default InputField;
