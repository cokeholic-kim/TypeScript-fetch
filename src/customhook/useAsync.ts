import { useEffect, useReducer } from "react";

//상태를 위한 타입
export type SubjectdataType = {
    id:number;
    title: string;
}
export type ListdataType = {
    id:number,
    subjects:number,
    name:string,
    type:string,
    syntax:string,
    desc: string
}
export type funState = {
    loading:boolean;
    data: null | SubjectdataType[] | ListdataType[];
    error: null | object;
}
//모든 액션을 위한 타입
type funAction = {type:'LOADING'} | {type: 'SUCCESS',data:SubjectdataType [] | ListdataType []}
|{type:'ERROR',err:any}

function reducer(state:funState,action:funAction){
    switch(action.type){
        case 'LOADING':
            return{
                loading:true,
                data:null,
                error:null
            };
        case 'SUCCESS':
            return{
                loading:false,
                data:action.data,
                error:null
            }
        case 'ERROR':
            return{
                loading:false,
                data:null,
                error:action.err
            }
        default:
            return state
    }
}
type fetch = () => void;
const useAsync = (callback: any,deps=[]):[funState,fetch] =>{
    const [state,dispatch] = useReducer(reducer,{
        loading:false,
        data:null,
        error:null
    })

    const fetchData = async ()=>{
        dispatch({type:'LOADING'})
        try{
            const data = await callback();
            dispatch({type:'SUCCESS',data})
        }
        catch(e){
            dispatch({type:'ERROR',err:e})
        }
    }
    useEffect(()=>{
        fetchData();
    },deps)
    return [state,fetchData]
}
export default useAsync