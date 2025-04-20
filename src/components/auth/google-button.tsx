import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function GoogleButton({ action = "login" }: { action?: "login" | "signup" }) {
  return (
    <Button variant="outline" className="w-full" type="button">
      <Icons.google className="mr-2 h-4 w-4" />
      {action === "login" ? "Login with Google" : "Sign up with Google"}
    </Button>
  );
}