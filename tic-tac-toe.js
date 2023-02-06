const symbol = {
    '1': ':one:',
    '2': ':two:',
    '3': ':three:',
    '4': ':four:',
    '5': ':five:',
    '6': ':six:',
    '7': ':seven:',
    '8': ':eight:',
    '9': ':nine:'
  };
  const players = {};
  const field = {
    '1': ' ',
    '2': ' ',
    '3': ' ',
    '4': ' ',
    '5': ' ',
    '6': ' ',
    '7': ' ',
    '8': ' ',
    '9': ' '
  };
  
  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
  client.on('message', message => {
    if (message.content === '!tic start') {
      const player1 = message.author;
      players[player1.id] = 'X';
      message.channel.send(`${player1} joined the game as X. Waiting for another player...`);
    } else if (message.content === '!tic join') {
      if (Object.keys(players).length === 1) {
        const player2 = message.author;
        players[player2.id] = 'O';
        message.channel.send(`${player2} joined the game as O. The game has started!`);
        message.channel.send(
          `\`\`\`
  ${symbol['1']} | ${symbol['2']} | ${symbol['3']}
  ---------
  ${symbol['4']} | ${symbol['5']} | ${symbol['6']}
  ---------
  ${symbol['7']} | ${symbol['8']} | ${symbol['9']}
  \`\`\``
        );
      } else if (Object.keys(players).length === 2) {
        message.reply(`Two players are already in the game. Please wait for another round.`);
      } else {
        message.reply(`No game is currently in progress. Please start a new game with !tic start.`);
      }
    } else if (message.content.startsWith('!tic move')) {
      const [_, move] = message.content.split(' ');
      if (Object.keys(players).includes(message.author.id) && field[move] === ' ') {
        field[move] = players[message.author.id];
        symbol[move] = players[message.author.id] === 'X' ? ':x:' : ':o:';
        message.channel.send(
          `\`\`\`
  ${symbol['1']} | ${symbol['2']} | ${symbol['3']}
  ---------
  ${symbol['4']} | ${symbol['5']} | ${symbol['6']}
  ---------
  ${symbol['7']} | symbol['8']} | ${symbol['9']}
  \`\`\``
        );
        const winner = checkWinner();
        if (winner) {
          message.channel.send(`${winner} won the game!`);
          reset();
        } else if (checkDraw()) {
          message.channel.send(`The game is a draw!`);
          reset();
        }
      } else {
        message.reply(`Invalid move. Please try again.`);
      }
    }
  });
  
  function checkWinner() {
    if (
      (field['1'] === field['2'] && field['2'] === field['3'] && field['1'] !== ' ') ||
      (field['4'] === field['5'] && field['5'] === field['6'] && field['4'] !== ' ') ||
      (field['7'] === field['8'] && field['8'] === field['9'] && field['7'] !== ' ') ||
      (field['1'] === field['4'] && field['4'] === field['7'] && field['1'] !== ' ') ||
      (field['2'] === field['5'] && field['5'] === field['8'] && field['2'] !== ' ') ||
      (field['3'] === field['6'] && field['6'] === field['9'] && field['3'] !== ' ') ||
      (field['1'] === field['5'] && field['5'] === field['9'] && field['1'] !== ' ') ||
      (field['3'] === field['5'] && field['5'] === field['7'] && field['3'] !== ' ')
    ) {
      return Object.keys(players).find(key => players[key] === field[Object.keys(field).find(key => field[key] !== ' ')]) || 'No one';
    }
    return '';
  }
  
  function checkDraw() {
    return Object.values(field).filter(val => val === ' ').length === 0;
  }
  
  function reset() {
    players = {};
    field = {
      '1': ' ',
      '2': ' ',
      '3': ' ',
      '4': ' ',
      '5': ' ',
      '6': ' ',
      '7': ' ',
      '8': ' ',
      '9': ' '
    };
    symbol = {
      '1': ':one:',
      '2': ':two:',
      '3': ':three:',
      '4': ':four:',
      '5': ':five:',
      '6': ':six:',
      '7': ':seven:',
      '8': ':eight:',
      '9': ':nine:'
    };
  }