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
    var res = await databases.getDocument(
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
    var res = await databases.getDocument(
        process.env.NEXT_PUBLIC_APP_DATABASE_ID,
        process.env.NEXT_PUBLIC_APP_COLLECTION_ID,
        userId
    );
    res = res.documents[0].savingsnet + saving;
    res = res.documents[0].savings.push(saving);
    console.log(await databases.updateDocument(
        process.env.NEXT_PUBLIC_APP_DATABASE_ID,
        process.env.NEXT_PUBLIC_APP_COLLECTION_ID,
        userId,
        res) 
    );
}

export async function addInvestment(userId,investment,description){
    var res = await databases.getDocument(
        process.env.NEXT_PUBLIC_APP_DATABASE_ID,
        process.env.NEXT_PUBLIC_APP_COLLECTION_ID,
        userId
    );
    res = res.documents[0].totalinvestment + investment;
    res = res.documents[0].investments.push(investment);
    res = res.documents[0].investmentsdescription.push(description);
    console.log(await databases.updateDocument(
        process.env.NEXT_PUBLIC_APP_DATABASE_ID,
        process.env.NEXT_PUBLIC_APP_COLLECTION_ID,
        userId,
        res) 
    );
}

export async function getData(userId){
    userId = userId;
    const res  = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APP_DATABASE_ID,
        process.env.NEXT_PUBLIC_APP_COLLECTION_ID,
        [Query.equal('userid', [userId])]
    )
    console.log(res,'here')
    const final = {
        transactions : res.documents[0].transaction,
        transactiondescription : res.documents[0].transactiondescription,
        netstatus : res.documents[0].netstatus,
        savings : res.documents[0].savings,
        savingsnet : res.documents[0].savingsnet,
        investments : res.documents[0].investments,
        investmentsdescription : res.documents[0].investmentsdescription,
        totalinvestment : res.documents[0].totalinvestment
    }
    console.log(final)
    return final;
}