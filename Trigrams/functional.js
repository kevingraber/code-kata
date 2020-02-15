const fs = require('fs');

// const SOURCES_DIRECTORY = './Sources';
const SOURCES_DIRECTORY = './test';

const TESTMAP = new Map();
let mostCommonFrequency = 0;
let mostCommonPair = null;


const processText = pipe(
    readFile,
    // stripNewLines,
    // spreadPeriod,
    // stripCharacters,
    splitText,
    mapText,
);

fs.readdir(SOURCES_DIRECTORY, (err, files) => {
    if ( err ) {
        console.log('There was an error :(', err);
    } else {
        console.log(files);

        files.forEach(path => processText(path));

        // const arr = TESTMAP.get('i could')
        // let obj = {}
        // arr.forEach(word => {
        //     if ( obj[word] ) {
        //         obj[word]++;
        //     } else {
        //         obj[word] = 1;
        //     }
        // });
        // console.log(obj)
        // const story = generateStory('i could');
        // console.log(story)
        // console.log(TESTMAP)
    }
});

// const testing = pipe(
//     spreadPeriod,
//     stripCharacters,
//     splitText
// )
// console.log(testing('I went to the store yesterday. I bought some eggs and milk.'))

function pipe(...funcs) {
    // return function(data) {
    //     let input = data;
    //     funcs.forEach(func => {
    //         input = func(input);
    //     });
    //     return input;
    // }

    // accumulator is the body of text
    // currentValue will be the current function
    // we want to call each function on the result of the last one
    // const cb = (accumulator, currentValue) => currentValue(accumulator)
    // return function(value) {
    //     return funcs.reduce(cb, value);
    // }

    const cb = (text, func) => func(text);
    return (input) => funcs.reduce(cb, input);
}

function readFile(filePath) {
    const data = fs.readFileSync(`${SOURCES_DIRECTORY}/${filePath}`, { encoding: 'utf8' } );
    console.log(JSON.stringify(data))
    return data
}

function stripNewLines(text) {
    const regex = new RegExp(/(\r\n)/g);
    return text.replace(regex, ' ');
}

// Remove everything but letters & spaces
function stripCharacters(text) {
    const regex = new RegExp(/[^A-Za-z .]/g);
    return text.replace(regex, '');
}

function spreadPeriod(text) {
    const regexp = new RegExp(/\./);
    return text.replace(regexp, ' .');
}

function splitText(text) {
    const data = text.split(' ');
    return data;
}

// Parses text and creates map of data
function mapText(text) {
    for ( let i = 0; i < text.length - 3; i++ ) {
        const wordOne = text[i].toLowerCase();
        const wordTwo = text[i+1].toLowerCase();
        const wordThree = text[i+2].toLowerCase();

        const key = `${wordOne} ${wordTwo}`;

        if ( !TESTMAP.has(key) ) {
            TESTMAP.set(key, [wordThree]);
        } else {
            TESTMAP.get(key).push(wordThree);
            const len = TESTMAP.get(key).length;
            if ( len > mostCommonFrequency ) {
                mostCommonFrequency = len;
                mostCommonPair = key;
            }
        }
    }
}

function generateStory(seed) {
    let currentPair = seed;
    let story = seed;
    let newPair = null;

    for (var i = 0; i < 50; i++ ) {
        const arrayOfPossibilities = TESTMAP.get(currentPair);
        const nextWord = getRandomWordFromArray(arrayOfPossibilities);
        story += ` ${nextWord}`;
        const [firstWord, secondWord] = currentPair.split(' ');
        currentPair = `${secondWord} ${nextWord}`;
    }
    return story;
}

// Parses text and creates map of data
function createMap(text) {
    const map = new Map();
    const split = text.split(' ');

    for ( let i = 0; i < split.length - 2; i++ ) {
        const wordOne = split[i].toLowerCase();
        const wordTwo = split[i+1].toLowerCase();
        const wordThree = split[i+2].toLowerCase();

        const key = `${wordOne} ${wordTwo}`;

        if ( !map.has(key) ) {
            map.set(key, [wordThree])
        } else {
            map.get(key).push(wordThree);
        }
    }

    return map;
}

function generateText(start, data) {
    let current = start;
    let story = start;
    let iterator = 0;

    while ( iterator < 50 ) {
        let array = data.get(current);
        let next = getRandomWordFromArray(array);

        story += ` ${next}`;
        current = `${current.split(' ')[1]} ${next}`;
        iterator++;
    }
    console.log('STORY:', story);
}

// ...Grabs a random word from array...
function getRandomWordFromArray(array) {
    const index = Math.floor( Math.random() * array.length );
    return array[index];
}
