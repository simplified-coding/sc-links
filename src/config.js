import path from "path";
import AIRTABLE from "airtable";
import { fileURLToPath } from "url";
import { config } from "dotenv";

// Configure dotenv
config();

export const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const airtable = new AIRTABLE({ apiKey: process.env.AIRTABLE_API }).base(
  process.env.AIRTABLE_BASE
);
