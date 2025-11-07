import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
// Load .env.local manually (lightweight, avoids requiring the 'dotenv' package)
var envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
    try {
        var raw = fs.readFileSync(envPath, "utf8");
        raw.split(/\r?\n/).forEach(function (line) {
            var trimmed = line.trim();
            if (!trimmed || trimmed.startsWith("#"))
                return;
            var eq = trimmed.indexOf("=");
            if (eq === -1)
                return;
            var key = trimmed.slice(0, eq).trim();
            var val = trimmed.slice(eq + 1).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1);
            }
            process.env[key] = val;
        });
    }
    catch (err) {
        console.warn("Could not read .env.local:", err);
    }
}
var backendPathEnv = process.env.BACKEND_PATH;
if (!backendPathEnv) {
    console.error("❌ BACKEND_PATH is not set in .env.local");
    process.exit(1);
}
var BACKEND_TYPES_PATH = path.resolve("".concat(backendPathEnv, "/src/types/api-types.ts"));
var FRONTEND_TYPES_PATH = path.resolve(__dirname, "../src/types/api-types.ts");
function syncApiTypes() {
    try {
        if (fs.existsSync(BACKEND_TYPES_PATH)) {
            fs.copyFileSync(BACKEND_TYPES_PATH, FRONTEND_TYPES_PATH);
            console.log("✅ Synced API types from backend.");
        }
        else {
            console.warn("⚠️ Backend types not found. Skipping sync.");
        }
    }
    catch (err) {
        console.error("❌ Failed to sync API types:", err);
        process.exit(1);
    }
}
syncApiTypes();
