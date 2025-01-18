"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Image from "next/image";

export default function Index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const handleLogout = () => {
    window.location.href = `/api/auth/logout`;
  };

  if (user) {
    return (
      <div>
        Welcome {user.name}! {user.email}
        <button onClick={handleLogout}>Logout</button>
        {user.picture && (
          <Image src={user.picture} width={40} height={40} alt="" />
        )}
      </div>
    );
  }

  return <Link href="/api/auth/login?prompt=login">Login</Link>;
}