import Link from "next/link";

export default function Home() {
  return (
    <div class="text-center p-6 mx-auto max-w-3xl max-h-screen flex flex-col">
      <div class="flex-none text-xl mb-8 font-bold ">Home page</div>

      <div class="flex flex-col justify-center h-screen">
        <Link href="/blog">
          <a class="mb-1 p-8 bg-blue-100 border rounded-2xl shadow-sm hover:bg-blue-200">
            Blog
          </a>
        </Link>
        <a class="mb-1 p-8 bg-blue-100 border rounded-2xl shadow-sm hover:bg-blue-200">
          Something else
        </a>
      </div>
    </div>
  );
}
