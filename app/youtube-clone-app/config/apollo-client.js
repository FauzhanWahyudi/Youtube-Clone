import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://6092-139-228-111-126.ngrok-free.app/:3000",
  cache: new InMemoryCache(),
});

export default client;
