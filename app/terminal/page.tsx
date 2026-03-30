import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import authOptions from "@/lib/options";
import Terminal from "@/components/terminal/Terminal";

export const metadata = {
  title: "Terminal",
};

export default async function TerminalPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }

  return (
    <div className="z-10 w-full max-w-5xl px-5 xl:px-0">
      <h1
        className="animate-fade-up bg-linear-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-xs md:text-7xl md:leading-20"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        Terminal
      </h1>
      <div
        className="mt-10 animate-fade-up opacity-0"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        <Terminal />
      </div>
    </div>
  );
}
