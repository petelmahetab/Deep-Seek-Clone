import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up", "/api/public"],
  beforeAuth: (req) => {
    console.log("Middleware running for:", req.url);
  },
});

export const config = {
  matcher: ["/((?!.+\\.[^|_next\\w+$).*)", "/", "/(api|trpc)(.*)"],
};