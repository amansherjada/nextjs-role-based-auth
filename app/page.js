import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
<div className="h-screen flex justify-center items-center gap-4 bg-gradient-to-r from-orange-300 to-orange-700 relative">
  <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
    <h1 className="text-5xl font-extrabold text-gray-900">Welcome to Our Website</h1>
    <p className="text-lg text-gray-900 mt-4 font-semibold">Making the Internet Slightly Better, One Click at a Time!</p>
    <button className="bg-transparent border border-gray-900 hover:border-white text-gray-900 hover:text-white font-bold py-2 px-4 rounded mt-6">
      <Link href="/about">Learn More</Link>
    </button>
  </div>
  <div className="hidden lg:block mr-32">
    <Image
      src="/homepage2.png"
      width={500}
      height={500}
      alt="img"
      className="mr-60 mix-blend-darken transition duration-500 ease-in-out hover:scale-110 transform-gpu delay-100 shadow-md"
    />
  </div>
</div>
  );
}