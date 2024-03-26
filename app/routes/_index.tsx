import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Jonathan Dean" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900"> 
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/Designer.jpeg" className="h-8" alt="Jonathan Dean Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Jonathan Dean</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
            </li>
            <li>
              <a href="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
            </li>
            <li>
              <a href="/posts" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Posts</a>
            </li>
            <li>
              <a href="/wordle" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Wordle</a>
            </li>
            <li>
              <a href="/climbing" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Climbing</a>
            </li>
          </ul>
        </div>
      </div>
      </nav>

      <div className="grid grid-cols-1 gap-5">
        <div className="container mx-auto flex justify-start bg-slate-200 gap-3 rounded-md shadow-md items-center p-5">
          <a href="/posts" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Very Basic Blog</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">Rudimentary blog created with Remix using ReactJS, Tailwind CSS, and Typescript</p>
          </a>
        
          <a href="/wordle" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Wordle Clone</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">Very basic Wordle game created with 5 letter words scraped from local Kelowna news outlets</p>
          </a>

          <a href="/climbing" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Climbing Project</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">Project to record and monitor progress with climbing</p>
          </a>
        </div>

        <div className="container mx-auto flex justify-start bg-slate-200 gap-3 rounded-md shadow-md items-center p-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <img className="h-auto max-w-full rounded-lg" src="/1.jpeg" alt="Average Phoenix Breakfast"/>
            </div>
            <div>
              <img className="h-auto max-w-full rounded-lg" src="/2.jpeg" alt="Phoenix trying to sneak a nibble"/>
            </div>
            <div>
              <img className="h-auto max-w-full rounded-lg" src="/3.jpeg" alt="Every dog loves cheese"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
