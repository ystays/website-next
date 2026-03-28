import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import authOptions from "@/lib/options";
import Image from "next/image";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const { name, email, image } = session.user ?? {};

  return (
    <div className="z-10 w-full max-w-xl px-5 xl:px-0">
      <h1
        className="animate-fade-up bg-linear-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-xs md:text-7xl md:leading-20"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        Dashboard
      </h1>
      <div
        className="mt-10 animate-fade-up opacity-0 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        <div className="flex items-center gap-4">
          {image && (
            <Image
              src={image}
              alt={name ?? "User avatar"}
              width={56}
              height={56}
              className="rounded-full"
            />
          )}
          <div>
            {name && (
              <p className="font-display text-lg font-semibold text-gray-900">
                {name}
              </p>
            )}
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>
        <hr className="my-4 border-gray-100" />
        <p className="text-sm text-gray-500">
          You&apos;re signed in. This page is only visible to authenticated users.
        </p>
      </div>
    </div>
  );
}
