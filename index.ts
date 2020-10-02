import { Application } from "https://deno.land/x/oak/mod.ts";
import router from './routes/routes.ts';

const port = 8000;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Open: http://localhost:${port}/api/movies`)
await app.listen({ port });