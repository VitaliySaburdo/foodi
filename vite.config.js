// Posthtml settings

import path from 'node:path';
import posthtml from 'posthtml';
import include from 'posthtml-include';

function htmlPartials() {
  const partialsDir = path.resolve(process.cwd(), 'src/partials');
  return {
    name: 'html-partials',
    enforce: 'pre',
    async transformIndexHtml(html, ctx) {
      const res = await posthtml([include({ root: process.cwd() })]).process(
        html
      );
      return res.html;
    },
    configureServer(server) {
      server.watcher.add(partialsDir);
    },
  };
}

export default {
  plugins: [htmlPartials()],
};
