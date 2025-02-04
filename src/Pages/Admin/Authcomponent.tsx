import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const AuthComponent = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/admin-login" replace />;
};

export default AuthComponent;
