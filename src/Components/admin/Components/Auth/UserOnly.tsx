import { ReactNode, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export default function UserOnly({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return user ? <>{children}</> : null;
}
