import { createServer as createViteServer, createLogger } from "/@fs/home/runner/workspace/node_modules/.vite/deps/vite.js?v=9f4ba477";
import viteConfig from "/@fs/home/runner/workspace/vite.config.ts";
import fs from "/@id/__vite-browser-external:fs";
import path from "/@id/__vite-browser-external:path";
import { nanoid } from "/@fs/home/runner/workspace/node_modules/.vite/deps/nanoid.js?v=bec7f483";
const viteLogger = createLogger();
export async function setupVite(server, app) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server, path: "/vite-hmr" },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("/{*path}", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpdGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdHlwZSBFeHByZXNzIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IGNyZWF0ZVNlcnZlciBhcyBjcmVhdGVWaXRlU2VydmVyLCBjcmVhdGVMb2dnZXIgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgdHlwZSBTZXJ2ZXIgfSBmcm9tIFwiaHR0cFwiO1xuaW1wb3J0IHZpdGVDb25maWcgZnJvbSBcIi4uL3ZpdGUuY29uZmlnXCI7XG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgbmFub2lkIH0gZnJvbSBcIm5hbm9pZFwiO1xuXG5jb25zdCB2aXRlTG9nZ2VyID0gY3JlYXRlTG9nZ2VyKCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXR1cFZpdGUoc2VydmVyOiBTZXJ2ZXIsIGFwcDogRXhwcmVzcykge1xuICBjb25zdCBzZXJ2ZXJPcHRpb25zID0ge1xuICAgIG1pZGRsZXdhcmVNb2RlOiB0cnVlLFxuICAgIGhtcjogeyBzZXJ2ZXIsIHBhdGg6IFwiL3ZpdGUtaG1yXCIgfSxcbiAgICBhbGxvd2VkSG9zdHM6IHRydWUgYXMgY29uc3QsXG4gIH07XG5cbiAgY29uc3Qgdml0ZSA9IGF3YWl0IGNyZWF0ZVZpdGVTZXJ2ZXIoe1xuICAgIC4uLnZpdGVDb25maWcsXG4gICAgY29uZmlnRmlsZTogZmFsc2UsXG4gICAgY3VzdG9tTG9nZ2VyOiB7XG4gICAgICAuLi52aXRlTG9nZ2VyLFxuICAgICAgZXJyb3I6IChtc2csIG9wdGlvbnMpID0+IHtcbiAgICAgICAgdml0ZUxvZ2dlci5lcnJvcihtc2csIG9wdGlvbnMpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiBzZXJ2ZXJPcHRpb25zLFxuICAgIGFwcFR5cGU6IFwiY3VzdG9tXCIsXG4gIH0pO1xuXG4gIGFwcC51c2Uodml0ZS5taWRkbGV3YXJlcyk7XG5cbiAgYXBwLnVzZShcIi97KnBhdGh9XCIsIGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IHJlcS5vcmlnaW5hbFVybDtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBjbGllbnRUZW1wbGF0ZSA9IHBhdGgucmVzb2x2ZShcbiAgICAgICAgaW1wb3J0Lm1ldGEuZGlybmFtZSxcbiAgICAgICAgXCIuLlwiLFxuICAgICAgICBcImNsaWVudFwiLFxuICAgICAgICBcImluZGV4Lmh0bWxcIixcbiAgICAgICk7XG5cbiAgICAgIC8vIGFsd2F5cyByZWxvYWQgdGhlIGluZGV4Lmh0bWwgZmlsZSBmcm9tIGRpc2sgaW5jYXNlIGl0IGNoYW5nZXNcbiAgICAgIGxldCB0ZW1wbGF0ZSA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGNsaWVudFRlbXBsYXRlLCBcInV0Zi04XCIpO1xuICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKFxuICAgICAgICBgc3JjPVwiL3NyYy9tYWluLnRzeFwiYCxcbiAgICAgICAgYHNyYz1cIi9zcmMvbWFpbi50c3g/dj0ke25hbm9pZCgpfVwiYCxcbiAgICAgICk7XG4gICAgICBjb25zdCBwYWdlID0gYXdhaXQgdml0ZS50cmFuc2Zvcm1JbmRleEh0bWwodXJsLCB0ZW1wbGF0ZSk7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuc2V0KHsgXCJDb250ZW50LVR5cGVcIjogXCJ0ZXh0L2h0bWxcIiB9KS5lbmQocGFnZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdml0ZS5zc3JGaXhTdGFja3RyYWNlKGUgYXMgRXJyb3IpO1xuICAgICAgbmV4dChlKTtcbiAgICB9XG4gIH0pO1xufVxuIl0sIm1hcHBpbmdzIjoiQUFDQSxTQUFTLGdCQUFnQixrQkFBa0Isb0JBQW9CO0FBRS9ELE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sUUFBUTtBQUNmLE9BQU8sVUFBVTtBQUNqQixTQUFTLGNBQWM7QUFFdkIsTUFBTSxhQUFhLGFBQWE7QUFFaEMsc0JBQXNCLFVBQVUsUUFBZ0IsS0FBYztBQUM1RCxRQUFNLGdCQUFnQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLEtBQUssRUFBRSxRQUFRLE1BQU0sWUFBWTtBQUFBLElBQ2pDLGNBQWM7QUFBQSxFQUNoQjtBQUVBLFFBQU0sT0FBTyxNQUFNLGlCQUFpQjtBQUFBLElBQ2xDLEdBQUc7QUFBQSxJQUNILFlBQVk7QUFBQSxJQUNaLGNBQWM7QUFBQSxNQUNaLEdBQUc7QUFBQSxNQUNILE9BQU8sQ0FBQyxLQUFLLFlBQVk7QUFDdkIsbUJBQVcsTUFBTSxLQUFLLE9BQU87QUFDN0IsZ0JBQVEsS0FBSyxDQUFDO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsSUFDUixTQUFTO0FBQUEsRUFDWCxDQUFDO0FBRUQsTUFBSSxJQUFJLEtBQUssV0FBVztBQUV4QixNQUFJLElBQUksWUFBWSxPQUFPLEtBQUssS0FBSyxTQUFTO0FBQzVDLFVBQU0sTUFBTSxJQUFJO0FBRWhCLFFBQUk7QUFDRixZQUFNLGlCQUFpQixLQUFLO0FBQUEsUUFDMUIsWUFBWTtBQUFBLFFBQ1o7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFHQSxVQUFJLFdBQVcsTUFBTSxHQUFHLFNBQVMsU0FBUyxnQkFBZ0IsT0FBTztBQUNqRSxpQkFBVyxTQUFTO0FBQUEsUUFDbEI7QUFBQSxRQUNBLHdCQUF3QixPQUFPLENBQUM7QUFBQSxNQUNsQztBQUNBLFlBQU0sT0FBTyxNQUFNLEtBQUssbUJBQW1CLEtBQUssUUFBUTtBQUN4RCxVQUFJLE9BQU8sR0FBRyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsWUFBWSxDQUFDLEVBQUUsSUFBSSxJQUFJO0FBQUEsSUFDL0QsU0FBUyxHQUFHO0FBQ1YsV0FBSyxpQkFBaUIsQ0FBVTtBQUNoQyxXQUFLLENBQUM7QUFBQSxJQUNSO0FBQUEsRUFDRixDQUFDO0FBQ0g7IiwibmFtZXMiOltdfQ==