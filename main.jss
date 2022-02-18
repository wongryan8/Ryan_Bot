//Slightly modified public version for privacy reasons

const Discord = require("discord.js") //discord.js
const client = new Discord.Client() //discord client
const keepAlive = require("./server") //server keep alive

client.on("ready", () => { //turn client on immedately
  console.log(`Logged in as $
  {client.user.tag}!`)
}); 

//Set default max listeners (user message inputs) to 100 instead of default 10
require('events').EventEmitter.defaultMaxListeners = 100;

//////////////////////////////////PRINT STATEMENTS//////////////////////////////////////
//Update Log
client.on("message", msg => {
if (msg.content.toLowerCase() === "website") {
  msg.channel.send("https://wongryan8.github.io/recipes/")

} else if (msg.content.toLowerCase() === "updates" || msg.content.toLowerCase() === "update") {
  msg.channel.send("__1/15/22__: Began learning HTML/CSS web development. See my progress at my personal website here: https://wongryan8.github.io/recipes/\n__1/3/22__: Completed Tic-Tac-Toe with the option to play versus other players or RyanBot. Try ***help ttt*** for instructions.\n__12/30/21__: Completed the 21 Pickup Game with full emoji capabilities as user inputs and MongoDB statistics. Try ***pickup*** for instructions.\n__12/19/21__: Completed the stats functionality for Blackjack on MongoDB.\n__12/5/21__: Moved database to Google API and MongoDB to avoid rollback of data. Enhanced blackjack and betting tool functionalities.\n__11/21/21__: Finished the Blackjack game. Try ***help blackjack*** for instructions.\n__11/8/21__: The Betting Tool has been completed. Try ***help bet*** for instructions.\n__11/7/21__: Added ***collect*** and ***balances*** commands for point collection.\n__11/4/21__: Added ***roll*** and ***y/n*** commands.\n__11/1/21__: Ryan Bot was created. Commands include: ***help***, ***ping***.");

//Help Command Log
} else if (msg.content.toLowerCase() === "help") {
  msg.channel.send("__Blackjack__: Try ***help blackjack*** for instructions.\n__Stats__: Try ***stats***, ***stats ryanbot***, or ***stats all*** to view W/L percentages in Blackjack.\n__Tic-Tac-Toe__: Try ***help ttt*** for instructions.\n__21 Pickup__: Try ***pickup*** for instructions.\n__Betting Tool__: Try ***help bet*** for instructions.\n__Point Collection__: Use ***collect*** to randomly obtain 100-1000 points for Blackjack or the Betting Tool. (30 minute cooldown). You may use ***balance*** or ***balance all*** to see your point balances.\n__Text Commands__:\n__0-100% Dice__: Try ***roll***.\n__Yes/No Dice__: Try ***y/n***.\n__Update Log__: Try ***updates***\nOther text commands include: ***ping***, ***player1***, ***roxy***, and ***jackson***.");

//Help Betting Tool 
} else if (msg.content.toLowerCase() === "help bet") {
  msg.channel.send("These commands for the betting tool are in the following order:\n***bet start*** or ***start bet***, to start a bet and activate betting tool\n***bet XXX opt 1*** or ***bet XXX opt 2*** (e.g. bet 500 opt 1) to bet if there is an active bet\n***bet end opt 1***, ***bet end opt 2***, or ***bet end opt x***, to end a bet and payout.");

//Help Blackjack Tool
} else if (msg.content.toLowerCase() === "help blackjack" || msg.content.toLowerCase() === "blackjack help") {
  msg.channel.send(`List of commands in order:\n***blackjack start*** or ***begin***: Begins a game of blackjack.\n***wager XXX***: Set your wager for the upcoming round. If you would like to play without a wager then you can "wager 0"\n***begin***: Use this command AFTER all the wagers have been placed. Only ***one*** person needs to use this command to start the round.\n***hit***: Each participating player must use this command to receive a card. You may use this command as many times as you want per round as long as you do not bust.\n***double down***: You may put down an extra amount of points equal to your previous wager to draw one more card. You may not draw another card afterwards and the command will not work if you have insufficient funds.\n***blackjack end*** or ***end***: Use this command to end the round. The dealer will draw cards and compare with all the users remaining. Payouts will be distributed accordingly.\n***stats***, ***stats ryanbot***, or ***stats all***: View W/L percentages in Blackjack.`);

//Help Tac-Tac-Toe
} else if (msg.content.toLowerCase() === "help ttt" || msg.content.toLowerCase() === "ttt help") {
  msg.channel.send(`__*Instructions:*__ Use the command ***ttt*** to begin. Follow the instructions as intended to get to the game board.\nWhen it is your turn, you may type ***1***, ***2***, ***3***, ***4***, ***5***, ***6***, ***7***, ***8***, or ***9*** to place your tile there. Standard Tic-Tac-Toe rules apply. You cannot place a tile on top of another and you need 3 in a row to win.\nUse the command ***ttt end*** to reset the board.`);

//Help 21 Pickup 
} else if (msg.content.toLowerCase() === "pickup" || msg.content.toLowerCase() === "pickup help") {
  msg.channel.send(`__*Instructions:*__ Use the command ***pickup start*** and click on the corresponding 1, 2, or 3 emojis to draw that respective number of pokemon cards from the pile.\n__*Rules:*__ We start with a pile of 21 pokemon cards. Players take turns removing 1, 2, or 3 pokemon card(s) from the pile using the emojis from 1 to 3. The player that removes the last pokemon card wins! You will be playing with a computer.\n__*Rewards:*__ You will lose 500 points in a defeat and gain 500 points in a victory\n__*Stats:*__: Use the command ***pickup stats***, ***pickup stats ryanbot***, or ***pickup stats all*** to see W/L statistics.`);

//pingpong statement
} else if (msg.content.toLowerCase() === "ping") {
  msg.channel.send("pong")

//random 0-100% chance roll
} else if (msg.content.toLowerCase() === "roll") {
  msg.reply(Math.floor(Math.random() * 101) + "% chance.")

//random yes/no roll
} else if (msg.content.toLowerCase() === "y/n") {
  if (Math.random() < 0.5) {
    msg.reply("Yes!");
  } else {
    msg.reply("No.");
  }
}
});

/////////////////////////////////MONGODB DATABASE///////////////////////////////////////
const Points = require('./models/points');
const Stats = require('./models/stats');
const Pickup = require('./models/pickup');
const mongoose = require('mongoose');
//Secret Key
//const url = "";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//const express = require('express');
//const app = express();

client.on("message", msg => {
if (msg.content.toLowerCase() === "balance" || msg.content.toLowerCase() === "balances") { 
  var userId = msg.member.user.tag;
  var filter = { Username: userId }; 
  Points.find(filter, {Points: 1, _id: 0})
  .then((result) => {
    //msg.channel.send(result); { Points: XXXX }
    var result_file = JSON.stringify(result);
    //result_file = [{"Points":XXXX}]
    var result_num = parseInt(result_file.replace(/\D/g,''));
    msg.reply(`your point value is ***${result_num}***!`)
    msg.channel.send(`Temporary message: If you would like to see everyone's balances, try the command: ***balance all***`)
  })
}
});

