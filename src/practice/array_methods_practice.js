console.log('hello');
const arr = [1,2,3,4];
let total = 0 ;
for(let elem of arr ){
    total+=elem;
}
console.log(total)

const words = ["cat", "car", "banana", "bat"];
words.reduce((acc, word)=> {
    let letter = word[0];
    acc[letter]
}

,{})