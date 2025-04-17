
export const hashLink=(len:number)=>{
    const alplabet="eoaweodfdvuamdfipwfmcoparei";
    let alpaLength=alplabet.length;

    let ans="https:/"

    for(let i=0;i<len;i++){
         ans+=alplabet[Math.floor((Math.random()*alpaLength))]
    }

    return ans+".com"
}