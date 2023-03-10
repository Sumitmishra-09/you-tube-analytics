import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Navbar from "../components/Navbar";
import Dashboard from "../components/dashboard/Dashboard";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="w-screen h-screen flex flex-col justify-center items-center bg-gray-200"
        id="main"
      >
        <Dashboard />
      </main>
    </>
  );
}
