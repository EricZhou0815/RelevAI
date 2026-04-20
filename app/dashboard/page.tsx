import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-black dark:text-white">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {session.user?.email}
            </p>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stats cards */}
          <div className="bg-white rounded-lg border border-zinc-200 p-6 dark:bg-zinc-950 dark:border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Users</h3>
            <p className="text-2xl font-semibold text-black dark:text-white mt-2">1</p>
          </div>
          
          <div className="bg-white rounded-lg border border-zinc-200 p-6 dark:bg-zinc-950 dark:border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Active Sessions</h3>
            <p className="text-2xl font-semibold text-black dark:text-white mt-2">1</p>
          </div>
          
          <div className="bg-white rounded-lg border border-zinc-200 p-6 dark:bg-zinc-950 dark:border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Projects</h3>
            <p className="text-2xl font-semibold text-black dark:text-white mt-2">0</p>
          </div>
          
          <div className="bg-white rounded-lg border border-zinc-200 p-6 dark:bg-zinc-950 dark:border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Tasks Completed</h3>
            <p className="text-2xl font-semibold text-black dark:text-white mt-2">0</p>
          </div>
        </div>

        {/* Welcome section */}
        <div className="max-w-7xl mx-auto mt-8 bg-white rounded-lg border border-zinc-200 p-6 dark:bg-zinc-950 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
            Welcome, {session.user?.name || "User"}!
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            This is your dashboard where you can manage your account and view statistics.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
