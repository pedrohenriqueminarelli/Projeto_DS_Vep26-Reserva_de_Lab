"use client";
import { Header } from "./componentesPrivados/Header";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function LayoutPrivado({ children }: { 
children: React.ReactNode }) {
  
  const router = useRouter();
    useEffect(()=>{
      const token= localStorage.getItem("token");
      if(!token)router.push("/login");
  },[])

  return (
    <>
      <Header />
      {children}
    </>
  );
}