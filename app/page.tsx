import Image from "next/image";
import Link from "next/link";
import { getSession, updateSession } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getSupabase } from "@/utils/supabase";
import { UserProps } from "@/utils/types";
import jwt from "jsonwebtoken";

const fetchUser = async () => {
  const supabase = getSupabase();
  const { data: users } = await supabase.from("users").select();
  return users;
};

const Home = async () => {
  const session: any = await getSession();
  if (session?.isLoading) return <div>Loading...</div>;
  if (session?.error) return <div>{session?.error?.message}</div>;
  const data = await fetchUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session?.user ? (
        <p>
          Welcome {session?.user?.name}!
          <Link
            prefetch={false}
            href="/api/auth/logout"
            className="ml-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Logout
          </Link>
        </p>
      ) : (
        <Link
          href="/api/auth/login"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Login
        </Link>
      )}

      {data &&
        data?.map((user: UserProps) => <p key={user?.id}>{user.name}</p>)}
    </main>
  );
};

export default withPageAuthRequired(Home);
