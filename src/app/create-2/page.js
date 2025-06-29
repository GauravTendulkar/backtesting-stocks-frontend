import { auth } from "@/auth";
import CollectionOfAllComponents from "@/components/logicUI2/CollectionOfAllComponents"
import { serverSideBackendUrl } from "@/json-data/backendServer";
import { create } from "@/json-data/loading-create"
import { encryptEmail } from "@/utils/crypto";
import axios from "axios";



const Create2 = async ({ }) => {

  const session = await auth();

  console.log("session session session session", session)
  let encryptedEmail
  if (session?.user?.email) {

    encryptedEmail = encryptEmail(session?.user?.email);
    console.log("encryptedEmail", encryptedEmail)
  }
  else {
    encryptedEmail = null
  }


  try {
    const response = await fetch('http://localhost:8000/backend/api/protected/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        encrypted_email: encryptedEmail
      }),
    });

    const data = await response.json();
    console.log('Server response:', data);
  } catch (error) {
    console.error('Error sending encrypted email:', error);
  }


  // await fetch("http://localhost:8000/backend/api/protected/get", {
  //   headers: {
  //     authorization: `Bearer ${session?.accessToken}`,
  //   },
  // });
  let response1
  try {



    response1 = await axios.post(`${serverSideBackendUrl}api/stock-list/get/`, {
      user_email: session?.user?.email || null
    });
    // console.log("getStockData token", response.data)


  }
  catch (error) {

    console.log("Error ", error)

  }

  return (
    <CollectionOfAllComponents valueProp={{
      "stockListName": "default",
      "title": "",
      "description": "",
      "scanCategory": "",
      "tags": "",
      "isPrivate": false,
      "equation": JSON.parse(JSON.stringify(create)),
      // "updated_at": new Date(Date.now()),
      // "created": new Date(Date.now())
    }}
      data={response1?.data}
      session={session}></CollectionOfAllComponents>
  )
}

export default Create2