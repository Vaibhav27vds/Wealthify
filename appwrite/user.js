import { Client, Databases, ID, Query } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APP_PROJECT_ID);

const databases = new Databases(client);

export async function setUpUser(userId) {
    const checkUser = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APP_DATABASE_ID,
        process.env.NEXT_PUBLIC_APP_COLLECTION_ID,
        [Query.equal('userid', userId)]
    );
    if (checkUser.documents.length === 0) {
        const usr = await databases.createDocument(
            process.env.NEXT_PUBLIC_APP_DATABASE_ID,
            process.env.NEXT_PUBLIC_APP_COLLECTION_ID,
            userId,
            {
                userid: userId
            }
        );
        console.log('User created',usr);
        return "user created";
    }
    console.log('User exists',checkUser);
    return "user exists";
}
export async function addTransaction(userId,transaction){
    const res = databases.updateDocument(
        process.env.NEXT_PUBLIC_APP_DATABASE_ID,
        process.env.NEXT_PUBLIC_APP_COLLECTION_ID,
        userId,
        
    )
}