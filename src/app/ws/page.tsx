"use client";
import { useAPI } from "@/hooks/useAPI";
import useSWR from "swr";

async function getData() {
  const res = await fetch(
    "https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating"
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.text();
}

function get() {}
export default function Page() {
  const { data: x } = useAPI().workspaces.get();

  const data = getData();

  return (
    <>
      {/* <h1>{data}</h1>; */}
      <h1>{x}</h1>;
    </>
  );
}
