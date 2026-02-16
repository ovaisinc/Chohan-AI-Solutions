import __vite__cjsImport0_express from "/@fs/home/runner/workspace/node_modules/.vite/deps/express.js?v=785b41db"; const express = __vite__cjsImport0_express.__esModule ? __vite__cjsImport0_express.default : __vite__cjsImport0_express;
import { registerRoutes } from "/@fs/home/runner/workspace/server/routes.ts";
import { serveStatic } from "/@fs/home/runner/workspace/server/static.ts";
import __vite__cjsImport3_http from "/@id/__vite-browser-external:http"; const createServer = __vite__cjsImport3_http["createServer"];
const app = express();
const httpServer = createServer(app);
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    }
  })
);
app.use(express.urlencoded({ extended: false }));
export function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  await registerRoutes(httpServer, app);
  app.use((err, _req, res, next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("Internal Server Error:", err);
    if (res.headersSent) {
      return next(err);
    }
    return res.status(status).json({ message });
  });
  if (false) {
    serveStatic(app);
  } else {
    const { setupVite } = await import("/@fs/home/runner/workspace/server/vite.ts");
    await setupVite(httpServer, app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUF1RDtBQUM5RCxTQUFTLHNCQUFzQjtBQUMvQixTQUFTLG1CQUFtQjtBQUM1QixTQUFTLG9CQUFvQjtBQUU3QixNQUFNLE1BQU0sUUFBUTtBQUNwQixNQUFNLGFBQWEsYUFBYSxHQUFHO0FBUW5DLElBQUk7QUFBQSxFQUNGLFFBQVEsS0FBSztBQUFBLElBQ1gsUUFBUSxDQUFDLEtBQUssTUFBTSxRQUFRO0FBQzFCLFVBQUksVUFBVTtBQUFBLElBQ2hCO0FBQUEsRUFDRixDQUFDO0FBQ0g7QUFFQSxJQUFJLElBQUksUUFBUSxXQUFXLEVBQUUsVUFBVSxNQUFNLENBQUMsQ0FBQztBQUV4QyxnQkFBUyxJQUFJLFNBQWlCLFNBQVMsV0FBVztBQUN2RCxRQUFNLGlCQUFnQixvQkFBSSxLQUFLLEdBQUUsbUJBQW1CLFNBQVM7QUFBQSxJQUMzRCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsRUFDVixDQUFDO0FBRUQsVUFBUSxJQUFJLEdBQUcsYUFBYSxLQUFLLE1BQU0sS0FBSyxPQUFPLEVBQUU7QUFDdkQ7QUFFQSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUztBQUMxQixRQUFNLFFBQVEsS0FBSyxJQUFJO0FBQ3ZCLFFBQU0sT0FBTyxJQUFJO0FBQ2pCLE1BQUksdUJBQXdEO0FBRTVELFFBQU0sa0JBQWtCLElBQUk7QUFDNUIsTUFBSSxPQUFPLFNBQVUsYUFBYSxNQUFNO0FBQ3RDLDJCQUF1QjtBQUN2QixXQUFPLGdCQUFnQixNQUFNLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQUEsRUFDdkQ7QUFFQSxNQUFJLEdBQUcsVUFBVSxNQUFNO0FBQ3JCLFVBQU0sV0FBVyxLQUFLLElBQUksSUFBSTtBQUM5QixRQUFJLEtBQUssV0FBVyxNQUFNLEdBQUc7QUFDM0IsVUFBSSxVQUFVLEdBQUcsSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLElBQUksVUFBVSxPQUFPLFFBQVE7QUFDcEUsVUFBSSxzQkFBc0I7QUFDeEIsbUJBQVcsT0FBTyxLQUFLLFVBQVUsb0JBQW9CLENBQUM7QUFBQSxNQUN4RDtBQUVBLFVBQUksT0FBTztBQUFBLElBQ2I7QUFBQSxFQUNGLENBQUM7QUFFRCxPQUFLO0FBQ1AsQ0FBQztBQUFBLENBRUEsWUFBWTtBQUNYLFFBQU0sZUFBZSxZQUFZLEdBQUc7QUFFcEMsTUFBSSxJQUFJLENBQUMsS0FBVSxNQUFlLEtBQWUsU0FBdUI7QUFDdEUsVUFBTSxTQUFTLElBQUksVUFBVSxJQUFJLGNBQWM7QUFDL0MsVUFBTSxVQUFVLElBQUksV0FBVztBQUUvQixZQUFRLE1BQU0sMEJBQTBCLEdBQUc7QUFFM0MsUUFBSSxJQUFJLGFBQWE7QUFDbkIsYUFBTyxLQUFLLEdBQUc7QUFBQSxJQUNqQjtBQUVBLFdBQU8sSUFBSSxPQUFPLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDO0FBQUEsRUFDNUMsQ0FBQztBQUtELE1BQUksT0FBdUM7QUFDekMsZ0JBQVksR0FBRztBQUFBLEVBQ2pCLE9BQU87QUFDTCxVQUFNLEVBQUUsVUFBVSxJQUFJLE1BQU0sT0FBTyxRQUFRO0FBQzNDLFVBQU0sVUFBVSxZQUFZLEdBQUc7QUFBQSxFQUNqQztBQU1BLFFBQU0sT0FBTyxTQUFTLFFBQVEsSUFBSSxRQUFRLFFBQVEsRUFBRTtBQUNwRCxhQUFXO0FBQUEsSUFDVDtBQUFBLE1BQ0U7QUFBQSxNQUNBLE1BQU07QUFBQSxNQUNOLFdBQVc7QUFBQSxJQUNiO0FBQUEsSUFDQSxNQUFNO0FBQ0osVUFBSSxtQkFBbUIsSUFBSSxFQUFFO0FBQUEsSUFDL0I7QUFBQSxFQUNGO0FBQ0YsR0FBRyIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MsIHsgdHlwZSBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IHJlZ2lzdGVyUm91dGVzIH0gZnJvbSBcIi4vcm91dGVzXCI7XG5pbXBvcnQgeyBzZXJ2ZVN0YXRpYyB9IGZyb20gXCIuL3N0YXRpY1wiO1xuaW1wb3J0IHsgY3JlYXRlU2VydmVyIH0gZnJvbSBcImh0dHBcIjtcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3QgaHR0cFNlcnZlciA9IGNyZWF0ZVNlcnZlcihhcHApO1xuXG5kZWNsYXJlIG1vZHVsZSBcImh0dHBcIiB7XG4gIGludGVyZmFjZSBJbmNvbWluZ01lc3NhZ2Uge1xuICAgIHJhd0JvZHk6IHVua25vd247XG4gIH1cbn1cblxuYXBwLnVzZShcbiAgZXhwcmVzcy5qc29uKHtcbiAgICB2ZXJpZnk6IChyZXEsIF9yZXMsIGJ1ZikgPT4ge1xuICAgICAgcmVxLnJhd0JvZHkgPSBidWY7XG4gICAgfSxcbiAgfSksXG4pO1xuXG5hcHAudXNlKGV4cHJlc3MudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2cobWVzc2FnZTogc3RyaW5nLCBzb3VyY2UgPSBcImV4cHJlc3NcIikge1xuICBjb25zdCBmb3JtYXR0ZWRUaW1lID0gbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoXCJlbi1VU1wiLCB7XG4gICAgaG91cjogXCJudW1lcmljXCIsXG4gICAgbWludXRlOiBcIjItZGlnaXRcIixcbiAgICBzZWNvbmQ6IFwiMi1kaWdpdFwiLFxuICAgIGhvdXIxMjogdHJ1ZSxcbiAgfSk7XG5cbiAgY29uc29sZS5sb2coYCR7Zm9ybWF0dGVkVGltZX0gWyR7c291cmNlfV0gJHttZXNzYWdlfWApO1xufVxuXG5hcHAudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICBjb25zdCBzdGFydCA9IERhdGUubm93KCk7XG4gIGNvbnN0IHBhdGggPSByZXEucGF0aDtcbiAgbGV0IGNhcHR1cmVkSnNvblJlc3BvbnNlOiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0IG9yaWdpbmFsUmVzSnNvbiA9IHJlcy5qc29uO1xuICByZXMuanNvbiA9IGZ1bmN0aW9uIChib2R5SnNvbiwgLi4uYXJncykge1xuICAgIGNhcHR1cmVkSnNvblJlc3BvbnNlID0gYm9keUpzb247XG4gICAgcmV0dXJuIG9yaWdpbmFsUmVzSnNvbi5hcHBseShyZXMsIFtib2R5SnNvbiwgLi4uYXJnc10pO1xuICB9O1xuXG4gIHJlcy5vbihcImZpbmlzaFwiLCAoKSA9PiB7XG4gICAgY29uc3QgZHVyYXRpb24gPSBEYXRlLm5vdygpIC0gc3RhcnQ7XG4gICAgaWYgKHBhdGguc3RhcnRzV2l0aChcIi9hcGlcIikpIHtcbiAgICAgIGxldCBsb2dMaW5lID0gYCR7cmVxLm1ldGhvZH0gJHtwYXRofSAke3Jlcy5zdGF0dXNDb2RlfSBpbiAke2R1cmF0aW9ufW1zYDtcbiAgICAgIGlmIChjYXB0dXJlZEpzb25SZXNwb25zZSkge1xuICAgICAgICBsb2dMaW5lICs9IGAgOjogJHtKU09OLnN0cmluZ2lmeShjYXB0dXJlZEpzb25SZXNwb25zZSl9YDtcbiAgICAgIH1cblxuICAgICAgbG9nKGxvZ0xpbmUpO1xuICAgIH1cbiAgfSk7XG5cbiAgbmV4dCgpO1xufSk7XG5cbihhc3luYyAoKSA9PiB7XG4gIGF3YWl0IHJlZ2lzdGVyUm91dGVzKGh0dHBTZXJ2ZXIsIGFwcCk7XG5cbiAgYXBwLnVzZSgoZXJyOiBhbnksIF9yZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgIGNvbnN0IHN0YXR1cyA9IGVyci5zdGF0dXMgfHwgZXJyLnN0YXR1c0NvZGUgfHwgNTAwO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnIubWVzc2FnZSB8fCBcIkludGVybmFsIFNlcnZlciBFcnJvclwiO1xuXG4gICAgY29uc29sZS5lcnJvcihcIkludGVybmFsIFNlcnZlciBFcnJvcjpcIiwgZXJyKTtcblxuICAgIGlmIChyZXMuaGVhZGVyc1NlbnQpIHtcbiAgICAgIHJldHVybiBuZXh0KGVycik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoc3RhdHVzKS5qc29uKHsgbWVzc2FnZSB9KTtcbiAgfSk7XG5cbiAgLy8gaW1wb3J0YW50bHkgb25seSBzZXR1cCB2aXRlIGluIGRldmVsb3BtZW50IGFuZCBhZnRlclxuICAvLyBzZXR0aW5nIHVwIGFsbCB0aGUgb3RoZXIgcm91dGVzIHNvIHRoZSBjYXRjaC1hbGwgcm91dGVcbiAgLy8gZG9lc24ndCBpbnRlcmZlcmUgd2l0aCB0aGUgb3RoZXIgcm91dGVzXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBzZXJ2ZVN0YXRpYyhhcHApO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHsgc2V0dXBWaXRlIH0gPSBhd2FpdCBpbXBvcnQoXCIuL3ZpdGVcIik7XG4gICAgYXdhaXQgc2V0dXBWaXRlKGh0dHBTZXJ2ZXIsIGFwcCk7XG4gIH1cblxuICAvLyBBTFdBWVMgc2VydmUgdGhlIGFwcCBvbiB0aGUgcG9ydCBzcGVjaWZpZWQgaW4gdGhlIGVudmlyb25tZW50IHZhcmlhYmxlIFBPUlRcbiAgLy8gT3RoZXIgcG9ydHMgYXJlIGZpcmV3YWxsZWQuIERlZmF1bHQgdG8gNTAwMCBpZiBub3Qgc3BlY2lmaWVkLlxuICAvLyB0aGlzIHNlcnZlcyBib3RoIHRoZSBBUEkgYW5kIHRoZSBjbGllbnQuXG4gIC8vIEl0IGlzIHRoZSBvbmx5IHBvcnQgdGhhdCBpcyBub3QgZmlyZXdhbGxlZC5cbiAgY29uc3QgcG9ydCA9IHBhcnNlSW50KHByb2Nlc3MuZW52LlBPUlQgfHwgXCI1MDAwXCIsIDEwKTtcbiAgaHR0cFNlcnZlci5saXN0ZW4oXG4gICAge1xuICAgICAgcG9ydCxcbiAgICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxuICAgICAgcmV1c2VQb3J0OiB0cnVlLFxuICAgIH0sXG4gICAgKCkgPT4ge1xuICAgICAgbG9nKGBzZXJ2aW5nIG9uIHBvcnQgJHtwb3J0fWApO1xuICAgIH0sXG4gICk7XG59KSgpO1xuIl0sImZpbGUiOiIvaG9tZS9ydW5uZXIvd29ya3NwYWNlL3NlcnZlci9pbmRleC50cyJ9