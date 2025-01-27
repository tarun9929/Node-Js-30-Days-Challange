const urlModel = require("../models/url.model");

async function generateShortUrl(req, res) {
  const { url } = req.body;

  if (url) {
    ({ nanoid } = await import("nanoid"));
    const shortId = nanoid();
    urlModel.create({
      shortId: shortId,
      url: url,
      visitHistory: [],
    });

    res.status(201).json({ message: "created successfully", id: shortId });
  } else {
    res.status(400).json("url is required");
  }
}

async function shortUrl(req, res) {
  const { shortId } = req.params;

  const urlRes = await urlModel.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestemp: Date.now(),
        },
      },
    }
  );

  res.redirect(urlRes.url);
}

module.exports = { generateShortUrl, shortUrl };
