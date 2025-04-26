import { Account, Client, Databases } from "appwrite";

export const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("674a65d5003be3b88559");

export const account = new Account(client);
export const databases = new Databases(client);
export { ID } from "appwrite";