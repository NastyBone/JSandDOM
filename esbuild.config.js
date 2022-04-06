import esbuildServe from "esbuild-serve";

esbuildServe(
  {
    logLevel: "info",
    entryPoints: ["handler.mjs"],
    bundle: true,
    outfile: "out.js",
  }
);