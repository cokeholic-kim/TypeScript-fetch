import React, { useState } from 'react';

// "subjects": 1,
// "name": "replace()",
// "type": "string",
// "syntax": "문자열.replace('a','b')",
// "desc": "문자열에있는 a를 b로 변경"

const AddFunctions = () => {
    const [functions,setFunctions] = useState({
        subjects:1,
        name:"",
        type:"",
        syntax:"",
        desc:""
    })
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFunctions({
            ...functions,
            [e.target.name]:e.target.name === "subjects" ? Number(e.target.value):e.target.value
        })
        console.log(functions)
    }
    const submit = (e:React.FormEvent<HTMLElement>) =>{
        e.preventDefault();
        fetch(`http://localhost:3003/functions`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(functions)
        })
        .then(res=>{
            console.log(res);
            if(res.ok){
                alert("function added")
            }
        })
        .catch(e=>console.log(e))
    }
    


    return (
        <div>
            <form>
                <p><input type="number" name='subjects' value={functions.subjects} onChange={onChange} placeholder="과목"/></p>
                <p><input type="text" name="name" value={functions.name} onChange={onChange} placeholder="이름"/></p>
                <p><input type="text" name="type" value={functions.type} onChange={onChange} placeholder="타입"/></p>
                <p><input type="text" name='syntax' value={functions.syntax} onChange={onChange} placeholder="구문"/></p>
                <p><input type="text" name='desc' value={functions.desc} onChange={onChange} placeholder="설명"/></p>
                <button onClick={submit}>추가하기</button>
            </form>
        </div>
    );
};

export default AddFunctions;