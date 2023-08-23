import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";
import Prisma from "@prisma/client";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const hashPassword = (password: string) => bcrypt.hashSync(password, 10);
export const comparePassword = (password: string, hashPassword: string) =>
  bcrypt.compareSync(password, hashPassword);

export const createJWT = (user: Prisma.User) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload.payload as any;
};

export const getUserFromCookie = async (cookies: ReadonlyRequestCookies) => {
  const cookieName = process.env.COOKIE_NAME;

  if (!cookieName) {
    throw new Error("No cookie name set");
  }

  const jwt = cookies.get(cookieName);

  if (!jwt) {
    throw new Error("No cookie found");
  }

  const { id } = await validateJWT(jwt.value);

  const user = await db.user.findUnique({
    where: { id },
  });

  return user;
};
