const https = require("https");
const fs = require("fs");
const url = "https://petstore3.swagger.io/api/v3/openapi.json";
const filePath = "api.spec.json";

https
  .get(url, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      fs.writeFile(filePath, data, (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("File saved successfully.");
        }
      });
    });
  })
  .on("error", (err) => {
    console.error("Error fetching URL:", err);
  });
