// app/actions/auth.ts
"use server";

import { signOut } from "@/auth";

export default async function signout() {
  await signOut({
    //redirect: false,
    redirectTo: "/signin", // causes browser error ehrn redirect
  });
}
