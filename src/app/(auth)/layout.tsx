import { getSession } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = await getSession({
    headers: await headers(),
  });

  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return <div>{children}</div>;
};

export default AuthLayout;
