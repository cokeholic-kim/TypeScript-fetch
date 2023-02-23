import React from 'react';
import styled from 'styled-components';
import useAsync, { ListdataType } from '../customhook/useAsync';

async function getData(){
    try{
        const response = await fetch(`http://localhost:3003/functions`)
        const data = await response.json();
        return data
    }
    catch(e){
        console.log(e)
    }
}
const ListWrapper = styled.div`
    text-align:center;
    h2{
        padding:50px;
        font-size:28px;
    }
    table{
        width:100%;
        max-width:1100px;
        margin:0 auto;
        border-collapse: collapse;
        th{
            border-top: 3px solid #333;
            border-bottom: 1px solid #ccc;
            padding:20px;
        }
        td{
            padding:20px;
            border-bottom: 1px solid #ccc;
        }
    }
`
type ListProps = {
    subject:number;
}
const Lists = ({subject}:ListProps) => {
    const [functions,fetchData] = useAsync(getData);
    let {data,loading,error} = functions;
    if(loading) return <div>로딩중</div>
    if(error) return <div>에러발생</div>
    if(!data) return <div>데이터 없음</div>
    if(data){
        if(subject > 0){
                data = (data as Array<ListdataType>).filter(da=>da.subjects == subject)
        }
    }
    return (
        <ListWrapper>
            <h2>주요 내장 함수</h2>
            <table>
                <tbody>
                    <tr>
                        <th>번호</th>
                        <th>함수명</th>
                        <th>데이터타입</th>
                        <th>구문</th>
                        <th>설명</th>
                    </tr>
                    {(data as Array<ListdataType>).map(da=><tr key={da.id}>
                        <td>{da.id}</td>
                        <td>{da.name}</td>
                        <td>{da.type}</td>
                        <td>{da.syntax}</td>
                        <td>{da.desc}</td>
                    </tr>)}
                </tbody>
            </table>
        </ListWrapper>
    );
};

export default Lists;