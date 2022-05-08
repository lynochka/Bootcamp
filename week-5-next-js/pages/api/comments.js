import comments from "../../comments.json";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      res.status(200).json(comments);
      break;
    case "POST":
      //...handle the POST request here
      break;
    default: //no other method is allowed, so we return a "405 Method Not Allowed" error
      res.status(405).end();
      break;
  }
}
