import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { User } from "@/types";
import Layout from "@/components/Layout";

interface MyAppProps {
  session: SessionProvider["session"];
}

const MyApp = ({ session }: MyAppProps) => {
  const store = useStore();
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (session?.user) {
      store.setUser(session.user as User);
      setUserId(session.user.id);
    } else {
      setUserId(null);
    }
  }, [session]);

  return (
    <SessionProvider session={session}>
      {userId && <Layout userId={userId}>{session?.user?.name}</Layout>}
      {!userId && <p>Loading...</p>}
    </SessionProvider>
  );
};

export default MyApp;