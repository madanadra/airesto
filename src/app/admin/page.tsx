import Form from "@/components/form";
import Link from "next/link";

export default function Admin() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">

      <header>
        <h1 className="text-pretty text-3xl font-semibold tracking-tight md:text-4xl">Admin — Image Upload</h1>
        <p className="mt-2">
          Make sure the menu image is correct and clear.
        </p>
      </header>

      <div className="mt-8 mb-4 grid justify-end">
        <Link href='/' className="underline text-blue-500">Back to menu</Link>
      </div>

      <section className="rounded-lg border border-neutral-200 bg-neutral-100 p-6">
        <Form />
      </section>
      
    </main>
  );
}
