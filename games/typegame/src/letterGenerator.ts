import { rangeInteger } from "../engine/util/random";



export class LetterGenerator
{

    private static alphabet: string = "a,b,b,b,c,c,c,d,d,d,e," +
                                    "f,f,f,f,g,g,h,h,h,"+
                                    "i,j,j,j,k,k,l,l,l,m,m,m,m,n,n,n,o,"+
                                    "p,p,q,q,q,r,r,s,s,s,t,t,u,"+
                                    "v,v,v,v,w,w,x,x,y,y,z,z,z,z";
    private static alphabetArr: string[];


    static get AlphabetArray(): string[] {
        if (!LetterGenerator.alphabetArr || LetterGenerator.alphabetArr.length == 0 ) {
            LetterGenerator.alphabetArr = LetterGenerator.alphabet.split(",");
        }
        return LetterGenerator.alphabetArr;
    }
    static GetRandomLetter() 
    {
        let randInx = rangeInteger(0, LetterGenerator.AlphabetArray.length);
        return LetterGenerator.alphabetArr[randInx];
    }

}