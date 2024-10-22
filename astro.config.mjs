import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import { marked } from 'marked';


marked.use({
  breaks: true,
  gfm: true
});


import dotenv from 'dotenv';

dotenv.config();

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: "standalone"
  })
});
