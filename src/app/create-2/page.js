import CollectionOfAllComponents from "@/components/logicUI2/CollectionOfAllComponents"
import { create } from "@/json-data/loading-create"



const Create2 = ({ }) => {




  return (
    <CollectionOfAllComponents valueProp={{
      "stockListName": "default",
      "title": "",
      "description": "",
      "scanCategory": "",
      "isPrivate":false,
      "equation": JSON.parse(JSON.stringify(create)),
      // "updated_at": new Date(Date.now()),
      // "created": new Date(Date.now())
    }}></CollectionOfAllComponents>
  )
}

export default Create2