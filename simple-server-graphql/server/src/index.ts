import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import * as path from "path";

const fs = require("fs");

const schemaString = fs.readFileSync(
  path.join(__dirname, "./schema.gql"),
  "utf8"
);

const schema = buildSchema(schemaString);

const authMiddleware = (req: any, res: any, next: any) => {
  req.authHeader = req.headers.authorization;
  next();
};

const root = {
  getUser: ({ id }: { id: any }, req: any) => {
    console.log(req.headers);

    if (id === "1") {
      return {
        id: "1",
        email: "Rohan@123.com",
        firstname: "Rohan",
        lastname: "Chaudhary"
      };
    }
    return null;
  },
  createUser: ({ input }: { input: any }, req: any) => {
    console.log(req.authHeader);
    return { id: "2", ...input };
  }
};

const app = express();

app.get("/healthCheck", (req, res) => {
  res.json({ msg: "Hii" });
});

app.use(
  "/graphql",
  authMiddleware,
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(
    `Running a GraphQL Api server at http://localhost:${PORT}/graphql`
  );
});
