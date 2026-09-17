import { createFileRoute, redirect } from "@tanstack/react-router";

// The recreated hotel booking landing page is a standalone HTML/CSS document
// served from /landing.html; send the app root there.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ href: "/landing.html" });
  },
});
