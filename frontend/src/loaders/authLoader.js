// authLoaders.js
import authService from "../appwrite/auth";
import { redirect } from "react-router-dom";

// Blocks guests; only logged-in users can proceed
export async function requireAuth() {
  try {
    const user = await authService.GetCurrentUser();
    if (user) return null;              // allow route to render
  } catch (_) {}
  return redirect("/login");            // not logged in -> go to login
}

// Blocks logged-in users from seeing login/signup
export async function redirectIfAuthed() {
  try {
    const user = await authService.GetCurrentUser();
    if (user) return redirect("/dashboard"); // already authed -> go dashboard
  } catch (_) {}
  return null;                          // not authed -> allow auth pages
}
