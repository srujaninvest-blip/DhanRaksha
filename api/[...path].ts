import app from "../server.ts";

export default function handler(req: any, res: any) {
  const currentUrl = req.url || "/";

  if (!currentUrl.startsWith("/api")) {
    req.url = `/api${currentUrl.startsWith("/") ? "" : "/"}${currentUrl}`;
  }

  return app(req, res);
}
