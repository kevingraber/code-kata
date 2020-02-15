const { sentence } = require('./data');
const poe = require('./poe');
const hp = require('./hp');
const fs = require('fs');

const SOURCES_DIRECTORY = './Sources';
const TESTMAP = new Map();

fs.readdir(SOURCES_DIRECTORY, (err, files) => {
    if ( err ) {
        console.log('ERROR!', err);
    } else {
        // console.log('FILES', files);
        // logFile(files[0]);
        files.forEach(path => {
            const text = readFile(path);
            mapText(strip(text));
        });
    }
    console.log('MMAAPP', TESTMAP);
});

function readFile(filePath) {
    const data = fs.readFileSync(`${SOURCES_DIRECTORY}/${filePath}`, {encoding: 'utf8'});
    console.log('DATA', data)
    return data;
}

return;

// Remove everything but letters & spaces
function strip(text) {
    console.log('TEXT BEFROE', text);
    const myreg = new RegExp(/(\r\n)/g);
    const myafter = text.replace(myreg, ' ');
    const regex = new RegExp(/[^A-Za-z ]/g);
    const after = myafter.replace(regex, '');
    console.log('AFTER', after)
    return after;
}

// Parses text and creates map of data
function mapText(text) {
    const split = text.split(' ');

    for ( let i = 0; i < split.length - 3; i++ ) {
        const wordOne = split[i].toLowerCase();
        const wordTwo = split[i+1].toLowerCase();
        const wordThree = split[i+2].toLowerCase();

        const key = `${wordOne} ${wordTwo}`;

        if ( !TESTMAP.has(key) ) {
            TESTMAP.set(key, [wordThree])
        } else {
            TESTMAP.get(key).push(wordThree);
        }
    }
}

// Parses text and creates map of data
function createMap(text) {
    const map = new Map();
    const split = text.split(' ');

    for ( let i = 0; i < split.length - 3; i++ ) {
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

// Actually run the program!
// TODO - Coming Soon!
// const data = ...
// strip(rawText);
// createMap(strippedText);
// generateText('start', mappedText)
