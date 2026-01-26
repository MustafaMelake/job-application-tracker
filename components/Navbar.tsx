"use client";

import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutButton from "./sign-out-btn";
import { useSession } from "@/lib/auth/auth-client";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="flex mx-auto container h-16 px-4 items-center justify-between">
        <Link
          href={"/"}
          className="flex gap-2 items-center text-lg font-semibold text-primary"
        >
          <Briefcase />
          Job Tracker
        </Link>
        {session?.user ? (
          <>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-black"
              >
                Dashboard
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-white">
                      {session.user.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <SignOutButton />
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <Link href={"/sign-in"}>
                <Button
                  variant={"ghost"}
                  className="text-gray-700 hover:text-black "
                >
                  Log in
                </Button>
              </Link>
              <Link href={"/sign-up"}>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                  Start for free
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
