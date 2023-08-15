"use client";

import { useRouter } from "next/navigation";
import { register, signin } from "@/lib/api";
import { useCallback, useState } from "react";
import Link from "next/link";

type Form = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have and accunt?",
  header: "Create an account",
  subheader: "Just a few things to get you started",
  buttonText: "Register",
};

const signinContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Welcome Back!",
  subheader: "Enter your credentials to access your account",
  buttonText: "Sign In",
};

const initial = { email: "", password: "", firstName: "", lastName: "" };

const AuthForm = ({ mode }: { mode: "register" | "signin" }) => {
  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();

      try {
        if (mode === "register") {
          await register(formState);
        } else {
          await signin(formState);
        }

        router.replace("/home");
      } catch (e) {
        setError(`Could not ${mode}`);
      } finally {
        setFormState({ ...initial });
      }
    },
    [
      formState.email,
      formState.password,
      formState.firstName,
      formState.lastName,
    ]
  );

  const content = mode === "register" ? registerContent : signinContent;

  return (
    <div className="card bg-base-100 w-auto px-24 py-10">
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
        </div>
        <form onSubmit={handleSubmit} className="py-10 w-full">
          {mode === "register" && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <div className="text-lg mb-4 ml-2 text-black/50">
                  First Name
                </div>
                <input
                  type="text"
                  className="input w-full max-w-xs input-bordered input-secondary"
                  required
                  placeholder="First Name"
                  value={formState.firstName}
                  onChange={(e) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="pl-2">
                <div className="text-lg mb-4 ml-2 text-black/50">Last Name</div>
                <input
                  type="text"
                  className="input w-full max-w-xs input-bordered input-secondary"
                  required
                  placeholder="Last Name"
                  value={formState.lastName}
                  onChange={(e) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      lastName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
            <input
              className="input w-full max-w-xs input-bordered input-secondary"
              required
              type="email"
              placeholder="Email"
              value={formState.email}
              onChange={(e) =>
                setFormState((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
            <input
              className="input w-full max-w-xs input-bordered input-secondary"
              required
              value={formState.password}
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setFormState((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link
                  href={content.linkUrl}
                  className="text-blue-600 font-bold"
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div className="card-actions justify-end">
              <button type="submit" className="btn btn-primary">
                {content.buttonText}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
