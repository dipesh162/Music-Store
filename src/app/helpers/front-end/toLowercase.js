export default function toLowercase(string){
    // const mySentence = "freeCodeCamp is an awesome resource";
    // const words = string.split(" ");

    return string.split(" ").map((word) => { 
        return word[0].toLowerCase() + word.substring(1); 
    }).join(" ");
}