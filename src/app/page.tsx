"use server"
import { Button } from "@/components/ui/button";
import { Prisma }  from "@/generated/prisma/client";
import prisma from "@/lib/db";
import { useTRPC } from "@/trpc/client";
import { caller } from "@/trpc/server";
import { useQuery } from "@tanstack/react-query";

const page =  async () => {
   const data  = await caller.hello({text: "Antonio SERVER"}); 
  return (
    <div>
     {JSON.stringify(data)}
    </div>
  );
}

export default page;