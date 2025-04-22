"use client"
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useAuth } from "@/hooks/useAuth";

export function GoogleButton({ action = "login" }: { action?: "login" | "signup" }) {
  const { oauthLoginUser } = useAuth()
  return (
    <Button variant="outline" className="w-full" type="button" onClick={() => oauthLoginUser('google')}>
      <Icons.google className="mr-2 h-4 w-4" />
      {action === "login" ? "Login with Google" : "Sign up with Google"}
    </Button>
  );
}