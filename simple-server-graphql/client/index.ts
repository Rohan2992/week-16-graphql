import { Chain } from "./zeus";

const chain = Chain("http://localhost:4000/graphql");

async function send() {
  try {
    const response = await chain("mutation")({
      createUser: [
        {
          input: {
            email: "Rohan@gmail.com",
            firstname: "Rohan",
            lastname: "Chaudhary"
          }
        },
        {
          id: true,
          email: true
        }
      ]
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

send();
