import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { DashboardPage } from "./pages/DashboardPage";
import Navigation from "./components/Navigation";
import { Footer } from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExplorePage from "./pages/ExplorePage";

import { useState } from "react";

import "./index.css";
import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import Account from "./Account";

export default function App() {
  const [user, setUser] = useState(null);

  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    console.log("session", session);

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  console.log(session);

  return (
    <>
      {!session ? (
        <Auth />
      ) : (
        <Router>
          <Navigation />

          <div className="min-h align-center justify-center p-4">
            <Routes>
              <Route path="/" element={<DashboardPage user={session.user} />} />
              <Route path="/explore" element={<ExplorePage />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      )}
    </>
  );
}
