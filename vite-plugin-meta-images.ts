import fs from "/@id/__vite-browser-external:fs";
import path from "/@id/__vite-browser-external:path";
export function metaImagesPlugin() {
  return {
    name: "vite-plugin-meta-images",
    transformIndexHtml(html) {
      const baseUrl = getDeploymentUrl();
      if (!baseUrl) {
        log("[meta-images] no Replit deployment domain found, skipping meta tag updates");
        return html;
      }
      const publicDir = path.resolve(process.cwd(), "client", "public");
      const opengraphPngPath = path.join(publicDir, "opengraph.png");
      const opengraphJpgPath = path.join(publicDir, "opengraph.jpg");
      const opengraphJpegPath = path.join(publicDir, "opengraph.jpeg");
      let imageExt = null;
      if (fs.existsSync(opengraphPngPath)) {
        imageExt = "png";
      } else if (fs.existsSync(opengraphJpgPath)) {
        imageExt = "jpg";
      } else if (fs.existsSync(opengraphJpegPath)) {
        imageExt = "jpeg";
      }
      if (!imageExt) {
        log("[meta-images] OpenGraph image not found, skipping meta tag updates");
        return html;
      }
      const imageUrl = `${baseUrl}/opengraph.${imageExt}`;
      log("[meta-images] updating meta image tags to:", imageUrl);
      html = html.replace(
        /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/g,
        `<meta property="og:image" content="${imageUrl}" />`
      );
      html = html.replace(
        /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/g,
        `<meta name="twitter:image" content="${imageUrl}" />`
      );
      return html;
    }
  };
}
function getDeploymentUrl() {
  if (process.env.REPLIT_INTERNAL_APP_DOMAIN) {
    const url = `https://${process.env.REPLIT_INTERNAL_APP_DOMAIN}`;
    log("[meta-images] using internal app domain:", url);
    return url;
  }
  if (process.env.REPLIT_DEV_DOMAIN) {
    const url = `https://${process.env.REPLIT_DEV_DOMAIN}`;
    log("[meta-images] using dev domain:", url);
    return url;
  }
  return null;
}
function log(...args) {
  if (false) {
    console.log(...args);
  }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVO0FBTVYsZ0JBQVMsbUJBQTJCO0FBQ3pDLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLG1CQUFtQixNQUFNO0FBQ3ZCLFlBQU0sVUFBVSxpQkFBaUI7QUFDakMsVUFBSSxDQUFDLFNBQVM7QUFDWixZQUFJLDRFQUE0RTtBQUNoRixlQUFPO0FBQUEsTUFDVDtBQUdBLFlBQU0sWUFBWSxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsVUFBVSxRQUFRO0FBQ2hFLFlBQU0sbUJBQW1CLEtBQUssS0FBSyxXQUFXLGVBQWU7QUFDN0QsWUFBTSxtQkFBbUIsS0FBSyxLQUFLLFdBQVcsZUFBZTtBQUM3RCxZQUFNLG9CQUFvQixLQUFLLEtBQUssV0FBVyxnQkFBZ0I7QUFFL0QsVUFBSSxXQUEwQjtBQUM5QixVQUFJLEdBQUcsV0FBVyxnQkFBZ0IsR0FBRztBQUNuQyxtQkFBVztBQUFBLE1BQ2IsV0FBVyxHQUFHLFdBQVcsZ0JBQWdCLEdBQUc7QUFDMUMsbUJBQVc7QUFBQSxNQUNiLFdBQVcsR0FBRyxXQUFXLGlCQUFpQixHQUFHO0FBQzNDLG1CQUFXO0FBQUEsTUFDYjtBQUVBLFVBQUksQ0FBQyxVQUFVO0FBQ2IsWUFBSSxvRUFBb0U7QUFDeEUsZUFBTztBQUFBLE1BQ1Q7QUFFQSxZQUFNLFdBQVcsR0FBRyxPQUFPLGNBQWMsUUFBUTtBQUVqRCxVQUFJLDhDQUE4QyxRQUFRO0FBRTFELGFBQU8sS0FBSztBQUFBLFFBQ1Y7QUFBQSxRQUNBLHNDQUFzQyxRQUFRO0FBQUEsTUFDaEQ7QUFFQSxhQUFPLEtBQUs7QUFBQSxRQUNWO0FBQUEsUUFDQSx1Q0FBdUMsUUFBUTtBQUFBLE1BQ2pEO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxTQUFTLG1CQUFrQztBQUN6QyxNQUFJLFFBQVEsSUFBSSw0QkFBNEI7QUFDMUMsVUFBTSxNQUFNLFdBQVcsUUFBUSxJQUFJLDBCQUEwQjtBQUM3RCxRQUFJLDRDQUE0QyxHQUFHO0FBQ25ELFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxRQUFRLElBQUksbUJBQW1CO0FBQ2pDLFVBQU0sTUFBTSxXQUFXLFFBQVEsSUFBSSxpQkFBaUI7QUFDcEQsUUFBSSxtQ0FBbUMsR0FBRztBQUMxQyxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU87QUFDVDtBQUVBLFNBQVMsT0FBTyxNQUFtQjtBQUNqQyxNQUFJLE9BQXVDO0FBQ3pDLFlBQVEsSUFBSSxHQUFHLElBQUk7QUFBQSxFQUNyQjtBQUNGIiwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJ2aXRlLXBsdWdpbi1tZXRhLWltYWdlcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG4vKipcbiAqIFZpdGUgcGx1Z2luIHRoYXQgdXBkYXRlcyBvZzppbWFnZSBhbmQgdHdpdHRlcjppbWFnZSBtZXRhIHRhZ3NcbiAqIHRvIHBvaW50IHRvIHRoZSBhcHAncyBvcGVuZ3JhcGggaW1hZ2Ugd2l0aCB0aGUgY29ycmVjdCBSZXBsaXQgZG9tYWluLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWV0YUltYWdlc1BsdWdpbigpOiBQbHVnaW4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICd2aXRlLXBsdWdpbi1tZXRhLWltYWdlcycsXG4gICAgdHJhbnNmb3JtSW5kZXhIdG1sKGh0bWwpIHtcbiAgICAgIGNvbnN0IGJhc2VVcmwgPSBnZXREZXBsb3ltZW50VXJsKCk7XG4gICAgICBpZiAoIWJhc2VVcmwpIHtcbiAgICAgICAgbG9nKCdbbWV0YS1pbWFnZXNdIG5vIFJlcGxpdCBkZXBsb3ltZW50IGRvbWFpbiBmb3VuZCwgc2tpcHBpbmcgbWV0YSB0YWcgdXBkYXRlcycpO1xuICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hlY2sgaWYgb3BlbmdyYXBoIGltYWdlIGV4aXN0cyBpbiBwdWJsaWMgZGlyZWN0b3J5XG4gICAgICBjb25zdCBwdWJsaWNEaXIgPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ2NsaWVudCcsICdwdWJsaWMnKTtcbiAgICAgIGNvbnN0IG9wZW5ncmFwaFBuZ1BhdGggPSBwYXRoLmpvaW4ocHVibGljRGlyLCAnb3BlbmdyYXBoLnBuZycpO1xuICAgICAgY29uc3Qgb3BlbmdyYXBoSnBnUGF0aCA9IHBhdGguam9pbihwdWJsaWNEaXIsICdvcGVuZ3JhcGguanBnJyk7XG4gICAgICBjb25zdCBvcGVuZ3JhcGhKcGVnUGF0aCA9IHBhdGguam9pbihwdWJsaWNEaXIsICdvcGVuZ3JhcGguanBlZycpO1xuXG4gICAgICBsZXQgaW1hZ2VFeHQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgICAgaWYgKGZzLmV4aXN0c1N5bmMob3BlbmdyYXBoUG5nUGF0aCkpIHtcbiAgICAgICAgaW1hZ2VFeHQgPSAncG5nJztcbiAgICAgIH0gZWxzZSBpZiAoZnMuZXhpc3RzU3luYyhvcGVuZ3JhcGhKcGdQYXRoKSkge1xuICAgICAgICBpbWFnZUV4dCA9ICdqcGcnO1xuICAgICAgfSBlbHNlIGlmIChmcy5leGlzdHNTeW5jKG9wZW5ncmFwaEpwZWdQYXRoKSkge1xuICAgICAgICBpbWFnZUV4dCA9ICdqcGVnJztcbiAgICAgIH1cblxuICAgICAgaWYgKCFpbWFnZUV4dCkge1xuICAgICAgICBsb2coJ1ttZXRhLWltYWdlc10gT3BlbkdyYXBoIGltYWdlIG5vdCBmb3VuZCwgc2tpcHBpbmcgbWV0YSB0YWcgdXBkYXRlcycpO1xuICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW1hZ2VVcmwgPSBgJHtiYXNlVXJsfS9vcGVuZ3JhcGguJHtpbWFnZUV4dH1gO1xuXG4gICAgICBsb2coJ1ttZXRhLWltYWdlc10gdXBkYXRpbmcgbWV0YSBpbWFnZSB0YWdzIHRvOicsIGltYWdlVXJsKTtcblxuICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZShcbiAgICAgICAgLzxtZXRhXFxzK3Byb3BlcnR5PVwib2c6aW1hZ2VcIlxccytjb250ZW50PVwiW15cIl0qXCJcXHMqXFwvPi9nLFxuICAgICAgICBgPG1ldGEgcHJvcGVydHk9XCJvZzppbWFnZVwiIGNvbnRlbnQ9XCIke2ltYWdlVXJsfVwiIC8+YFxuICAgICAgKTtcblxuICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZShcbiAgICAgICAgLzxtZXRhXFxzK25hbWU9XCJ0d2l0dGVyOmltYWdlXCJcXHMrY29udGVudD1cIlteXCJdKlwiXFxzKlxcLz4vZyxcbiAgICAgICAgYDxtZXRhIG5hbWU9XCJ0d2l0dGVyOmltYWdlXCIgY29udGVudD1cIiR7aW1hZ2VVcmx9XCIgLz5gXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gaHRtbDtcbiAgICB9LFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXREZXBsb3ltZW50VXJsKCk6IHN0cmluZyB8IG51bGwge1xuICBpZiAocHJvY2Vzcy5lbnYuUkVQTElUX0lOVEVSTkFMX0FQUF9ET01BSU4pIHtcbiAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly8ke3Byb2Nlc3MuZW52LlJFUExJVF9JTlRFUk5BTF9BUFBfRE9NQUlOfWA7XG4gICAgbG9nKCdbbWV0YS1pbWFnZXNdIHVzaW5nIGludGVybmFsIGFwcCBkb21haW46JywgdXJsKTtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgaWYgKHByb2Nlc3MuZW52LlJFUExJVF9ERVZfRE9NQUlOKSB7XG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vJHtwcm9jZXNzLmVudi5SRVBMSVRfREVWX0RPTUFJTn1gO1xuICAgIGxvZygnW21ldGEtaW1hZ2VzXSB1c2luZyBkZXYgZG9tYWluOicsIHVybCk7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBsb2coLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgICBjb25zb2xlLmxvZyguLi5hcmdzKTtcbiAgfVxufVxuIl0sImZpbGUiOiIvaG9tZS9ydW5uZXIvd29ya3NwYWNlL3ZpdGUtcGx1Z2luLW1ldGEtaW1hZ2VzLnRzIn0=