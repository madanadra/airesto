import List from "@/components/list";
import { index } from "@/fetch";
import { Menu } from "@/type";
import { Suspense } from "react";

export default async function Home() {
  const Main = async () => {
    const data: {error: string} | {data: Menu} = await index()

    if ("error" in data) {
      return (
        <div className="grid place-content-center">
          <h1 className="text-lg font-medium">{data.error}</h1>
        </div>
      )
    }

    return <List data={data.data} />
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 flex flex-col min-h-dvh">

      <header className="mb-8">
        <h1 className="text-pretty text-3xl font-semibold tracking-tight md:text-4xl">Discover Our Menu</h1>
        <p className="mt-2">Freshly made, always delicious. Order now!</p>
      </header>
      
      <Suspense fallback={
        <div className="grow grid place-content-center">
          <div className="w-10 aspect-square rounded-full border-4 border-r-transparent border-neutral-950 animate-spin" />
        </div>
      }>
        <Main />
      </Suspense>

    </main>
  );
}
