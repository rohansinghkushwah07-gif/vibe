"use client";

import { useTRPC } from "@/trpc/client";
import { Button } from "@base-ui/react";
import { Input } from "@base-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [value, SelectValue] = useState("");
  const trpc = useTRPC();

  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.success("Background job started");
      },
    })
  );

  return (
    <div className="p-4 max-w-7xl">
      <Input value={value} onChange={(e) => SelectValue(e.target.value)} />

      <Button
        className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2"
        disabled={invoke.isPending}
        onClick={() => invoke.mutate({ value: value })}
      >
        invoke Background job
      </Button>
    </div>
  );
}