import { getCurrentUser } from "../lib/getCurrentUser";
import { redirect } from "next/navigation";
import LogoutButton from "../components/LogoutButton";

export default async function Dashboard() {
  const user = await getCurrentUser();

  if(!user) {
    redirect('/auth/login');
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to Dashboard </h1>
      <p>You are successfully authenticated.</p>
      <LogoutButton />
    </div>
  );
}
