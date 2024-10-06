
"use client";

import { useContext, useState, useEffect } from 'react';
import { EquationContext } from '@/app/context/EquationContext';


import EquationUI from '@/components/logicUI/EquationUI';


export default function EntryUI(props){

    // const {createEquation, setcreateEquation} = useContext(EquationContext);
    const [createEquation, setcreateEquation] = useState([{
      "AND": [{ "condition": [{ "indicator": [{"value": "=-10", "label":"=-10" },
        { "value": 60, "label": "1h" },
        {"value": "sma"},
        {"value":"close"},
        {"value":20}
      ] }] },
      { "AND": [{ "condition": [{ "indicator": [{"value": "=-10", "label":"=-10" },
        { "value": 60, "label": "1h" },
        {"value": "sma"},
        {"value":"close"},
        {"value":20}
      ] }] }, { "condition": [{ "indicator": [{"value": "=-10", "label":"=-10" },
        { "value": 60, "label": "1h" },
        {"value": "sma"},
        {"value":"close"},
        {"value":20}
      ] }] }] }]
    }
    ])


    useEffect(() => {
        console.log("createEquation")
        console.log(createEquation)
      }, [createEquation]);

    const passToMain = (arr, id, objName)=>{
      
  
  
      let temp = createEquation
      temp[id][objName] = arr
      setcreateEquation([...temp])
      props.getEntry([...temp])
    }
  
    const changeKeyOfMain = (arr, id, objName)=>{
      
  
      let temp = [...createEquation]
      if (objName == 'AND'){
        delete temp[id][objName];
        temp[id]['OR'] = arr
      }
      else if(objName == 'OR'){
        delete temp[id][objName];
        temp[id]['AND'] = arr
  
      }
    
    
      setcreateEquation([...temp])
      props.getEntry([...temp])
    }


    return(
        <>
        
        <div className=' mx-auto'>
    
          {createEquation.map((e, id)=>{
            
            if (Object.keys(createEquation[id])[0] == 'AND'){
              return <EquationUI key={id} index={id} level={0} passToMain={passToMain} objName={Object.keys(createEquation[id])} changeKeyOfMain={changeKeyOfMain}  objectPass={e["AND"]} ></EquationUI>
              
            }
            else if (Object.keys(createEquation[id])[0] == 'OR'){
              return <EquationUI key={id} index={id} level={0} passToMain={passToMain} objName={Object.keys(createEquation[id])} changeKeyOfMain={changeKeyOfMain} objectPass={e["OR"]} ></EquationUI> 
              
            }
            
    
          })}
        </div>
        
        
    
        
        
        </>
    );

}

