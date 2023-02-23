import React,{useState} from 'react';


const AddSubject = () => {
    const [subject,setSubject] = useState("")
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setSubject(e.target.value)
    }
    const submit = ()=>{
        fetch(`http://localhost:3003/subjects`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({title:subject})
        })
        .then(res=>{
            console.log(res);
            if(res.ok){
                alert("과목이 추가되었습니다.")
            }
        })
        .catch(e=>console.log(e))
    }
    return (
        <div>
            <input type="text" name='subject' onChange={onChange}/>
            <button onClick={submit}>추가하기</button>
        </div>
    );
};

export default AddSubject;