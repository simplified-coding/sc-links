import express from "express";
import cors from "cors";
import { __dirname, airtable } from "./config.js";

// Configure express
const app = express();
app.use(cors());
app.use("/styles/", express.static(`${__dirname}/public/styles/`));

app.get("/", (_, res) => {
  res.status(200).sendFile(`${__dirname}/public/index.html`);
});

app.get("/404", (_, res) => {
  res.status(404).sendFile(`${__dirname}/public/404.html`);
});

app.get("/409", (_, res) => {
  res.status(409).sendFile(`${__dirname}/public/409.html`);
});

app.get("/:slug", (req, res) => {
  airtable("URLS")
    .select({
      maxRecords: 1,
      view: "Grid",
      filterByFormula: `{Slug} = "${req.params.slug}"`,
      fields: ["Redirect", "Active"],
    })
    .firstPage((_, records) => {
      if (records[0]) {
        if (records[0].get("Active")) {
          res.redirect(records[0].get("Redirect"));
        } else {
          res.redirect("/409");
        }
      } else {
        res.redirect("/404");
      }
    });

  //   res.end("SLUG");
});

app.listen(process.env.PORT || 3030, () => {
  console.log(`Server is running on port: ${process.env.PORT || 3030}`);
});
