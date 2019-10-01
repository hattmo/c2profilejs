import { Router } from "express";

const router = Router();

router.get("*", (_req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>C2 Profile JS</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <link rel="shortcut icon" href="${process.env.APP_ROOT || ""}/static/favicon.png">
      <style>
        @font-face {
          font-family: Futura;
          src: url("${process.env.APP_ROOT || ""}/static/futura.ttf");
        }
      </style>
    </head>
    <body>
      <script>window.APP_ROOT = "${process.env.APP_ROOT || ""}"</script>
      <script type="text/javascript" src="${process.env.APP_ROOT || ""}/static/bundle.js"></script>
    </body>
  </html>
  `);
});

export default router;
