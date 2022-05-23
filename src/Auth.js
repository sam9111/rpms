import { useState } from "react";
import { supabase } from "./supabaseClient";
import SignUp from "./components/SignUp";

export default function Auth() {
  return <SignUp />;
}
