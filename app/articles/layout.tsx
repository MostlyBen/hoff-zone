import { headers } from "next/headers";

export default async function Layout({ children }: { children: React.ReactNode }) {

  return (
    <article className="prose m-8 mx-auto lg:prose-xl">
      {children}
    </article>
  );
}
