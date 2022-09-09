import countries from "./Countries";

export default function Allcountries (){
let Allcountry = countries();
let arr =[]
for (let x in Allcountry) {
    arr.push(
        {name: Allcountry[x],
        code:x}
        )
  }

 return(arr);

}