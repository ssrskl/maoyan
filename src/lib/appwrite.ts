import { Account, Client, Databases } from "appwrite";

export const client = new Client();
client
    .setEndpoint('https://14.103.163.102/v1')
    .setProject('681f3ee6001196d70911');

export const account = new Account(client);
export const databases = new Databases(client);
export { ID } from "appwrite";

