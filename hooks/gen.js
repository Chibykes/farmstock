let string = "abcdefghijklmnopqrstuvwxyz0123456789";
export default function gen(length) {
    let str = "";
    for(let i = 0; i < length; i++){
        str += string[Math.floor(Math.random() * string.length)];
        if(i === length-1) continue;
        if(((i+1) % 4) === 0) str += "-";
    }

    return str;
}