client.on("message", msg => {
if (msg.content.toLowerCase() === "balance all") {
  msg.channel.send(`Loading balances...`)
  Points.find({}, {Username: 1, Points: 1, _id: 0}).collation({locale: "en" }).sort({Username: 1})
    .then((result) => {
      msg.channel.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
}
});

function point_update(userId) {
  var filter = { Username: userId };
  Points.find(filter, {Points: 1, _id: 0})
  .then((result) => {
    //result: { Points: XXXX }
    var result_file = JSON.stringify(result);
    //result_file = [{"Points":XXXX}]
    var result_num = parseInt(result_file.replace(/\D/g,''));
    //result_num = XXXX
    var min = 100; //min value for collection
    var max = 1000; //max value for collection
    var random_collect = Math.floor(Math.random() * (max - min + 1) + min); //randomize and receive a collection value between 100(min) and 1000(max)
    var pointVar = result_num + random_collect;
    var update = { Points: pointVar };
    //google_transaction(userId, pointVar); //update google drive JSON
    Points.updateOne(filter, update)
    .then((result) => {
      msg.channel.send(`You have collected ***${random_collect}*** points!\n${userId}'s point value is now ***${pointVar}***!`);
    })
  })
}

client.on("message", msg => {
if (msg.content.toLowerCase() === "collect") {
  var userId = msg.member.user.tag;
  if (collectedRecently.has(userId)) { //cooldown: can't collect if you've already done so in past 30 mins
    msg.channel.send(`You can only collect points once every 30 minutes, ${userId}`);
    //msg.channel.send(`You can collect again in ${collectedRecently.delete(msg.author.id)}`)
  } else { //Perform point collection  
    //point_update(userId);
    var filter = { Username: userId };
    Points.find(filter, {Points: 1, _id: 0})
    .then((result) => {
      //result: { Points: XXXX }
      var result_file = JSON.stringify(result);
      //console.log(result_file)
      //result_file = [{"Points":XXXX}]
      var result_num = parseInt(result_file.replace(/\D/g,''));
      //result_num = XXXX
      //NOTE: if result_file has a negative number, it turns it positive.
      //console.log(result_num)
      if (isNaN(result_num)) { //if user is new and not in database yet
        var points = new Points({
          Username: userId,
          Points: 2000
        });
        points.save()
        .then((result) => {
          msg.channel.send(`Welcome, ***${userId}***, you have started off with 2000 points!`)
        })
        .catch((err) => {
          console.log(err);
        })  
      } else { //if existing user
        if (result_num !== 0) { //normal collection if user doesn't have 0
          var min = 100; //min value for collection
          var max = 1000; //max value for collection
          var random_collect = Math.floor(Math.random() * (max - min + 1) + min); //randomize and receive a collection value between 100(min) and 1000(max)
          var pointVar = result_num + random_collect;
          var update = { Points: pointVar };
          //google_transaction(userId, pointVar); //update google drive JSON
          Points.updateOne(filter, update)
          .then((result) => {
            msg.channel.send(`You have collected ***${random_collect}*** points!\n__*${userId}*__'s point value is now ***${pointVar}***!`);
            // Adds the user to the set so that they can't collect for 30 mins
            collectedRecently.add(userId);
            setTimeout(() => {
            // Removes the user from the set after 30 mins
            collectedRecently.delete(userId);
          }, 1800000);
          })
        } else { //if user has 0 then give them 2000
          var pointVar = 2000;
          var update = { Points: pointVar };
          //google_transaction(userId, pointVar); //update google drive JSON
          Points.updateOne(filter, update)
          .then((result) => {
            msg.reply(`Lol! Looks like you're down bad. Here is a ***2000*** point collection!`);
            // Adds the user to the set so that they can't collect for 30 mins
            collectedRecently.add(userId);
            setTimeout(() => {
            // Removes the user from the set after 30 mins
            collectedRecently.delete(userId);
          }, 1800000);
          })
        }
      }
    })
  }
}
});

client.on("message", msg => {
if (msg.content.toLowerCase() === "stat" || msg.content.toLowerCase() === "stats") { 
  var userId = msg.member.user.tag;
  var filter = { Username: userId }; 
  var wins = 0;
  var losses = 0;
  Stats.find(filter, {Wins: 1, _id: 0})
  .then((result) => {
    //result = { Wins: XXXX }
    var result_file = JSON.stringify(result);
    //result_file = [{"Wins":XXXX}]
    var result_num = parseInt(result_file.replace(/\D/g,''));
    wins+=result_num;
    Stats.find(filter, {Losses: 1, _id: 0})
    .then((result) => {
    //result = { Wins: XXXX }
    var result_file = JSON.stringify(result);
    //result_file = [{"Wins":XXXX}]
    var result_num = parseInt(result_file.replace(/\D/g,''));
    losses+=result_num;
    total_games = wins+losses;
    wlratio = (wins/(total_games))*100;
    let wlratio_precise = wlratio.toFixed(2);
    if (total_games < 1) {
      msg.reply(`Your Blackjack W/L Ratio is: ***${wins}*** Wins / ***${losses}*** Losses (***0%***)`);
    } else {
      msg.reply(`Your Blackjack W/L Ratio is: ***${wins}*** Wins / ***${losses}*** Losses (***${wlratio_precise}%***)`);
    }
    })
  })
}
});

client.on("message", msg => {
if (msg.content.toLowerCase() === "stats ryanbot") { 
  var userId = "RyanBot";
  var filter = { Username: userId }; 
  var wins = 0;
  var losses = 0;
  Stats.find(filter, {Wins: 1, _id: 0})
  .then((result) => {
    //result = { Wins: XXXX }
    var result_file = JSON.stringify(result);
    //result_file = [{"Wins":XXXX}]
    var result_num = parseInt(result_file.replace(/\D/g,''));
    wins+=result_num;
    Stats.find(filter, {Losses: 1, _id: 0})
    .then((result) => {
    //result = { Wins: XXXX }
    var result_file = JSON.stringify(result);
    //result_file = [{"Wins":XXXX}]
    var result_num = parseInt(result_file.replace(/\D/g,''));
    losses+=result_num;
    wlratio = (wins/(wins+losses))*100;
    let wlratio_precise = wlratio.toFixed(2);
    msg.channel.send(`RyanBot's Blackjack W/L Ratio is: ***${wins}*** Wins / ***${losses}*** Losses (***${wlratio_precise}%***) `)
    })
  })
}
});

client.on("message", msg => {
if (msg.content.toLowerCase() === "stats all") {
  msg.channel.send(`Loading stats...`)
  Stats.find({}, {Username: 1, Wins: 1, Losses: 1, _id: 0}).collation({locale: "en" }).sort({Username: 1})
    .then((result) => {
      msg.channel.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
}
});

client.on("message", msg => {
if (msg.content.toLowerCase() === "pickup stat" || msg.content.toLowerCase() === "pickup stats") { 
  var userId = msg.member.user.tag;
  var filter = { Username: userId }; 
  var wins = 0;
  var losses = 0;
  Pickup.find(filter, {Wins: 1, _id: 0})
  .then((result) => {
    //result = { Wins: XXXX }
    var result_file = JSON.stringify(result);
    //result_file = [{"Wins":XXXX}]
    var result_num = parseInt(result_file.replace(/\D/g,''));
    wins+=result_num;
    Pickup.find(filter, {Losses: 1, _id: 0})
    .then((result) => {
    //result = { Wins: XXXX }
    var result_file = JSON.stringify(result);
    //result_file = [{"Wins":XXXX}]
    var result_num = parseInt(result_file.replace(/\D/g,''));
    losses+=result_num;
    total_games = wins+losses;
    wlratio = (wins/(total_games))*100;
    let wlratio_precise = wlratio.toFixed(2);
    if (total_games < 1) {
      msg.reply(`Your 21 Pickup W/L Ratio is: ***${wins}*** Wins / ***${losses}*** Losses (***0%***)`);
    } else {
      msg.reply(`Your 21 PIckup W/L Ratio is: ***${wins}*** Wins / ***${losses}*** Losses (***${wlratio_precise}%***)`);
    }
    })
  })
}
});

client.on("message", msg => {
if (msg.content.toLowerCase() === "pickup stats ryanbot") { 
  var userId = "RyanBot";
  var filter = { Username: userId }; 
  var wins = 0;
  var losses = 0;
  Pickup.find(filter, {Wins: 1, _id: 0})
  .then((result) => {
    //result = { Wins: XXXX }
    var result_file = JSON.stringify(result);
    //result_file = [{"Wins":XXXX}]
    var result_num = parseInt(result_file.replace(/\D/g,''));
    wins+=result_num;
    Pickup.find(filter, {Losses: 1, _id: 0})
    .then((result) => {
    //result = { Wins: XXXX }
    var result_file = JSON.stringify(result);
    //result_file = [{"Wins":XXXX}]
    var result_num = parseInt(result_file.replace(/\D/g,''));
    losses+=result_num;
    wlratio = (wins/(wins+losses))*100;
    let wlratio_precise = wlratio.toFixed(2);
    msg.channel.send(`RyanBot's 21 Pickup W/L Ratio is: ***${wins}*** Wins / ***${losses}*** Losses (***${wlratio_precise}%***) `)
    })
  })
}
});

client.on("message", msg => {
if (msg.content.toLowerCase() === "pickup stats all") {
  msg.channel.send(`Loading stats...`)
  Pickup.find({}, {Username: 1, Wins: 1, Losses: 1, _id: 0}).collation({locale: "en" }).sort({Username: 1})
    .then((result) => {
      msg.channel.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
}
});

////////////////////////////////POINT COLLECTION////////////////////////////////////////
const fs = require('fs') //importing file save
const collectedRecently = new Set(); //for "collect" betting tool command cooldown
// Setting up user balance data
const collect_path = './user_data.json' //const json file path
var collect_read = fs.readFileSync(collect_path); //returns json file
var collect_file = JSON.parse(collect_read); //ready for use
// Setting up user host start bet
const start_path = './user_start.json' //const json file path
var start_read = fs.readFileSync(start_path); //returns json file
var start_file = JSON.parse(start_read); //ready for use
// Setting up user bet data
const bet_path = './user_bet.json' //const json file path
var bet_read = fs.readFileSync(bet_path); //returns json file
var bet_file = JSON.parse(bet_read); //ready for use
// Setting up other variables
var bet_log = {}; //sets up bet log tracker variable for later
var startBet = false; //doesn't allow you to collect or start another bet if a current bet is ongoing
var total_pot = 0; //resets total pot

// Admin Commands
client.on("message", msg => {//for Ryan's personal use only to manually adjust individual values
	if (msg.content.toLowerCase().startsWith('adjust')) {
    if (msg.member.user.tag !== `ryan`) {
      msg.channel.send(`Nice try foo lol`)
    } else {
      var userId = msg.content.split(' ')[1]; //create variable based off option choice
      var adjust_value = parseInt(msg.content.split(' ')[2]); //create variable based off input
      //if (userId === `Ryan`) { //provide shortcut for username with spaces since msg.content.split doesn't work for these unique situations
        //userId = "";
      //}
      var filter = { Username: userId };
      Points.find(filter, {Points: 1, _id: 0})
      .then((result) => {
        //result: { Points: XXXX }
        var result_file = JSON.stringify(result);
        //result_file = [{"Points":XXXX}]
        var result_num = parseInt(result_file.replace(/\D/g,''));
        //result_num = XXXX
        var pointVar = result_num + adjust_value;
        var update = { Points: pointVar };
        //google_transaction(userId, pointVar); //update google drive JSON
        Points.updateOne(filter, update)
        .then((result) => {
          msg.channel.send(`***${userId}***'s point value is now ***${pointVar}***!`); //inform user
        })
      })
      //google_transaction(other_user, pointVar); //update google drive JSON
    }
  }
});  
/////////////////////////////////BETTING TOOL///////////////////////////////////////////
// define sleep function for use in betting tool and blackjack
const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

// Bet Command
client.on("message", msg => { //start the betting tool
  if (msg.content.toLowerCase().startsWith('bet start') || msg.content.toLowerCase().startsWith('start bet')) {
	  startBet = true; //turns into true so other betting tool commands can be used and to prevent any further "collect" or another betting tool start
	  total_pot = 0; //create variable for betting pot total
    opt1_pot = 0; //create variable for first pot
    opt2_pot = 0; //create variable for second pot
    var userId = msg.member.user.tag //username of person who started bet
    start_file[userId] = 1 //username here so no one else can end bet
    fs.writeFileSync(start_path, JSON.stringify(start_file, null, 2)); //write starter username to json
    //title = msg.content.split(' ',10)[2]; //create variable based off input
	  //msg.channel.send(`Title of Wager: ${title}`);
    msg.channel.send(`Please input your bets. E.g. "bet 500 opt 1" or "bet 500 opt 2\nBy default, assume that "yes" is opt 1 and "no" is opt 2."`);//inform users that betting tool has activated and bets can be placed 
	
  } else if ((msg.content.toLowerCase().startsWith('bet end') ||  msg.content.toLowerCase().startsWith('end bet')) && startBet) { //end the bet when it is time
      //if (start_read === 1) {
      startBet = false; //turns into false so betting is no longer allowed and "collect" and another bet can start 
      var opt_winner = msg.content.split(' ')[3]; // "bet end opt 1" or "bet end opt 2"; this would give the "1" or "2" as the winner
      if (opt_winner === '1') {
        msg.channel.send(`Option 1 has won!\nThe pot for the opposing Option 2, ***${opt2_pot}***, will be distributed accordingly for our Option 1 winners.`);
        //msg.channel.send(`${bet_log[userId]}`); // prints as undefined for some reason
        //console.log(bet_log) // prints normally
        //put into async function so i can pause for loop to allow time for mongoDB to update
        const doOptWinner1 = async () => {
          for (var bet_key in bet_log) { //obtaining the information for everyone who placed a bet
            //console.log(bet_log)
            await sleep(1000); //wait a second
            user_count +=1;
            //console.log(user_count)
            var bet_value = bet_log[bet_key]; //individual bet value for a user
            var bet_filter = bet_value.filter(option => option === 'option: 1'); // filtering out to obtain only the winners
            if (bet_filter.length === 1) { //if user is a winner, do some math
              //var collect_read = fs.readFileSync(collect_path); //reads updated user points values from JSON
              //var collect_file = JSON.parse(collect_read); //ready for use
              var opt1_percentage = parseInt(bet_value[0])/opt1_pot; //percentage of pot
              var user_bet_value = opt1_percentage*opt1_pot; //percentage of player contributions in winning pot
              //console.log(user_bet_value)
              var bet_profit = opt1_percentage*opt2_pot; //calculating profit
              //var pointVar = collect_file[bet_key] + bet_profit + user_bet_value; //add bet profit points to user's original value
              //console.log(bet_profit)
              var filter = { Username: bet_key };
              var current_user = bet_key; //current user in the for loop
              Points.find(filter, {Points: 1, _id: 0})
              .then((result) => {
                //result: { Points: XXXX }
                var result_file = JSON.stringify(result);
                //result_file = [{"Points":XXXX}]
                var result_num = parseInt(result_file.replace(/\D/g,''));
                //result_num = XXXX
                var pointVar = result_num + bet_profit + user_bet_value; //subtract input from user balance
                //user_values[`${userId}`] = pointVar; //update user balance in memory
                //console.log(user_values[`${userId}`]);
                //console.log(user_values)
                //console.log(pointVar)
                msg.channel.send(`__*${current_user}*__ has received a profit of ***${bet_profit}*** points from the bet!\n__*${current_user}*__'s point value is now ***${pointVar}***!`)
                var update = { Points: pointVar }; 
                Points.updateOne(filter, update) 
                .then((result) => { //update user points in database if valid bet
                  //google_transaction(bet_key, pointVar); //update google drive JSON
                  //google_transaction(bet_key, pointVar); //update google drive JSON
                })
              })              
            }
          }
          setTimeout(() => {
            total_pot = 0; //clear all pots or logs so next bet can start
            opt1_pot = 0; 
            opt2_pot = 0;
            bet_log = {};
            //console.log (user_count)
            //msg.channel.send(`test`)
          }, 1001*(user_count));
        }
        doOptWinner1();
      } else if (opt_winner === '2') { //same as option 1 but reversed
        msg.channel.send(`Option 2 has won!\nThe pot for the opposing Option 1, ***${opt1_pot}***, will be distributed accordingly for our Option 2 winners.`)
        //msg.channel.send(`${bet_log[userId]}`); // prints as undefined for some reason
        //console.log(bet_log) // prints normally
        //put into async function so i can pause for loop to allow time for mongoDB to update
        const doOptWinner2 = async () => {
          for (var bet_key in bet_log) { //obtaining the information for everyone who placed a bet
            await sleep(1000); //wait a second
            user_count +=1;
            //console.log(user_count)
            var bet_value = bet_log[bet_key]; //individual bet value for a user
            var bet_filter = bet_value.filter(option => option === 'option: 2'); // filtering out to obtain only the winners
            if (bet_filter.length !== 0) { //if user is a winner, do some math
              //var collect_read = fs.readFileSync(collect_path); //reads updated user points values from JSON
              //var collect_file = JSON.parse(collect_read); //ready for use
              var opt2_percentage = parseInt(bet_value[0])/opt2_pot; //percentage of pot
              var user_bet_value = opt2_percentage*opt2_pot; //percentage of player contributions in winning pot
              //console.log(user_bet_value)
              var bet_profit = opt2_percentage*opt1_pot; //calculating profit
              //var pointVar = collect_file[bet_key] + bet_profit + user_bet_value; //add bet profit points to user's original value
              //console.log(bet_profit)
              var filter = { Username: bet_key };
              var current_user = bet_key; //current user in the for loop
              Points.find(filter, {Points: 1, _id: 0})
              .then((result) => {
                //result: { Points: XXXX }
                var result_file = JSON.stringify(result);
                //result_file = [{"Points":XXXX}]
                var result_num = parseInt(result_file.replace(/\D/g,''));
                //result_num = XXXX
                var pointVar = result_num + bet_profit + user_bet_value; //subtract input from user balance
                //user_values[`${userId}`] = pointVar; //update user balance in memory
                //console.log(user_values[`${userId}`]);
                //console.log(user_values)
                //console.log(pointVar)
                var update = { Points: pointVar }; 
                Points.updateOne(filter, update) 
                .then((result) => { //update user points in database if valid bet
                  msg.channel.send(`__*${current_user}*__ has received a profit of ***${bet_profit}*** points from the bet!\n__*${current_user}*__'s point value is now ***${pointVar}***!`)
                  //google_transaction(bet_key, pointVar); //update google drive JSON
                })
              })              
            }
          }
          setTimeout(() => {
            total_pot = 0; //clear all pots or logs so next bet can start
            opt1_pot = 0; 
            opt2_pot = 0;
            bet_log = {};
            //console.log (user_count)
            //msg.channel.send(`test`)
          }, 1001*(user_count));
        }
        doOptWinner2();

      } else if (opt_winner ==='x') { //if no winner (opt 1 or opt 2) has been declared
          msg.channel.send(`No winner has been declared.\nThe total pot of ***${total_pot}***, will be distributed back to all users.`)
          //put into async function so i can pause for loop to allow time for mongoDB to update
          const doOptWinnerX = async () => {
            for (var bet_key in bet_log) { //obtaining the information for everyone who placed a bet
              await sleep(1000); //wait a second
              user_count +=1;
              //console.log(user_count)
              var bet_value = bet_log[bet_key]; //individual bet value for a user
              var user_bet_value = parseInt(bet_value[0]); //percentage of player contributions in winning pot
              var filter = { Username: bet_key };
              var current_user = bet_key; //current user in the for loop
              Points.find(filter, {Points: 1, _id: 0})
              .then((result) => {
                //result: { Points: XXXX }
                var result_file = JSON.stringify(result);
                //result_file = [{"Points":XXXX}]
                var result_num = parseInt(result_file.replace(/\D/g,''));
                //result_num = XXXX
                var pointVar = result_num + user_bet_value; //subtract input from user balance
                //user_values[`${userId}`] = pointVar; //update user balance in memory
                //console.log(user_values[`${userId}`]);
                //console.log(user_values)
                //console.log(pointVar)
                var update = { Points: pointVar }; 
                Points.updateOne(filter, update) 
                .then((result) => { //update user points in database if valid bet
                  //google_transaction(bet_key, pointVar); //update google drive JSON
                  msg.channel.send(`__*${current_user}*__ has received their ***${user_bet_value}*** points back.\n__*${current_user}*__'s point value is now ***${pointVar}***!`)
                  //google_transaction(bet_key, pointVar); //update google drive JSON
                })
              })              
            }
            setTimeout(() => {
              total_pot = 0; //clear all pots or logs so next bet can start
              opt1_pot = 0; 
              opt2_pot = 0;
              bet_log = {};
              //console.log (user_count)
              //msg.channel.send(`test`)
            }, 1001*(user_count));
          }
        doOptWinnerX();                
      } else {
        msg.channel.send('Invalid option number. Try "bet end opt 1", "bet end opt 2", or "bet end opt x"') //if someone enters an invalid option
        startBet = true; //doesn't let the bet end if invalid input
      } 
    user_count = 0;
	} else if (msg.content.toLowerCase().startsWith('bet') && startBet) { //if user places a bet
    //var collect_read = fs.readFileSync(collect_path); // reads updated user points file from JSON 
    //var collect_file = JSON.parse(collect_read); //ready for use (stored memory)
    var userId = msg.member.user.tag //username here
    var bet_input = parseInt(msg.content.split(' ')[1]); //create variable based off input
    var bet_option = msg.content.split(' ')[3]; //create variable based off option choice
    var bet_verify = isNaN(bet_input); //check if bet input is integer or not
    if (bet_verify === false  && (bet_option === '1' || bet_option === '2') && (bet_input > 0)) {
      var filter = { Username: userId };
      Points.find(filter, {Points: 1, _id: 0})
      .then((result) => {
        //result: { Points: XXXX }
        var result_file = JSON.stringify(result);
        //result_file = [{"Points":XXXX}]
        var result_num = parseInt(result_file.replace(/\D/g,''));
        //result_num = XXXX
        var pointVar = result_num - bet_input; //subtract input from user balance
        if (pointVar < 0) {
          msg.channel.send(`You cannot bet more points than you have fool. Please try again.`)
        } else {
          //user_values[`${userId}`] = pointVar; //update user balance in memory
          //console.log(user_values[`${userId}`]);
          //console.log(user_values)
          var update = { Points: pointVar }; 
          Points.updateOne(filter, update) 
          .then((result) => { //update user points in database if valid bet
            //google_transaction(userId, pointVar); //update google drive JSON
            wager_log[`${userId}`] = [bet_input]; // store bet data unique to username
            msg.channel.send(`***${userId}***'s point value is now ***${pointVar}***!`)
            bet_log[`${userId}`] = [bet_input, `option: ${bet_option}`]; // store bet data unique to username
            //msg.channel.send(`${bet_log[userId]}`);
            //console.log(bet_log)
            total_pot+=bet_input; // add to total pot
            if (bet_option === '1') { // add to appropriate pot
              opt1_pot+=bet_input;
            } else {
              opt2_pot+=bet_input;
            } 
            msg.channel.send(`The total pot is now ***${total_pot}*** points!\nOption 1 Pot: ***${opt1_pot}*** | Option 2 Pot: ***${opt2_pot}***\n`)
          })
        }
      })
    } else { // if invalid input
      msg.channel.send(`Please try again. Follow the format: bet XXX opt 1 or bet XXX opt 2.`)
    }
  }
});

////////////////////////////////////BLACKJACK///////////////////////////////////////////
var startBlackjack = false; //variable to prevent blackjack commands if a game hasn't started
var beginBlackjack = false; //variable to prevent user from accessing blackjack commands if they did not input a wager (pay to participate)
// Setting up variables
var wager_log = {}; //setting up log to keep track of user wagers
var deck_log = {}; //setting up log to keep track of specific number and type of cards in left in the deck
var draw_log = {}; //setting up log to keep track of each user's hand 
var ace_log = []; //setting up log to keep track of Ace's if any user draws them
var ace_count = 0; //setting up variable for number of aces out on the table
var double_down = []; //setting up log to prevent users from hitting if they already double down
const min = 0; //minimum number of cards allowed in the deck (1 in this case at index 0)
var max = 51; //maximum number of cards allowed in the deck (52 in this case at index 51)
var user_values = []; //store user points here temporarily so mongoDB doesn't slow down asynchronous functions
var user_count = 0; //store how many users are playing in one game
function randomdraw(min, max) { //require a min, max input that is already defined
  return Math.floor(Math.random() * (max - min + 1) + min) //randomly draw a card depending on deck size
}
var deck = //set up deck
["A :spades:", "A :clubs:", "A :diamonds:", "A :hearts:",
"2 :spades:", "2 :clubs:", "2 :diamonds:", "2 :hearts:",
"3 :spades:", "3 :clubs:", "3 :diamonds:", "3 :hearts:",
"4 :spades:", "4 :clubs:", "4 :diamonds:", "4 :hearts:",
"5 :spades:", "5 :clubs:", "5 :diamonds:", "5 :hearts:",
"6 :spades:", "6 :clubs:", "6 :diamonds:", "6 :hearts:",
"7 :spades:", "7 :clubs:", "7 :diamonds:", "7 :hearts:",
"8 :spades:", "8 :clubs:", "8 :diamonds:", "8 :hearts:",
"9 :spades:", "9 :clubs:", "9 :diamonds:", "9 :hearts:",
"10 :spades:", "10 :clubs:", "10 :diamonds:", "10 :hearts:",
"J :spades:", "J :clubs:", "J :diamonds:", "J :hearts:",
"Q :spades:", "Q :clubs:", "Q :diamonds:", "Q :hearts:",
"K :spades:", "K :clubs:", "K :diamonds:", "K :hearts:"];

client.on("message", msg => { //start blackjack command
if ((msg.content.toLowerCase() === "blackjack start" || msg.content.toLowerCase() === "blackjack begin" || msg.content.toLowerCase() === "begin") && !startBlackjack && !beginBlackjack) {
  startBlackjack = true; //user may enter a wager
  msg.channel.send(`Blackjack has begun.\nIf you would like to participate, please enter your desired wager.\nExample: "wager 1000" to bet 1000 points or "wager 0" to play for free.`); //inform user
}

if (msg.content.toLowerCase() === "blackjack" && !startBlackjack && !beginBlackjack) {//if user inputs "blackjack" but nothing else, guide them in right direction
  msg.channel.send(`Use "blackjack start" if you would like to begin a game\nUse "blackjack help" if you would like instructions on commands and how to play.`);
}

if (msg.content.toLowerCase().startsWith('wager') && startBlackjack && !beginBlackjack) {//allow user to wager
  var userId = msg.member.user.tag; //username here
	var wager_input = parseInt(msg.content.split(' ')[1]); //create variable based off wager input (wager XXXX)
  var wager_verify = isNaN(wager_input); //check if bet input is integer or not
  if (wager_input < 0 || wager_verify) { //if wager is negative or a string
    msg.channel.send('You are dumb. No negative numbers or letters. Please try again')
  } else {
    var filter = { Username: userId };
    Points.find(filter, {Points: 1, _id: 0})
    .then((result) => {
      //result: { Points: XXXX }
      var result_file = JSON.stringify(result);
      //result_file = [{"Points":XXXX}]
      var result_num = parseInt(result_file.replace(/\D/g,''));
      //result_num = XXXX
      var update = { Points: result_num };
      if (result_num < wager_input) {//if someone bets more than their current balance
        msg.channel.send(`You cannot bet more than you have fool. Please try again.`)
      } else { //if correct input
        var pointVar = result_num - wager_input; //subtract input from user balance
        user_values[`${userId}`] = pointVar; //update user balance in memory
        //console.log(user_values[`${userId}`]);
        //console.log(user_values)
        var update = { Points: pointVar }; 
        Points.updateOne(filter, update) 
        .then((result) => { //update user points in database if valid bet
          //google_transaction(userId, pointVar); //update google drive JSON
          wager_log[`${userId}`] = [wager_input]; // store bet data unique to username
          double_down[`${userId}`] = 1; //every user has one double_down command
          msg.channel.send(`You have bet ***${wager_input}*** points!\n${userId}'s point value is now ***${pointVar}***!\nGood luck!\nWhen everyone is ready, someone may type "begin"`); //inform user
        })
      }      
    })
  }
}

if (msg.content.toLowerCase() === "begin" && startBlackjack && !beginBlackjack && typeof wager_log[msg.member.user.tag] !== "undefined") { //begins game with Ryan Bot (dealer) first draw
  beginBlackjack = true; //does not allow users who did not put a wager to access commands
  var random_int = randomdraw(min, max); //grab random int from available deck
  var draw = deck[random_int]; //actual card draw
  var userId = "RyanBot"; //for RyanBot(dealer's) first draw
  deck_log[userId] = 0; //set up integer value for Ryan Bot's hand value
  draw_log[userId] = []; //ensures that it accepts strings (actual cards)
  draw_log[userId] += [draw]; //adds it to the array for tracking and displaying purposes
  deck.splice(random_int,1); //get rid of drawn card from deck (index, 1)
  max-=1; //lower number of cards in deck
  draw_action(draw_log, deck_log, draw, ace_log, userId, ace_count);
  if (draw.startsWith("A")) {//aces
    ace_count+=1; 
  }
  msg.channel.send(`Ryan Bot (Dealer) has obtained ${draw}!\nRyan Bot's hand value is now ${deck_log[userId]}!\nYou may start playing with the command: "hit"`); //inform user
  //console.log(max)
  //console.log(draw)
}


if (msg.content.toLowerCase() === "hit" && startBlackjack && beginBlackjack && typeof wager_log[msg.member.user.tag] !== "undefined" && double_down[msg.member.user.tag] === 1) { //user may hit as many times as they like
  var userId = msg.member.user.tag; //username  
  if (typeof draw_log[userId] === "undefined") {//if you are drawing a card for the first time
    var random_int = randomdraw(min, max); //grab random int available from deck
    var draw = deck[random_int]; //actual card draw
    deck.splice(random_int,1); //get rid of drawn card from deck (index, 1)
    max-=1; //lower amount of cards in deck
    deck_log[userId] = 0; //set up user's unique hand value in integer form
    draw_log[userId] = []; //set up user's unique hand in string form
    draw_log[userId] += [draw]; //add drawn card to user's hand
    draw_action(draw_log, deck_log, draw, ace_log, userId, ace_count);
    if (draw.startsWith("A")) {//aces
      ace_count+=1; 
    }
    var random_int = randomdraw(min, max); //grab random int available from deck
    var draw = deck[random_int]; //actual card draw
    deck.splice(random_int,1); //get rid of drawn card from deck (index, 1)
    max-=1; //lower amount of cards in deck
    draw_log[userId] += [draw]; //add drawn card to user's hand
    draw_action(draw_log, deck_log, draw, ace_log, userId, ace_count);
    if (draw.startsWith("A")) {//aces
      ace_count+=1; 
    }
    msg.reply(`Your starting hand consists of: ***${draw_log[userId]}***\nYour hand value is ***${deck_log[userId]}***!\nIf everyone is done, please use the command "blackjack end" or "end" to end the round.`);
  } else {// if you are drawing a card again
    var random_int = randomdraw(min, max); //grab random int available from deck
    var draw = deck[random_int]; //actual card draw
    deck.splice(random_int,1); //get rid of drawn card from deck (index, 1)
    max-=1; //lower amount of cards in deck
    //console.log(ace_count + "hit1")
    draw_log[userId] += [draw]; //add another card to your unique hand
    draw_action(draw_log, deck_log, draw, ace_log, userId, ace_count);
    if (draw.startsWith("A")) {//aces
      ace_count+=1; 
    }
    //console.log(ace_count + "hit2")
    //inform user of their draw and total hand value
    if (deck_log[userId] < 21) { //if user hits and hand value is under 21
      msg.reply(`You have obtained ***${draw}***!\nYour hand now consists of: ***${draw_log[userId]}***\nYour hand value is now ***${deck_log[userId]}***!\nIf everyone is done, please use the command "blackjack end" or "end" to end the round.`);
    } else if (deck_log[userId] === 21) { //if user hits and hand value is 21
      msg.reply(`You have obtained ***${draw}***!\nYour hand now consists of: ***${draw_log[userId]}***\nYour hand value is now ***${deck_log[userId]}***!\nCongratulations!\nIf everyone is done, please use the command "blackjack end" or "end" to end the round.`);
    } else if (deck_log[userId] > 21) { //if user hits and hand value is above 21
      //console.log(wager_log)
      msg.reply(`You have obtained ***${draw}***!\nYour hand now consists of: ***${draw_log[userId]}***\nYour hand value is now ***${deck_log[userId]}***!\nLol!!! You busted! Cya!\nIf everyone is done, please use the command "blackjack end" or "end" to end the round.`);
      var filter = { Username: userId }; 
      ryanbot_Win(userId, filter);
      //deck_log[userId] = []; //get rid of their hand
      //console.log(deck_log)
      //try to turn Ace's to 1's if they bust with 11
      for (var ace_key in ace_log) { //obtaining the information for everyone who received an ace
      //console.log(ace_log[ace_key])
        if (ace_log[ace_key] === `${userId}`) {//ace_key is array index
          //console.log(ace_key)
          //console.log(ace_log)
          deck_log[userId]-=10; //turn Ace value of 11 to 1 to avoid busting
          ace_log.splice(ace_key,1); //it will remove one element at ace_key (removes username from ace_log)
          msg.reply(`Just kidding, according to my calculations you had an Ace in your hand.\nTo avoid busting, we will turn one of your Ace values from an 11 to 1.\nYour new hand value is now ***${deck_log[userId]}***.\nIf everyone is done, please use the command "blackjack end" or "end" to end the round.`);
          ryanbot_ReverseWin(filter);
        }
      }
    }
  }
}

if (msg.content.toLowerCase() === "double down" && startBlackjack && beginBlackjack && typeof wager_log[msg.member.user.tag] !== "undefined" && double_down[msg.member.user.tag] === 1 && deck_log[msg.member.user.tag] > 3) { //user may hit as many times as they like
  var random_int = randomdraw(min, max); //grab random int available from deck
  var draw = deck[random_int]; //actual card draw
  var userId = msg.member.user.tag; //username
  var filter = { Username: userId };
  Points.find(filter, {Points: 1, _id: 0})
  .then((result) => {
    //result: { Points: XXXX }
    var result_file = JSON.stringify(result);
    //result_file = [{"Points":XXXX}]
    var result_num = parseInt(result_file.replace(/\D/g,''));
    //result_num = XXXX
    var pointVar = result_num - parseInt(wager_log[`${userId}`])*1; //subtract input from user balance
    if (pointVar < 0) { //if try to double down and your point balance becomes negative
      msg.reply(`you have insufficient points to double down ya fool!`)
    } else {
      user_values[`${userId}`] = pointVar; //update user value in memory
      var update = { Points: pointVar }; 
      Points.updateOne(filter, update) 
      .then((result) => { //update user points in database if valid bet
        //google_transaction(userId, pointVar); //update google drive JSON
        wager_log[`${userId}`] = wager_log[`${userId}`]*2; // store bet data unique to username
        double_down[userId] -=1;
        deck.splice(random_int,1); //get rid of drawn card from deck (index, 1)
        max-=1; //lower amount of cards in deck
        draw_log[userId] += [draw]; //add another card to your unique hand
        draw_action(draw_log, deck_log, draw, ace_log, userId, ace_count);
        if (draw.startsWith("A")) {//aces
          ace_count+=1; 
        }

        //inform user of their draw and total hand value
        if (deck_log[userId] < 21) { //if user hits and hand value is under 21
          msg.reply(`You have doubled down! You cannot hit anymore.\nYou doubled your wager and it is now ***${wager_log[`${userId}`]}***. Your point value is now ***${pointVar}***.\nYou have obtained ***${draw}***!\nYour hand now consists of: ***${draw_log[userId]}***\nYour hand value is now ***${deck_log[userId]}***!\nIf everyone is done, please use the command "blackjack end" or "end" to end the round.`);
        } else if (deck_log[userId] === 21) { //if user hits and hand value is 21
          msg.reply(`You have doubled down! You cannot hit anymore.\nYou doubled your wager and it is now ***${wager_log[`${userId}`]}***. Your point value is now ***${pointVar}***.\nYou have obtained ***${draw}***!\nYour hand now consists of: ***${draw_log[userId]}***\nYour hand value is now ***${deck_log[userId]}***!\nCongratulations!\nIf everyone is done, please use the command "blackjack end" or "end" to end the round.`);
        } else if (deck_log[userId] > 21) { //if user hits and hand value is above 21
          //console.log(wager_log)
          msg.reply(`You have doubled down! You cannot hit anymore.\nYou doubled your wager and it is now ***${wager_log[`${userId}`]}***. Your point value is now ***${pointVar}***.\nYou have obtained ***${draw}***!\nYour hand now consists of: ***${draw_log[userId]}***\nYour hand value is now ***${deck_log[userId]}***!\nLol!!! You busted! Cya!\nIf everyone is done, please use the command "blackjack end" or "end" to end the round.`);
          var filter = { Username: userId }; 
          ryanbot_Win(userId, filter);
          //deck_log[userId] = []; //get rid of their hand
          //console.log(deck_log)
          //try to turn Ace's to 1's if they bust with 11
          for (var ace_key in ace_log) { //obtaining the information for everyone who received an ace
          //console.log(ace_log[ace_key])
            if (ace_log[ace_key] === `${userId}`) {//ace_key is array index
              //console.log(ace_log)
              deck_log[userId]-=10; //turn Ace value of 11 to 1 to avoid busting
              ace_log.splice(ace_key,1); //it will remove one element at ace_key (removes username from ace_log)
              msg.reply(`Just kidding, according to my calculations you had an Ace in your hand.\nTo avoid busting, we will turn one of your Ace values from an 11 to 1.\nYour new hand value is now ***${deck_log[userId]}***.\nYour wager is still active.\nIf everyone is done, please use the command "blackjack end" or "end" to end the round.`);
              ryanbot_ReverseWin(filter);
            }
          }
        }
      })   
    }      
  })
  //console.log(max)
  //console.log(draw)
}

if ((msg.content.toLowerCase() === "blackjack end" || msg.content.toLowerCase() === "end") && startBlackjack && beginBlackjack) {
  startBlackjack = false; //reset so another round can start
  beginBlackjack = false; //reset so another round can start
  var random_int; //bring in variable
  var draw; //bring in variable
  var userId = "RyanBot"; //bring in variable for RyanBot draw
  
  //Potential improvement: ONLY HAVE DEALER DRAW IF THERE ARE REMAINING PLAYERS LEFT
  //right now the program has the dealer run even if everyone busted
  while (deck_log[userId] < 17) {//blackjack rules: dealer keeps drawing until total is 17 or higher
    var random_int = randomdraw(min, max); //grab a random integer(Card) from remaining deck
    var draw = deck[random_int]; //actual card draw
    draw_log[userId] += [draw]; //update RyanBot's hand
    deck.splice(random_int,1); //get rid of drawn card from deck (index, 1)
    max-=1; //reduce number of cards in deck
    draw_action(draw_log, deck_log, draw, ace_log, userId, ace_count);
    if (draw.startsWith("A")) {//aces
      ace_count+=1; 
    }
    //console.log(max)
    //console.log(draw)
    if (deck_log[userId] < 17) { //if RyanBot is under 17, inform user they will draw again
      msg.channel.send(`Ryan Bot (Dealer) has obtained ***${draw}***!\nRyan Bot's hand now consists of: ***${draw_log[userId]}***\nRyan Bot's hand value is now ***${deck_log[userId]}***!\nSince the value is under 17, Ryan Bot will draw again`);
    } else if (deck_log[userId] > 16 && deck_log[userId] < 21) { //if RyanBot is at or above 17 while not busting, they will stand
      msg.channel.send(`Ryan Bot (Dealer) has obtained ***${draw}***!\nRyan Bot's hand now consists of: ***${draw_log[userId]}***\nRyan Bot's final hand value is now ***${deck_log[userId]}***!\nSince the value is at or above 17, Ryan Bot will stand`);
    } else if (deck_log[userId] === 21) { //if RyanBot hits 21
      msg.channel.send(`Ryan Bot (Dealer) has obtained ***${draw}***!\nRyan Bot's hand now consists of: ***${draw_log[userId]}***\nRyan Bot's final hand value is now ***${deck_log[userId]}***!\nRyan Bot has hit 21! Cya!`);      
    } else if (deck_log[userId] > 21) { //if RyanBot busts
      msg.channel.send(`Ryan Bot (Dealer) has obtained ***${draw}***!\nRyan Bot's hand now consists of: ***${draw_log[userId]}***\nRyan Bot's final hand value is now ***${deck_log[userId]}***!\nRyan Bot busted!`);    
      //try to turn Ace's to 1's if they bust with 11
      for (var ace_key in ace_log) { //obtaining the information for everyone who received an ace
      //console.log(ace_log[ace_key])
        if (ace_log[ace_key] === `${userId}`) {//ace_key is array index
          //console.log(ace_key)
          //console.log(ace_log)
          deck_log[userId]-=10; //turn Ace value of 11 to 1 to avoid busting
          ace_log.splice(ace_key,1); //it will remove one element at ace_key (removes username from ace_log)
          msg.channel.send(`Just kidding, according to my calculations Ryan Bot had an Ace in its hand.\nTo avoid busting, I will turn one of Ryan Bot's Ace values from an 11 to 1.\nRyan Bot's new hand value is now ***${deck_log[userId]}***.`);
        }
      }  
    }
  }
  
  //compare users' hands and ryan bot's hand
  
  //put into async function so loop can be paused to allow time for mongoDB to update
  const doBlackjackEnd = async () => {
    msg.channel.send(`***Please wait... Gathering hand and wager data...***`)
    for (var deck_key in deck_log) { //obtaining the information for everyone who did not bust
      await sleep(1250); //wait 1.25 seconds
      user_count +=1;
      //console.log(user_count);
      if (deck_key === "RyanBot") { //do not check Ryan Bot's hand
        //do nothing
      } else { //check every user remaining
        //console.log(deck_key); //deck_key is username
        var deck_user_value = deck_log[deck_key]; //deck_user_value is the user's hand value
        //deck_user_value = 21; for testing
        //console.log(deck_user_value);
        if (deck_user_value < 22 && deck_log["RyanBot"] < 22) { //if you didn't bust
          if (deck_user_value < deck_log["RyanBot"]) { //if you lose
              var filter = { Username: deck_key }; 
              //console.log(user_values[`${deck_key}`]);
              msg.channel.send(`__*${deck_key}*__'s hand value of ***${deck_user_value}*** is less than Ryan Bot's hand value of ***${deck_log["RyanBot"]}***.\nYou lose!\nYou have lost your wager of ***${wager_log[`${deck_key}`]}***.\n__*${deck_key}*__'s point value is now ***${user_values[`${deck_key}`]}***!`);
              wager_log[`${deck_key}`] = undefined; // get rid of their bet from the log 
              ryanbot_Win(deck_key, filter);
          } else if (deck_user_value > deck_log["RyanBot"]) { //if you win
            //payout
            //setTimeout(() => {
              var filter = { Username: deck_key };
              var current_user = deck_key; //current user in the for loop
              //var final_value = user_values[`${deck_key}`] + parseInt(wager_log[`${deck_key}`])*2; //store user value temporarily for msg.channel.send purposes while mongoDB updates after
              Points.find(filter, {Points: 1, _id: 0})
              .then((result) => {
                //result: { Points: XXXX }
                var result_file = JSON.stringify(result);
                //result_file = [{"Points":XXXX}]
                //console.log(result_file)
                var result_num = parseInt(result_file.replace(/\D/g,''));
                //result_num = XXXX
                //console.log(result_num)
                var pointVar = result_num + parseInt(wager_log[`${current_user}`])*2; //add winnings to user balance
                var update = { Points: pointVar };
                //google_transaction(deck_key, pointVar); //update google drive JSON
                msg.channel.send(`__*${current_user}*__'s hand value of ***${deck_user_value}*** is more than Ryan Bot's hand value of ***${deck_log["RyanBot"]}***.\nYou win!\nYou have doubled your wager of ***${wager_log[`${current_user}`]}***.\n__*${current_user}*__'s point value is now ***${pointVar}***!`);
                Points.updateOne(filter, update)
                .then((result) => {
                  //console.log(deck_key); //deck_key is username
                })
              })
              ryanbot_Lose(deck_key, filter);
            //}, 5000);
          } else if (deck_user_value === deck_log["RyanBot"]) {// if you tied
            //setTimeout(() => {
              var filter = { Username: deck_key };
              var current_user = deck_key; //current user in the for loop
              //var final_value = user_values[`${deck_key}`] + parseInt(wager_log[`${deck_key}`])*1; //store user value temporarily for msg.channel.send purposes while mongoDB updates after
              Points.find(filter, {Points: 1, _id: 0})
              .then((result) => {
                //result: { Points: XXXX }
                var result_file = JSON.stringify(result);
                //result_file = [{"Points":XXXX}]
                var result_num = parseInt(result_file.replace(/\D/g,''));
                //result_num = XXXX
                var pointVar = result_num + parseInt(wager_log[`${current_user}`])*1; //add back wager to user balance
                var update = { Points: pointVar };
                //google_transaction(deck_key, pointVar); //update google drive JSON
                msg.channel.send(`__*${current_user}*__'s hand value of ***${deck_user_value}*** is the same as Ryan Bot's hand value of ***${deck_log["RyanBot"]}***.\nYou tied!\nYou have received your wager of ***${wager_log[`${current_user}`]}*** back.\n__*${current_user}*__'s point value is now ***${pointVar}***!`); 
                //console.log(pointVar);
                Points.updateOne(filter, update)
                .then((result) => {
                  //console.log(deck_key); //deck_key is username
                })
              })      
            //}, 5000);
          }
        } else if (deck_user_value < 22 && deck_log["RyanBot"] > 21) {
          //setTimeout(() => {
            //payout
            var filter = { Username: deck_key };
            var current_user = deck_key; //current user in the for loop
            //var final_value = user_values[`${deck_key}`] + parseInt(wager_log[`${deck_key}`])*2; //store user value temporarily for msg.channel.send purposes while mongoDB updates after
            Points.find(filter, {Points: 1, _id: 0})
            .then((result) => {
              //result: { Points: XXXX }
              var result_file = JSON.stringify(result);
              //result_file = [{"Points":XXXX}]
              var result_num = parseInt(result_file.replace(/\D/g,''));
              //result_num = XXXX
              var pointVar = result_num + parseInt(wager_log[`${current_user}`])*2; //add winnings to user balance
              var update = { Points: pointVar };
              //console.log(pointVar);
              //google_transaction(deck_key, pointVar); //update google drive JSON
              msg.channel.send(`__*${current_user}*__'s hand value of ***${deck_user_value}*** did not bust.\nYou win!\nYou have doubled your wager of ***${wager_log[`${current_user}`]}***.\n__*${current_user}*__'s point value is now ***${pointVar}***!`);
              Points.updateOne(filter, update)
              .then((result) => {
                //console.log(deck_key); //deck_key is username
              })
            })
            ryanbot_Lose(deck_key, filter);
          //}, 5000);
        }
      }
    }
    //Reset variables for another round
    setTimeout(() => {
      deck_log = {};
      draw_log = {};
      wager_log = {};
      max = 51;
      ace_log = [];
      ace_count = 0;
      user_values = [];
      deck = 
      ["A :spades:", "A :clubs:", "A :diamonds:", "A :hearts:",
      "2 :spades:", "2 :clubs:", "2 :diamonds:", "2 :hearts:",
      "3 :spades:", "3 :clubs:", "3 :diamonds:", "3 :hearts:",
      "4 :spades:", "4 :clubs:", "4 :diamonds:", "4 :hearts:",
      "5 :spades:", "5 :clubs:", "5 :diamonds:", "5 :hearts:",
      "6 :spades:", "6 :clubs:", "6 :diamonds:", "6 :hearts:",
      "7 :spades:", "7 :clubs:", "7 :diamonds:", "7 :hearts:",
      "8 :spades:", "8 :clubs:", "8 :diamonds:", "8 :hearts:",
      "9 :spades:", "9 :clubs:", "9 :diamonds:", "9 :hearts:",
      "10 :spades:", "10 :clubs:", "10 :diamonds:", "10 :hearts:",
      "J :spades:", "J :clubs:", "J :diamonds:", "J :hearts:",
      "Q :spades:", "Q :clubs:", "Q :diamonds:", "Q :hearts:",
      "K :spades:", "K :clubs:", "K :diamonds:", "K :hearts:"];
      msg.channel.send(`***Blackjack has ended.***\nIf you would like to play again, try "blackjack start" or "begin".`); //inform user
    }, 1251*(user_count-1));
    user_count = 0;
  }
  doBlackjackEnd()
}
});

// Blackjack functions
function draw_action(draw_log, deck_log, draw, ace_log, userId, ace_count) {
  if (draw.startsWith("A")) {//aces
    deck_log[userId]+=11; //ace value assuming no bust
    ace_log[ace_count] = userId; //add username to ace log for later
    //ace_count+=1; //add number of aces out on the table
    //console.log(ace_log)
    //console.log(ace_count)
  } else if (draw.startsWith("2")) {//2
      deck_log[userId]+=2;
  } else if (draw.startsWith("3")) {//3
      deck_log[userId]+=3;
  } else if (draw.startsWith("4")) {//4
      deck_log[userId]+=4;
  } else if (draw.startsWith("5")) {//5
      deck_log[userId]+=5;
  } else if (draw.startsWith("6")) {//6
      deck_log[userId]+=6;
  } else if (draw.startsWith("7")) {//7
      deck_log[userId]+=7;
  } else if (draw.startsWith("8")) {//8
      deck_log[userId]+=8;
  } else if (draw.startsWith("9")) {//9
      deck_log[userId]+=9;
  } else if (draw.startsWith("10")) {//10
      deck_log[userId]+=10;
  } else if (draw.startsWith("J")) {//J
      deck_log[userId]+=10;
  } else if (draw.startsWith("Q")) {//Q
      deck_log[userId]+=10;
  } else if (draw.startsWith("K")) {//K
      deck_log[userId]+=10;
  }
}

function ryanbot_Lose(deck_key, filter) {
  Stats.find(filter, {Wins: 1, _id: 0})
  .then((result) => {
    var result_file = JSON.stringify(result);
    var result_num = parseInt(result_file.replace(/\D/g,''));
    var updateWins = result_num + 1; 
    var update = { Wins: updateWins };
    Stats.updateOne(filter, update)
    .then((result) => {
    })
    Stats.find({ Username: `RyanBot` }, {Losses: 1, _id: 0})
    .then((result) => {
      var result_file = JSON.stringify(result);
      var result_num = parseInt(result_file.replace(/\D/g,''));
      var updateLosses = result_num + 1; 
      var update = { Losses: updateLosses };
      Stats.updateOne({ Username: `RyanBot` }, update)
      .then((result) => {
      })
    })
    if (isNaN(result_num)) { //if user is new and not in database yet
      var stats = new Stats({
        Username: deck_key,
        Wins: 1,
        Losses: 0
      });
      console.log(`ryanbot Lose test`);
      stats.save()
      .then((result) => {
      })
      .catch((err) => {
        console.log(err);
      })
    }
  })
}

function ryanbot_Win(deck_key, filter) {
  Stats.find(filter, {Losses: 1, _id: 0})
  .then((result) => {
    var result_file = JSON.stringify(result);
    var result_num = parseInt(result_file.replace(/\D/g,''));
    var updateLosses = result_num + 1; 
    var update = { Losses: updateLosses };
    Stats.updateOne(filter, update)
    .then((result) => {
    })
    Stats.find({ Username: `RyanBot` }, {Wins: 1, _id: 0})
    .then((result) => {
      var result_file = JSON.stringify(result);
      var result_num = parseInt(result_file.replace(/\D/g,''));
      var updateWins = result_num + 1; 
      var update = { Wins: updateWins }
      Stats.updateOne({ Username: `RyanBot` }, update)
      .then((result) => {
      })
    })
    if (isNaN(result_num)) { //if user is new and not in database yet
      var stats = new Stats({
        Username: deck_key,
        Wins: 0,
        Losses: 1
      });
      console.log(`ryanbot Win test`);
      stats.save()
      .then((result) => {
      })
      .catch((err) => {
        console.log(err);
      })
    }
  })
}

function ryanbot_ReverseWin(filter) {
  Stats.find(filter, {Losses: 1, _id: 0})
  .then((result) => {
    var result_file = JSON.stringify(result);
    var result_num = parseInt(result_file.replace(/\D/g,''));
    var updateLosses = result_num - 1; 
    var update = { Losses: updateLosses };
    Stats.updateOne(filter, update)
    .then((result) => {
    })
  })
  Stats.find({ Username: "RyanBot" }, {Wins: 1, _id: 0})
  .then((result) => {
    var result_file = JSON.stringify(result);
    var result_num = parseInt(result_file.replace(/\D/g,''));
    var updateWins = result_num - 1; 
    var update = { Wins: updateWins };
    Stats.updateOne({ Username: "RyanBot" }, update)
    .then((result) => {
    })
  })
}

/////////////////////////////////////////21 PICKUP//////////////////////////////////////
var stones_remaining = 0;
var pickup_start = false;
var pickup_user = [];
var react_counter = 1;

client.on("message", msg => {
if ((msg.content.toLowerCase() === "pickup start") && !pickup_start) {
  pickup_start = true;
  stones_remaining+=21;
  var userId = msg.member.user.tag;
  pickup_user += userId;
  //console.log(userId);
  //console.log(pickup_user);
  var filter = { Username: userId };
  Points.find(filter, {Points: 1, _id: 0})
  .then((result) => {
    //result: { Points: XXXX }
    var result_file = JSON.stringify(result);
    //console.log(result_file)
    //result_file = [{"Points":XXXX}]
    var result_num = parseInt(result_file.replace(/\D/g,''));
    //result_num = XXXX
    //NOTE: if result_file has a negative number, it turns it positive.
    //console.log(result_num)
    var pointVar = result_num - 500;
    var update = { Points: pointVar };
    Points.updateOne(filter, update)
    .then((result) => {
      msg.channel.send(`***500*** points have been deducted from your point balance.\n__*${userId}*__'s point value is now ***${pointVar}***!`);
    })
  })

  msg.channel.send(`21 Pickup has started! It is your turn.\nIf you wish to view instructions on how to play the game, try the command ***pickup help***\n***${stones_remaining} pokemon cards*** remain on the board.\nPlease click on the corresponding emoji for the amount of pokemon card(s) you wish to pick up.`)
  msg.react('3️⃣');
  msg.react('2️⃣');
  msg.react('1️⃣');

  const emoji_filter = (reaction, user) => {
  return ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) && user.id === msg.author.id;
  };

  msg.awaitReactions(emoji_filter, { max: 1, time: 60000, errors: ['time'] })
  .then(collected => {
    const reaction = collected.first();
    if (reaction.emoji.name === '1️⃣') {
      var grab_value = 1;
      stones_remaining-=grab_value;
      msg.channel.send(`Your turn has ended! You have grabbed ***${grab_value} pokemon card(s)***! ***${stones_remaining} pokemon cards*** remain on the board.`)
    } else if (reaction.emoji.name === '2️⃣') {
      var grab_value = 2;
      stones_remaining-=grab_value;
      msg.channel.send(`Your turn has ended! You have grabbed ***${grab_value} pokemon card(s)***! ***${stones_remaining} pokemon cards*** remain on the board.`)
    } else if (reaction.emoji.name === '3️⃣') {
      var grab_value = 3;
      stones_remaining-=grab_value;
      msg.channel.send(`Your turn has ended! You have grabbed ***${grab_value} pokemon card(s)***! ***${stones_remaining} pokemon cards*** remain on the board.`)
    }
  })
  .catch((err) => {
    pickup_start = false;
    stones_remaining = 0;
    var filter = { Username: pickup_user };
    ryanbot_pickup_Win(pickup_user, filter)
    pickup_user = [];
    msg.channel.send(`__*You did not respond in time (60 seconds) and I have ended the 21 Pickup game. You lost your 500 points lol!*__`)
  })
}
})

client.on("message", msg => {
if ((msg.content.startsWith('Your turn has ended')) && pickup_start) {
  if (stones_remaining === 7) {
    stones_remaining -= 3;
    msg.channel.send(`RyanBot will grab ***3 pokemon card(s)***!\n__***${stones_remaining} pokemon cards***__ remain on the board. __*It is now your turn!*__`)
  } else if (stones_remaining === 6) {
    stones_remaining -= 2;
    msg.channel.send(`RyanBot will grab ***2 pokemon card(s)***!\n__***${stones_remaining} pokemon cards***__ remain on the board. __*It is now your turn!*__`)
  } else if (stones_remaining === 5) {
    stones_remaining -= 1;
    msg.channel.send(`RyanBot will grab ***1 pokemon card(s)***!\n__***${stones_remaining} pokemon cards***__ remain on the board. __*It is now your turn!*__`)
  } else {
    var random_grab = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    stones_remaining-=random_grab;
    msg.channel.send(`RyanBot will grab ***${random_grab} pokemon card(s)***!\n__***${stones_remaining} pokemon cards***__ remain on the board. __*It is now your turn!*__`)
  }

  msg.react('3️⃣');
  msg.react('2️⃣');
  msg.react('1️⃣');

  const emoji_filter = (reaction, user) => {
  return ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) && user.tag === pickup_user;
  };

  msg.awaitReactions(emoji_filter, { max: 1, time: 60000, errors: ['time'] })
  .then(collected => {
    const reaction = collected.first();
    if (reaction.emoji.name === '1️⃣') {
      var grab_value = 1;
      stones_remaining-=grab_value;
      msg.channel.send(`Your turn has ended! You grabbed ***${grab_value} pokemon card(s)***! ***${stones_remaining} pokemon cards*** remain on the board.`)
    } else if (reaction.emoji.name === '2️⃣') {
      var grab_value = 2;
      stones_remaining-=grab_value;
      msg.channel.send(`Your turn has ended! You grabbed ***${grab_value} pokemon card(s)***! ***${stones_remaining} pokemon cards*** remain on the board.`)
    } else if (reaction.emoji.name === '3️⃣') {
      var grab_value = 3;
      stones_remaining-=grab_value;
      msg.channel.send(`Your turn has ended! You grabbed ***${grab_value} pokemon card(s)***! ***${stones_remaining} pokemon cards*** remain on the board.`)
    }
    if (stones_remaining < 4 && stones_remaining > 0) {
      msg.channel.send(`RyanBot will grab the remaining ***${stones_remaining} pokemon card(s)*** on the board! __***You lose!!***__ Lol!! You lost your 500 points!\nTry ***pickup start*** to play again.`)
      pickup_start = false;
      stones_remaining = 0;
      var filter = { Username: pickup_user };
      ryanbot_pickup_Win(pickup_user, filter)
      pickup_user = [];
    } else if (stones_remaining < 1) {
      msg.channel.send(`__***You win!!***__\nTry ***pickup start*** to play again.`)
      pickup_start = false;
      stones_remaining = 0;
      var filter = { Username: pickup_user };
      ryanbot_pickup_Lose(pickup_user, filter)
      pickup_user = [];
      Points.find(filter, {Points: 1, _id: 0})
      .then((result) => {
        //result: { Points: XXXX }
        var result_file = JSON.stringify(result);
        //console.log(result_file)
        //result_file = [{"Points":XXXX}]
        var result_num = parseInt(result_file.replace(/\D/g,''));
        //result_num = XXXX
        //NOTE: if result_file has a negative number, it turns it positive.
        //console.log(result_num)
        var pointVar = result_num + 1000;
        var update = { Points: pointVar };
        Points.updateOne(filter, update)
        .then((result) => {
          msg.channel.send(`A net profit of ***500*** points have been rewarded to you.\nYour point value is now ***${pointVar}***!`);
        })
      })
    }
  })
  .catch((err) => {
    pickup_start = false;
    stones_remaining = 0;
    var filter = { Username: pickup_user };
    ryanbot_pickup_Win(pickup_user, filter)
    pickup_user = [];
    msg.channel.send(`__*You did not respond in time (60 seconds) and I have ended the 21 Pickup game. You lost your 500 points lol!*__`)
  })
}
})

function ryanbot_pickup_Lose(pickup_user, filter) {
  Pickup.find(filter, {Wins: 1, _id: 0})
  .then((result) => {
    var result_file = JSON.stringify(result);
    var result_num = parseInt(result_file.replace(/\D/g,''));
    var updateWins = result_num + 1; 
    var update = { Wins: updateWins };
    Pickup.updateOne(filter, update)
    .then((result) => {
    })
    Pickup.find({ Username: `RyanBot` }, {Losses: 1, _id: 0})
    .then((result) => {
      var result_file = JSON.stringify(result);
      var result_num = parseInt(result_file.replace(/\D/g,''));
      var updateLosses = result_num + 1; 
      var update = { Losses: updateLosses };
      Pickup.updateOne({ Username: `RyanBot` }, update)
      .then((result) => {
      })
    })
    if (isNaN(result_num)) { //if user is new and not in database yet
      var pickup = new Pickup({
        Username: pickup_user,
        Wins: 1,
        Losses: 0
      });
      console.log(`ryanbot Lose test`);
      pickup.save()
      .then((result) => {
      })
      .catch((err) => {
        console.log(err);
      })
    }
  })
}

function ryanbot_pickup_Win(pickup_user, filter) {
  Pickup.find(filter, {Losses: 1, _id: 0})
  .then((result) => {
    var result_file = JSON.stringify(result);
    var result_num = parseInt(result_file.replace(/\D/g,''));
    var updateLosses = result_num + 1; 
    var update = { Losses: updateLosses };
    Pickup.updateOne(filter, update)
    .then((result) => {
    })
    Pickup.find({ Username: `RyanBot` }, {Wins: 1, _id: 0})
    .then((result) => {
      var result_file = JSON.stringify(result);
      var result_num = parseInt(result_file.replace(/\D/g,''));
      var updateWins = result_num + 1; 
      var update = { Wins: updateWins }
      Pickup.updateOne({ Username: `RyanBot` }, update)
      .then((result) => {
      })
    })
    if (isNaN(result_num)) { //if user is new and not in database yet
      var pickup = new Pickup({
        Username: pickup_user,
        Wins: 0,
        Losses: 1
      });
      console.log(`ryanbot Win test`);
      pickup.save()
      .then((result) => {
      })
      .catch((err) => {
        console.log(err);
      })
    }
  })
}

//////////////////////////////////TIC TAC TOE///////////////////////////////////////////
const { Client, Intents, MessageAttachment } = require('discord.js');
const Canvas = require('canvas');
const { registerFont } = require('canvas');
registerFont('./fonts/static/RobotoMono-Regular.ttf', { family: 'RobotoMono' });
var ttt_player1 = [];
var ttt_player2 = [];
var ttt_start = false;
var ttt_player_search = false;
var ttt_player_turn = [];
var player_input = 0;
var available_moves = [0,1,2,3,4,5,6,7,8,9];
var player1_moves = [0,0,0,0,0,0,0,0,0,0];
var player2_moves = [0,0,0,0,0,0,0,0,0,0];

client.on("message", msg => {
if (((msg.content.toLowerCase() === "ttt") || (msg.content.toLowerCase() === "ttt start")) && !ttt_start && !ttt_player_search) {
  ttt_player1+= msg.member.user.tag;
  ttt_start = true;
  msg.reply(`Would you like to play tic-tac-toe with another player or RyanBot?\nPlease enter ***player*** or ***ryanbot***\nIf you would like to end the session, please enter ***ttt end***.`);
} else if ((msg.content.toLowerCase() === "ttt") && ttt_start && ttt_player_search) {
  if (ttt_player1 === msg.member.user.tag) {
    msg.reply(`You can't be both Player 1 and Player 2!!\nIf you made a mistake then please enter ***ttt end*** to end the session.`);
  } else {
    ttt_player2+= msg.member.user.tag;
    ttt_player_search = false;
    msg.reply(`You have successfully registered as Player 2. Please enter ***start*** to begin the game!`);
  }
}
});

client.on("message", msg => {
if ((msg.content.toLowerCase() === "player") && ttt_start) {
  ttt_player_search = true;
  msg.reply(`RyanBot is searching for Player 2... \nPlease have Player 2 enter ***ttt***.`);
} else if ((msg.content.toLowerCase() === "ryanbot") && ttt_start) {
  ttt_player2 = 'RyanBot';
  msg.reply(`Ryanbot will be Player 2. Please enter ***start*** to begin the game.`);
}
});

client.on("message", msg => {

  const tttBoardSetup = async () => {
    // Create a 1000x1000 pixel canvas and get its context
    // The context will be used to modify the canvas
    const canvas = Canvas.createCanvas(1000, 1000);
    const context = canvas.getContext('2d');
    const background = await Canvas.loadImage('./tic-tac-toe/board.PNG');

    // This uses the canvas dimensions to stretch the image onto the entire canvas
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Set the color of the stroke
    context.strokeStyle = '#0099ff';

    // Draw a rectangle with the dimensions of the entire canvas
    context.strokeRect(0, 0, canvas.width, canvas.height);

    const attachment = new MessageAttachment(canvas.toBuffer(), './tic-tac-toe/board.PNG');
    msg.channel.send({ files: [attachment] });
  }

if ((msg.content.toLowerCase() === "start") && ttt_start && !ttt_player_search && ttt_player2 === 'RyanBot') {
  msg.channel.send(`Generating game board...\n__*${ttt_player1}*__ versus __*${ttt_player2}*__!\n__*${ttt_player1}*__, you may go first.`);
  ttt_player_turn = ttt_player1;
  tttBoardSetup();
} else if ((msg.content.toLowerCase() === "start") && ttt_start && !ttt_player_search && ttt_player2 !== 'RyanBot') {
  msg.channel.send(`__*${ttt_player1}*__ versus __*${ttt_player2}*__!\n__*${ttt_player1}*__, please enter ***head*** or ***tails***.`);
} else if ((msg.content.toLowerCase() === "head") && ttt_start && !ttt_player_search && (msg.member.user.tag === ttt_player1)) {
  var coin_flip = Math.floor(Math.random() * (2 - 1 + 1) + 1); //randomize and receive a collection value between 1(min) and 2(max)
  if (coin_flip === 1) {
    msg.reply(`The coin has landed on heads. You won the coin flip! You will go first. __*${ttt_player2}*__ will go second!\nGenerating game board...`)
    ttt_player_turn = ttt_player1;
  } else {
    msg.reply(`The coin has landed on tails. You lost the coin flip! You will go second. __*${ttt_player2}*__ will go first!\nGenerating game board...`)
    ttt_player_turn = ttt_player2;
  }
  tttBoardSetup();
} else if ((msg.content.toLowerCase() === "tails") && ttt_start && !ttt_player_search && (msg.member.user.tag === ttt_player1)) {
  var coin_flip = Math.floor(Math.random() * (2 - 1 + 1) + 1); //randomize and receive a collection value between 1(min) and 2(max)
  if (coin_flip === 1) {
    msg.reply(`The coin has landed on heads. You won the coin flip! You will go first. __*${ttt_player2}*__ will go second!\nGenerating game board...`)
    ttt_player_turn = ttt_player1;
  } else {
    msg.reply(`The coin has landed on tails. You lost the coin flip! You will go second. __*${ttt_player2}*__ will go first!\nGenerating game board...`)
    ttt_player_turn = ttt_player2;
  }
  tttBoardSetup();
}
});

client.on("message", msg => {

  const tttPerformAction = async (ttt_player_turn, player1_moves, player2_moves) => {
    // Create a 1000x1000 pixel canvas and get its context
    // The context will be used to modify the canvas
    const canvas = Canvas.createCanvas(1000, 1000);
    const context = canvas.getContext('2d');
    const background = await Canvas.loadImage('./tic-tac-toe/board.PNG');
    const player1 = await Canvas.loadImage('./tic-tac-toe/player1.png');
    const player2 = await Canvas.loadImage('./tic-tac-toe/player2.PNG');
    // dimensions for 250px RobotoMono
    const xleft_dim = (canvas.width / 2.5)-283;
    const xcenter_dim = (canvas.width / 2.5)+25;
    const xright_dim = (canvas.width / 2.5)+328;
    const xtop_dim = (canvas.height / 1.8)-293;
    const xcenter2_dim = (canvas.height / 1.8)+20;
    const xbot_dim = (canvas.height / 1.8)+333;    
    // dimensions for character pictures
    const left_dim = (canvas.width / 2.5)-323;
    const center_dim = xcenter_dim-40;
    const right_dim = (canvas.width / 2.5)+283;
    const top_dim = xcenter2_dim-518;
    const center2_dim = xcenter2_dim-200;
    const bot_dim = xcenter2_dim+108;  

    // This uses the canvas dimensions to stretch the image onto the entire canvas
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Set the color of the stroke
    context.strokeStyle = '#0099ff';

    // Draw a rectangle with the dimensions of the entire canvas
    context.strokeRect(0, 0, canvas.width, canvas.height);

    // Select the font size and type from one of the natively available fonts
    context.font = '250px RobotoMono';

    // Select the style that will be used to fill the text in
    context.fillStyle = '#e32636';

    for (var user_act in player1_moves) {
      //await sleep(1000); //wait a second
      character_icon = player2;
      //console.log(player1_moves[user_act])
      if (user_act === `1` && player1_moves[user_act] === 1) {
        context.drawImage(character_icon, left_dim, top_dim); //left top (1)
        console.log(user_act)
      } else if (user_act === `2` && player1_moves[user_act] === 1) {
        context.drawImage(character_icon, center_dim, top_dim); //center top (2)
        console.log(user_act)
      } else if (user_act === `3` && player1_moves[user_act] === 1) {
        context.drawImage(character_icon, right_dim, top_dim); //right top (3)
        console.log(user_act)
      } else if (user_act === `4` && player1_moves[user_act] === 1) {
        context.drawImage(character_icon, left_dim, center2_dim); //left center (4)
        console.log(user_act)
      } else if (user_act === `5` && player1_moves[user_act] === 1) {
        context.drawImage(character_icon, center_dim, center2_dim); //center (5)
        console.log(user_act)
      } else if (user_act === `6` && player1_moves[user_act] === 1) {
        context.drawImage(character_icon, right_dim, center2_dim); //right center (6)
        console.log(user_act)
      } else if (user_act === `7` && player1_moves[user_act] === 1) {
        context.drawImage(character_icon, left_dim, bot_dim); //left bot (7)
        console.log(user_act)
      } else if (user_act === `8` && player1_moves[user_act] === 1) {
        context.drawImage(character_icon, center_dim, bot_dim); //center bot (8)
        console.log(user_act)
      } else if (user_act === `9` && player1_moves[user_act] === 1) {
        context.drawImage(character_icon, right_dim, bot_dim); //right bot (9)
        console.log(user_act)
      }
    }

    for (var user_act in player2_moves) {
      //await sleep(1000); //wait a second
      character_icon = player1;
      if (user_act === `1` && player2_moves[user_act] === 1) {
        context.drawImage(character_icon, left_dim, top_dim); //left top (1)
        console.log(user_act)
      } else if (user_act === `2` && player2_moves[user_act] === 1) {
        context.drawImage(character_icon, center_dim, top_dim); //center top (2)
        console.log(user_act)
      } else if (user_act === `3` && player2_moves[user_act] === 1) {
        context.drawImage(character_icon, right_dim, top_dim); //right top (3)
        console.log(user_act)
      } else if (user_act === `4` && player2_moves[user_act] === 1) {
        context.drawImage(character_icon, left_dim, center2_dim); //left center (4)
        console.log(user_act)
      } else if (user_act === `5` && player2_moves[user_act] === 1) {
        context.drawImage(character_icon, center_dim, center2_dim); //center (5)
        console.log(user_act)
      } else if (user_act === `6` && player2_moves[user_act] === 1) {
        context.drawImage(character_icon, right_dim, center2_dim); //right center (6)
        console.log(user_act)
      } else if (user_act === `7` && player2_moves[user_act] === 1) {
        context.drawImage(character_icon, left_dim, bot_dim); //left bot (7)
        console.log(user_act)
      } else if (user_act === `8` && player2_moves[user_act] === 1) {
        context.drawImage(character_icon, center_dim, bot_dim); //center bot (8)
        console.log(user_act)
      } else if (user_act === `9` && player2_moves[user_act] === 1) {
        context.drawImage(character_icon, right_dim, bot_dim); //right bot (9)
        console.log(user_act)
      }
    }

    // Use the helpful Attachment class structure to process the file for you
    var attachment = new MessageAttachment(canvas.toBuffer(), './tic-tac-toe/board.PNG');
    msg.channel.send({ files: [attachment] });
    msg.channel.send(`Generating updated board... Please wait!`);
    msg.channel.send(`It is now __*${ttt_player_turn}*__'s turn!`);
  }

  const turn_action = async (available_moves, player_input, ttt_player1, ttt_player2, ttt_player_turn, player1_moves, player2_moves) => {
    //if (available_moves[player_input] === 0) {
      //msg.reply(`This spot is already taken! Please try again.`)
    //} else {
      available_moves[player_input] = 0;
      if (ttt_player1 === msg.member.user.tag) {
        player1_moves[player_input]=1;
        console.log(player1_moves);
        ttt_player_turn = ttt_player2;
        tttPerformAction(ttt_player_turn, player1_moves, player2_moves);
      } else if (ttt_player2 === msg.member.user.tag) {
        player2_moves[player_input]=1;
        console.log(player2_moves);
        ttt_player_turn = ttt_player1;
        tttPerformAction(ttt_player_turn, player1_moves, player2_moves);
      }
      if (ttt_player2 === 'RyanBot') {
        //msg.channel.send(`It is now __*RyanBot*__'s turn!`)
        await sleep(1000);
        var random_action = 0;
        while (random_action === 0) {
          random_action = Math.floor(Math.random() * (9 - 1 + 1) + 1); //randomize and receive a collection value between 1(min) and 9(max)
          if (available_moves[random_action] === 0) {
            random_action = 0;
          }
          player_input = random_action;
          available_moves[player_input] = 0;
          player2_moves[player_input]=1;
          console.log(player2_moves);
        }
        ttt_player_turn = ttt_player1;
        tttPerformAction(ttt_player_turn, player1_moves, player2_moves);
      }
    //}
  }

if ((msg.content.toLowerCase() === "1") && ttt_start && (ttt_player_turn === msg.member.user.tag)) {
  player_input = 1;
  if (available_moves[player_input] === 0) {
    msg.reply(`This spot is already taken! Please try again.`)
  } else {
    turn_action(available_moves, player_input, ttt_player1, ttt_player2, ttt_player_turn, player1_moves, player2_moves);
    if (ttt_player1 === msg.member.user.tag && ttt_player2 !== 'RyanBot') {
      ttt_player_turn = ttt_player2;
    } else if (ttt_player2 === msg.member.user.tag && ttt_player2 !== 'RyanBot') {
      ttt_player_turn = ttt_player1;
    }
  }
  //msg.channel.send(`It is now __*${ttt_player_turn}*__'s turn!`);
} else if ((msg.content.toLowerCase() === "2") && ttt_start && (ttt_player_turn === msg.member.user.tag)) {
  player_input = 2;
  if (available_moves[player_input] === 0) {
    msg.reply(`This spot is already taken! Please try again.`)
  } else {
    turn_action(available_moves, player_input, ttt_player1, ttt_player2, ttt_player_turn, player1_moves, player2_moves);
    if (ttt_player1 === msg.member.user.tag && ttt_player2 !== 'RyanBot') {
      ttt_player_turn = ttt_player2;
    } else if (ttt_player2 === msg.member.user.tag && ttt_player2 !== 'RyanBot') {
      ttt_player_turn = ttt_player1;
    }
  }
  //msg.channel.send(`It is now __*${ttt_player_turn}*__'s turn!`);
} else if ((msg.content.toLowerCase() === "3") && ttt_start && (ttt_player_turn === msg.member.user.tag)) {
  player_input = 3;
  if (available_moves[player_input] === 0) {
    msg.reply(`This spot is already taken! Please try again.`)
  } else {
    turn_action(available_moves, player_input, ttt_player1, ttt_player2, ttt_player_turn, player1_moves, player2_moves);
    if (ttt_player1 === msg.member.user.tag && ttt_player2 !== 'RyanBot') {
      ttt_player_turn = ttt_player2;
    } else if (ttt_player2 === msg.member.user.tag && ttt_player2 !== 'RyanBot') {
      ttt_player_turn = ttt_player1;
    }
  }
  //msg.channel.send(`It is now __*${ttt_player_turn}*__'s turn!`);
} else if ((msg.content.toLowerCase() === "4") && ttt_start && (ttt_player_turn === msg.member.user.tag)) {
  player_input = 4;
  if (available_moves[player_input] === 0) {
    msg.reply(`This spot is already taken! Please try again.`)
  } else {
    turn_action(available_moves, player_input, ttt_player1, ttt_player2, ttt_player_turn, player1_moves, player2_moves);
    if (ttt_player1 === msg.member.user.tag && ttt_player2 !== 'RyanBot') {
      ttt_player_turn = ttt_player2;
    } else if (ttt_player2 === msg.member.user.tag && ttt_player2 !== 'RyanBot') {
      ttt_player_turn = ttt_player1;
    }
  }
  //msg.channel.send(`It is now __*${ttt_player_turn}*__'s turn!`);
} else if ((msg.content.toLowerCase() === "5") && ttt_start && (ttt_player_turn === msg.member.user.tag)) {
  player_input = 5;
  if (available_moves[player_input] === 0) {
    msg.reply(`This spot is already taken! Please try again.`)
  } else {
    turn_action(available_moves, player_input, ttt_player1, ttt_player2, ttt_player_turn, player1_moves, player2_moves);
    if (ttt_player1 === msg.member.user.tag && ttt_player2 !== 'RyanBot') {
      ttt_player_turn = ttt_player2;
    } else if (ttt_player2 === msg.member.user.tag && ttt_player2 !== 'RyanBot') {
      ttt_player_turn = ttt_player1;
    }
  }
  //msg.channel.send(`It is now __*${ttt_player_turn}*__'s turn!`);
} else if ((msg.content.toLowerCase() === "6") && ttt_start && (ttt_player_turn === msg.member.user.tag)) {
  player_input = 6;
  if (available_moves[player_input] === 0) {
    msg.reply(`This spot is already taken! Please try again.`)
  } else {
    turn_action(available_moves, player_input, ttt_player1, ttt_player2, ttt_player_turn, player1_moves, player2_moves);
    if (ttt_player1 === msg.member.user.tag && ttt_player2 !== 'RyanBot') {
      ttt_player_turn = ttt_player2;
    } else if (ttt_player2 === msg.member.user.tag && ttt_player2 !== 'RyanBot') {
      ttt_player_turn = ttt_player1;
    }
  }
  //msg.channel.send(`It is now __*${ttt_player_turn}*__'s turn!`);
} else if ((msg.content.toLowerCase() === "7") && ttt_start && (ttt_player_turn === msg.member.user.tag)) {
  player_input = 7;
  if (available_moves[player_input] === 0) {
    msg.reply(`This spot is already taken! Please try again.`)
  } else {
    turn_action(available_moves, player_input, ttt_player1, ttt_player2, ttt_player_turn, player1_moves, player2_moves);
    if (ttt_player1 === msg.member.user.tag && ttt_player2 !== 'RyanBot') {
      ttt_player_turn = ttt_player2;
    } else if (ttt_player2 === msg.member.user.tag && ttt_player2 !== 'RyanBot') {
      ttt_player_turn = ttt_player1;
    }
  }
  //msg.channel.send(`It is now __*${ttt_player_turn}*__'s turn!`);
} else if ((msg.content.toLowerCase() === "8") && ttt_start && (ttt_player_turn === msg.member.user.tag)) {
  player_input = 8;
  if (available_moves[player_input] === 0) {
    msg.reply(`This spot is already taken! Please try again.`)
  } else {
    turn_action(available_moves, player_input, ttt_player1, ttt_player2, ttt_player_turn, player1_moves, player2_moves);
    if (ttt_player1 === msg.member.user.tag && ttt_player2 !== 'RyanBot') {
      ttt_player_turn = ttt_player2;
    } else if (ttt_player2 === msg.member.user.tag && ttt_player2 !== 'RyanBot') {
      ttt_player_turn = ttt_player1;
    }
  }
  //msg.channel.send(`It is now __*${ttt_player_turn}*__'s turn!`);
} else if ((msg.content.toLowerCase() === "9") && ttt_start && (ttt_player_turn === msg.member.user.tag)) {
  player_input = 9;
  if (available_moves[player_input] === 0) {
    msg.reply(`This spot is already taken! Please try again.`)
  } else {
    turn_action(available_moves, player_input, ttt_player1, ttt_player2, ttt_player_turn, player1_moves, player2_moves);
    if (ttt_player1 === msg.member.user.tag && ttt_player2 !== 'RyanBot') {
      ttt_player_turn = ttt_player2;
    } else if (ttt_player2 === msg.member.user.tag && ttt_player2 !== 'RyanBot') {
      ttt_player_turn = ttt_player1;
    }
  }
  //msg.channel.send(`It is now __*${ttt_player_turn}*__'s turn!`);
} else if (((msg.content.toLowerCase() === "1") || (msg.content.toLowerCase() === "2") || (msg.content.toLowerCase() === "3") || (msg.content.toLowerCase() === "4") || (msg.content.toLowerCase() === "5") || (msg.content.toLowerCase() === "6") || (msg.content.toLowerCase() === "7") || (msg.content.toLowerCase() === "8") || (msg.content.toLowerCase() === "9")) && ttt_start && (ttt_player_turn !== msg.member.user.tag)) {
  msg.reply(`It is not your turn!!! It is __*${ttt_player_turn}'s*__ turn!`)
}
});


client.on("message", msg => {
if ((msg.content.toLowerCase() === "ttt end") && ttt_start) {
  ttt_player1 = [];
  ttt_player2 = [];
  ttt_start = false;
  ttt_player_search = false;
  ttt_player_turn = [];
  player_input = [];
  available_moves = [0,1,2,3,4,5,6,7,8,9];
  player1_moves = [0,0,0,0,0,0,0,0,0,0];
  player2_moves = [0,0,0,0,0,0,0,0,0,0];
  msg.reply(`Tic-tac-toe has ended`);
}
});

client.on("message", msg => {
if (msg.content.toLowerCase() === "ttt test") {
  const tttTestCanvas = async () => {
    // Create a 1000x1000 pixel canvas and get its context
    // The context will be used to modify the canvas
    const canvas = Canvas.createCanvas(1000, 1000);
    const context = canvas.getContext('2d');
    const background = await Canvas.loadImage('./tic-tac-toe/board.PNG');
    const player1 = await Canvas.loadImage('./tic-tac-toe/player1.png');
    const player2 = await Canvas.loadImage('./tic-tac-toe/player2.PNG');
    // dimensions for 250px RobotoMono
    const xleft_dim = (canvas.width / 2.5)-283;
    const xcenter_dim = (canvas.width / 2.5)+25;
    const xright_dim = (canvas.width / 2.5)+328;
    const xtop_dim = (canvas.height / 1.8)-293;
    const xcenter2_dim = (canvas.height / 1.8)+20;
    const xbot_dim = (canvas.height / 1.8)+333;    
    // dimensions for character pictures
    const left_dim = (canvas.width / 2.5)-323;
    const center_dim = xcenter_dim-40;
    const right_dim = (canvas.width / 2.5)+283;
    const top_dim = xcenter2_dim-518;
    const center2_dim = xcenter2_dim-200;
    const bot_dim = xcenter2_dim+108;  

    // This uses the canvas dimensions to stretch the image onto the entire canvas
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Set the color of the stroke
    context.strokeStyle = '#0099ff';

    // Draw a rectangle with the dimensions of the entire canvas
    context.strokeRect(0, 0, canvas.width, canvas.height);

    // Select the font size and type from one of the natively available fonts
    context.font = '250px RobotoMono';

    // Select the style that will be used to fill the text in
    context.fillStyle = '#e32636';

    // Actually fill the text with a solid color
    context.drawImage(player1, center_dim, center2_dim); //center (5)
    context.drawImage(player2, center_dim, top_dim); //center top (2)
    context.drawImage(player1, center_dim, bot_dim); //center bot (8)
    context.drawImage(player2, left_dim, center2_dim); //left center (4)
    context.drawImage(player1, left_dim, top_dim); //left top (1)
    context.drawImage(player2, left_dim, bot_dim); //left bot (7)
    context.drawImage(player1, right_dim, center2_dim); //right center (6)
    context.drawImage(player2, right_dim, top_dim); //right top (3)
    context.drawImage(player1, right_dim, bot_dim); //right bot (9)

    // For text
    //context.filltext(`X`, xcenter_dim, xcenter2_dim); //center (5)
    //context.fillText(`X`, xcenter_dim, xbot_dim); //center bot (8)
    //context.fillText(`X`, xcenter_dim, xtop_dim); //center top (2)
    //context.fillText(`X`, xleft_dim, xcenter2_dim); //left center (4)
    //context.fillText(`X`, xleft_dim, xbot_dim); //left bot (7)
    //context.fillText(`X`, xleft_dim, xtop_dim); //left top (1)
    //context.fillText(`X`, xright_dim, xcenter2_dim); // right center (6)
    //context.fillText(`X`, xright_dim, xbot_dim); //right bot (9)
    //context.fillText(`X`, xright_dim, xtop_dim); //right top (3)

    // Use the helpful Attachment class structure to process the file for you
    const attachment = new MessageAttachment(canvas.toBuffer(), './wallpaper.jpg');
    msg.channel.send({ files: [attachment] });
  }
  tttTestCanvas();
}
})

////////////////////////////GOOGLE API FOR JSON FILES///////////////////////////////////
const readline = require('readline');
const {google} = require('googleapis');
const client_ID = process.env.Google_Client_ID;
const client_secret = process.env.Google_Client_Secret;
const redirect_URL = `https://developers.google.com/oauthplayground`;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const request = require('request');
const oauth2Client = new google.auth.OAuth2(
  client_ID,
  client_secret,
  redirect_URL
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

function google_transaction(userId, pointVar) {//update specific user information into google drive as a backup
  drive.files.get({
	  }).then(function(success) {
		  //console.log(success.data.webContentLink);	
		  request(success.data.webContentLink, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    var userData = JSON.parse(body);
				userData[userId] = pointVar;
			drive.files.update({
				media: {
					mimeType: 'application/json',
					body: JSON.stringify(userData)
				}
        
			}, (file, err) => {
				if (err) {
        			//console.log(err);
        		}
      		})
		  }	
		})
	  }, function(fail) {
		  //console.log('Failed: '+ fail);
	  })
}

//function google_balance() { //doesn't work (it takes too long for the promise)
  //drive.files.get({  
	  //}).then(function(success) {
		  ////console.log(success.data.webContentLink);	
		  ////return new Promise(() => {
			//request(success.data.webContentLink, function (error, response, body) {
				//if (!error && response.statusCode == 200) {
						////resolve(JSON.parse(body));
            ////var body = JSON.parse(body);
            ////return body;
            //var parsed_body = JSON.parse(body);
            //console.log(parsed_body);
            //return parsed_body;
			  //}
		//})
	  //}, function(fail) {
		  ////console.log('Failed: '+ fail);
	  //})
//}


////////////////////////////////YAHOO FANTASY API///////////////////////////////////////
//const yahoo_client_ID = process.env.Yahoo_Client_ID;
//const yahoo_client_secret = process.env.Yahoo_Client_Secret;
//const redirect_URL = `https://developers.google.com/oauthplayground`;
//const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
//const request = require('request');
//const yahoo_oauth2Client = new yahoo.auth.OAuth2(
  //yahoo_client_ID,
  //yahoo_client_secret,
//);
//yahoo_oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });



// import the library
//const YahooFantasy = require('yahoo-fantasy');

// you can get an application key/secret by creating a new application on Yahoo!
//const yf = new YahooFantasy(
  //process.env.Yahoo_Client_ID, // Yahoo! Application Key
  //process.env.Yahoo_Client_Secret, // Yahoo! Application Secret
  //tokenCallbackFunction, // callback function when user token is refreshed (optional)
  //redirectUri // redirect endpoint when user authenticates (optional)
//);

// you can authenticate a user by setting a route to call the auth function
// note: from v4.0 on, public queries are now supported; that is, you can query
// public resources without authenticating a user (ie/ game meta, player meta,
// and information from public leagues)
//yf.auth(
  //response // response object to redirect the user to the Yahoo! login screen
//)

// you also need to set up the callback route (defined as the redirect uri above)
// note: this will automatically set the user and refresh token if the request is
// successful, but you can also call them manually, described below
//yf.authCallback(
  //request, // the request will contain the auth code from Yahoo!
  //callback // callback function that will be called after the token has been retrieved
//)

// if you're not authenticating via the library you'll need to set the Yahoo!
// token for the user
//yf.setUserToken(
  //Y!CLIENT_TOKEN
//);

// you can do the same for the refresh token...
// if you set this and the token expires (lasts an hour) then the token will automatically
// refresh and call the above "tokenCallbackFunction" that you've specified to persist the
// token elsewhere
//yf.setRefreshToken(
  //Y!CLIENT_REFRESH_TOKEN
//);

// query a resource/subresource
//yf.{resource}.{subresource} (
  //{possible argument(s)},
  //function cb(err, data) {
    // handle error
    // callback function
    // do your thing
  //}
//);

client.on("message", msg => {
if (msg.content.toLowerCase() === "yahoo") {
  msg.channel.send(`test`);
}
})



////////////////////////////////TEST STATEMENTS/////////////////////////////////////////
const meme_collection = ["https://i.imgur.com/ydUaXNc.jpeg", "https://i.imgur.com/l4mf7sK.jpeg"]
client.on("message", msg => {
if (msg.content.toLowerCase() === "meme") {
  msg.channel.send("ur mom", {files: [meme_collection[1]]});
}
})



/////////////////////////////KEEP BOT ALIVE 24/7////////////////////////////////////////
keepAlive()
client.login(process.env.TOKEN1) //secret environment variable for discord
