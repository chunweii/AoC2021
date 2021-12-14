import * as fs from 'fs';
import * as path from 'path';



let lines : string[];

fs.readFile(path.join(__dirname, "input.txt"), (err, data) => {
    if (err) throw err;
    lines = data.toString().trim().split('\n');
    let currentLine : string = lines[0];
    const firstChar = currentLine.charAt(0);
    const lastChar = currentLine.charAt(currentLine.length - 1);
    let currentLinePairMap : Map<string, number> = new Map();
    const emptyLinePairMap : Map<string, number> = new Map();

    const mapOfPolymers : Map<string, string> = new Map<string, string>();
    
    for (let i = 2; i < lines.length; ++i) {
        let arr = lines[i].split(" -> ");
        mapOfPolymers.set(arr[0], arr[1]);
        emptyLinePairMap.set(arr[0], 0);
    }
    
    emptyLinePairMap.forEach((v, k, m) => currentLinePairMap.set(k, v));
    for (let i = 0; i < currentLine.length - 1; i++) {
        const str = currentLine.charAt(i) + currentLine.charAt(i + 1);
        currentLinePairMap.set(str, (currentLinePairMap.get(str) || 0) + 1);
    }

    // for (const [key, value] of currentLinePairMap) {
    //     console.log(key + " " + value);
    // }

    // mapOfPolymers.forEach((v, k, m) => console.log(k + " " + v));

    for (let i = 0; i < 40; i++) {
        const tempMap : Map<string, number> = new Map();
        emptyLinePairMap.forEach((v, k, m) => tempMap.set(k, v));
        for (const [key, value] of currentLinePairMap) {
            if (value == 0) continue;
            const newElement : string | undefined = mapOfPolymers.get(key);
            if (newElement != undefined) {
                const str1 = key.charAt(0) + newElement;
                const str2 = newElement + key.charAt(1);
                tempMap.set(str1, (tempMap.get(str1) || 0) + value);
                tempMap.set(str2, (tempMap.get(str2) || 0) + value);
            } else {
                tempMap.set(key, (tempMap.get(key) || 0) + value);
            }
        }
        currentLinePairMap = tempMap;
    }

    const freqTable : Map<string, number> = new Map();
    freqTable.set(lastChar, 1);
    freqTable.set(firstChar, 1);
    for (const [key, value] of currentLinePairMap) {
        // console.log(key + " " + value);
        freqTable.set(key.charAt(0), (freqTable.get(key.charAt(0)) || 0) + value);
        freqTable.set(key.charAt(1), (freqTable.get(key.charAt(1)) || 0) + value);
    }
    for (const [key, value] of freqTable) {
        freqTable.set(key, value / 2);
    }
    console.log(Math.max(...freqTable.values()) - Math.min(...freqTable.values()));
});

