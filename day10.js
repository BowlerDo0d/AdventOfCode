function log(msg, value) {
    if (debug) {
        if (msg && (value || value === 0)) {
            console.log(msg, value);
        } else {
            console.log(msg);
        }
    }
}

var fs = require('fs'),
  input = fs.readFileSync('./day10input.txt', { encoding: 'utf-8' }).split('\n'),
  debug = false,
  bots = [],
  bins = [],
  distributors = [],
  setups = [];

function initBot(botId, value) {
  bots[botId] = {
    high: {
      value: value,
      sendTo: {
        type: null, // bot or bin
        id: null
      },
      isFull: (value !== null)
    },
    low: {
      value: null,
      sendTo: {
        type: null, // bot or bin
        id: null
      },
      isFull: false
    }
  };
}

function addToBot(botId, value) {
  var bot = bots[botId];

  if (!bot.high.isFull || !bot.low.isFull) {
    if (bot.high.isFull) {
      if (bot.high.value > value) {
        // Add to low spot
        bot.low.value = value;
        bot.low.isFull = true;
      } else {
        // Move high to low spot and add to high spot
        bot.low.value = bot.high.value;
        bot.low.isFull = true;
        bot.high.value = value;
        bot.high.isFull = true; // Just for visibility
      }
    } else {
      if (bot.low.value < value) {
        // Add to high spot
        bot.high.value = value;
        bot.high.isFull = true;
      } else {
        // Move low to high and add to low spot
        bot.high.value = bot.low.value;
        bot.high.isFull = false;
        bot.low.value = value;
        bot.low.isFull = true; // Just for visibility
      }
    }
  } else {
    console.log('Bot does not have room for new chips, WTF!');
  }
}

function disperseBot(botId) {
  log('Dispersing bot ' + botId);
  var thisBot = bots[botId];

  // Check if bot is full
  if (thisBot.high.isFull && thisBot.low.isFull) {
    ['high', 'low'].forEach(function (valueType) {
      if (thisBot[valueType].sendTo.type === 'output') {
        if (!bins[thisBot[valueType].sendTo.id]) {
          bins[thisBot[valueType].sendTo.id] = [];
        }

        bins[thisBot[valueType].sendTo.id].push(thisBot[valueType].value);
        thisBot[valueType].isFull = false;
      } else if (thisBot[valueType].sendTo.type === 'bot') {
        addToBot(thisBot[valueType].sendTo.id, thisBot[valueType].value);
        thisBot[valueType].isFull = false;

        disperseBot(thisBot[valueType].sendTo.id);
      }
    });
  }
}

input.forEach(function (instruction) {
  var pieces = instruction.split(' ');

  if (pieces[0] === 'value') {
    distributors.push({
      chipId: parseInt(pieces[1], 10),
      botId: parseInt(pieces[5], 10)
    });
  } else if (pieces[0] === 'bot') {
    setups.push({
      botId: parseInt(pieces[1], 10),
      sendLowTo: {
        type: pieces[3] === 'low' ? pieces[5] : pieces[10],
        id: pieces[3] === 'low' ? parseInt(pieces[6], 10) : parseInt(pieces[11], 10)
      },
      sendHighTo: {
        type: pieces[8] === 'high' ? pieces[10] : pieces[5],
        id: pieces[8] === 'high' ? parseInt(pieces[11], 10) : parseInt(pieces[6], 10)
      }
    });
  }
});

setups.forEach(function (setup) {
  if (!bots[setup.botId]) {
    initBot(setup.botId, null);
  }

  bots[setup.botId].high.sendTo.type = setup.sendHighTo.type;
  bots[setup.botId].high.sendTo.id = setup.sendHighTo.id;
  bots[setup.botId].low.sendTo.type = setup.sendLowTo.type;
  bots[setup.botId].low.sendTo.id = setup.sendLowTo.id;
});

distributors.forEach(function (distribution) {
  if (!bots[distribution.botId]) {
    // new bot, init!
    initBot(distribution.botId, distribution.chipId);
  } else {
    // bot already was setup, so update
    addToBot(distribution.botId, distribution.chipId);
  }

  disperseBot(distribution.botId);
});

log(bots);
bots.forEach(function (bot, idx) {
  log('Bot ' + idx + ' high send to: ' + bot.high.sendTo.type + ' ' + bot.high.sendTo.id);
  log('Bot ' + idx + ' low send to: ' + bot.low.sendTo.type + ' ' + bot.low.sendTo.id);

  if (bot.high.value === 61 && bot.low.value === 17) {
    console.log('Bot ' + idx);
  }
});
log(bins);

console.log('Part 2: ' + (bins[0][0] * bins[1][0] * bins[2][0]));
