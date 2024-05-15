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
export async function addTransaction(userId,transaction,description){
    const res = await databases.getDocument(
        process.env.NEXT_PUBLIC_APP_DATABASE_ID,
        process.env.NEXT_PUBLIC_APP_COLLECTION_ID,
        userId
    );
    res = res.documents[0].transaction.push(transaction);
    res = res.documents[0].netstatus + transaction;
    res = res.documents[0].transactiondescription.push(description);
    console.log(await databases.updateDocument(
        process.env.NEXT_PUBLIC_APP_DATABASE_ID,
        process.env.NEXT_PUBLIC_APP_COLLECTION_ID,
        userId,
        res) 
    );
}

export async function updateSavings(userId,saving){
    const res = await databases.getDocument(
        process.env.NEXT_PUBLIC_APP_DATABASE_ID,
        process.env.NEXT_PUBLIC_APP_COLLECTION_ID,
        userId
    );
    res = res.documents[0].savings + saving;
    console.log(await databases.updateDocument(
        process.env.NEXT_PUBLIC_APP_DATABASE_ID,
        process.env.NEXT_PUBLIC_APP_COLLECTION_ID,
        userId,
        res) 
    );
}