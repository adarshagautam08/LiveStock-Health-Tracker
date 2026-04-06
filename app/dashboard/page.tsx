import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import DashboardLayout from "../component/DashboardLayout";


export default async function DashboardPage() {
  const token = (await cookies()).get("admin_token")?.value;

  if (!token) redirect("/admin/login");

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    redirect("/admin/login");
  }

  return (
    <div className="p-6 bg-white h-screen">
        <DashboardLayout/>
    </div>
  );
}
