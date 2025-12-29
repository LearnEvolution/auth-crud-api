import Item from "../models/Item.js";

export async function createItem(req, res) {
  const item = await Item.create({
    title: req.body.title,
    userId: req.userId
  });
  res.json(item);
}

export async function getItems(req, res) {
  const items = await Item.find({ userId: req.userId });
  res.json(items);
}
