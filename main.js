/// Californian Trail
/// https://github.com/HeronErin/Californian-Trail.git


var prompt = require('prompt-sync')()
// https://nodejs.org/api/timers.html
const { setTimeout: setTimeoutPromise } = require('node:timers/promises');
const {dondge_rock} = require("./strafe")
const {
  DEAD_GUY, TEMPLE, DEMON, DEMON_FIGHT_FRAMES, DEMON_HURT_FRAMES, BIG_DAY,
  BIG_WIN, ansi_green, BIG_CURE, typewriter,
  STATUE, SWORD, FOX,PressAnyKey,
  HURT_BEAR_FRAMES, ansi_cyan_bg, blue_cyan_backdrop, MAN_FIGHT_FRAMES, MAN_HURT_FRAMES,
  BEAR_FIGHT_FRAMES,
  SNAKE_FIGHT_FRAMES, BIG_SPLAT,
  SNAKE_HURT_FRAMES,
  BIG_BEAR, BIG_SUNLIGHT,
  BIG_NAME, TOWER,
  BIG_SHOP_TEXT, number_prompt,
  BIG_START, BIG_TORNADO,
  BIG_SNAKE,
  BIG_COWARD, BIG_SWING, BIG_CRACK,
  BIG_DEAD,
  BIG_1,
  BIG_2,
  BIG_3,
  clear,
  chance,
  options_prompt,BIG_CONFUSION, BIG_WELCOME,
  length_prompt,
  get_name,
  ansi_reset,
  ansi_red,
  ansi_yellow,
  ansi_yellow_bg,
  ansi_purple,
  ansi_dark_purple,
  name_of_wagon,
  name_of_sword,
  name_of_shovel,
  BIG_HOURS,
  BIG_THAT,
  BIG_NIGHT,
  BIG_LATER
,WIZZARD_FIGHT_FRAMES, WIZZARD_HURT_FRAMES} = require('./terminalStuff');


var stats = {
  name: "",
  health: 100,
  balance: 8000,
  food: 0,
  first_aid_kits: 0,

  wagon: -1,
  wagon_health: 100,

  shovel: -1,
  sword: -1,

  artifacts: []

}

async function starting_shop() {
  clear();
  console.log(BIG_SHOP_TEXT + "\n")

  while (true){
    await typewriter("Welcome to the shop, traveler. Before you set out on your journey you must get equipped.\n", 50)
    await shop_window()
    if (stats.sword == -1 || stats.wagon == -1 || stats.shovel == -1){
      await typewriter(ansi_yellow+"\nTraveler, you appear to be ill-equipped, please purchase a sword, wagon, and shovel!\n" + ansi_reset, 50)
    }else if (stats.food < 10){
      await typewriter(ansi_yellow+"\nWith that little food you will starve to death for sure\n"+ ansi_reset, 50)
    }else if (stats.first_aid_kits < 5){
      await typewriter(ansi_yellow+"\nWithout any First Aid Kits you are sure to perish\n"+ ansi_reset, 50)
    }else{
      return;
    }
  }
}

async function purchase_x_amount(question, price){
  let amount = prompt(question)*1 // To number
  if (stats.balance >= amount * price){
    stats.balance -= amount * price
    return amount
  }
  else{
    await typewriter(ansi_red+"You do not have enough balance to purchase this."+ansi_reset, 50)
    return 0
  }
}

function priceCalc(number, mode){
  if (mode == '3')
    return 2**(number) * 200;
  else if (mode == '4')
    return 2**(number) * 500;
  else if (mode == "5")
    return 2**(number) * 350;
}

async function shop_select_menu(option){
  console.log("Which one would you like?")

  let name_get;
  if (option =="3")
    name_get = name_of_shovel;
  else if (option == "4")
    name_get = name_of_wagon;
  else if (option == "5")
    name_get = name_of_sword;

  for (let i = 1; i != 8; i++)
    console.log(i+": "+ name_get(i) + " (" + priceCalc(i, option) + " balance)");

  console.log("8: Back");
  let item_to_buy = options_prompt(": ", ["1", "2", "3", "4", "5", "6", "7", "8"]);
  if (item_to_buy != "8"){
    let price = priceCalc(item_to_buy*1, option);
    if (price <= stats.balance){
      stats.balance-=price;
      if (option == "3"){
        if (stats.shovel >= item_to_buy*1){
          stats.balance+=price;
          await typewriter(ansi_red+"You already have this or a better tool."+ansi_reset, 50);
          return await shop_window();
        }
        else
          stats.shovel = item_to_buy*1;

      }else  if (option == "4"){
        if (stats.wagon >= item_to_buy*1){
          stats.balance+=price;
          await typewriter(ansi_red+"You already have this or a better tool."+ansi_reset, 50);
          return await shop_window();
        }
        else
          stats.wagon = item_to_buy*1;
      }else if (option == "5"){
        if (stats.sword >= item_to_buy*1){
          stats.balance+=price;
          console.log(ansi_red+"You already have this or a better tool."+ansi_reset);
          return await shop_window();
        }
        else
          stats.sword = item_to_buy*1;
      }
    }else{
      clear()
      console.log(ansi_red+"You do not have enough balance to purchase this."+ansi_reset);
      return shop_window();
    }
  }
  clear()
  return shop_window();
}

async function shop_window(){
  display_stats_for_store();

  console.log("\nPurchase Items:")
  console.log("1. Food (40 balance each)")
  console.log("2. First Aid kits (40 balance each)")
  console.log("3. Shovels (Multiple options available)")
  console.log("4. Wagons (Multiple options available)")
  console.log("5. Swords (Multiple options available)")
  console.log("6. Instant heal (10 balance per health point)")
  console.log("7. Exit shop")
  let option = options_prompt(": ", ["1", "2", "3", "4", "5", "6", "7", "999"])
  if (option == "1"){
    let amount = await purchase_x_amount("How much food would you like to purchase: ", 40)
    clear();
    if (amount > 0){
      stats.food += amount
      console.log("You have purchased " + amount + " food.")
    }
    return await shop_window();
  }else if (option == "2"){
    let amount = await purchase_x_amount("How many First Aid kits would you like to purchase: ", 40)
    clear();
    if (amount > 0){
      stats.first_aid_kits += amount
      console.log("You have purchased " + amount + " First Aid kits")
    }

    return await shop_window();
  }else if (option =="3" || option =="4" || option =="5"){
    await shop_select_menu(option);
  }else if (option == "999") console.log(stats)
}

function display_stats_for_store() {
  console.log("You currently have:\n")
  console.log("Health: " + stats.health)
  console.log("Balance: " + stats.balance)
  console.log("Food: " + stats.food)
  console.log("First aid kits: "+ stats.first_aid_kits)
  console.log("Shovel: " + name_of_shovel(stats.shovel))
  console.log("Wagon: " + name_of_wagon(stats.wagon))
  console.log("Sword: " + name_of_sword(stats.sword))
}

async function start_animation(){
  clear();
  console.log(BIG_NAME)
  await setTimeoutPromise(1000)
  clear();
  console.log(BIG_3);
  await setTimeoutPromise(1000)
  clear();
  console.log(BIG_2);
  await setTimeoutPromise(1000)
  clear();
  console.log(BIG_1);
  await setTimeoutPromise(1000)
  clear();
  console.log(BIG_START);
}

async function snake(){
  await typewriter("\nBut what is that on the ground?\n", 50)
  await setTimeoutPromise(4000);
  console.log(BIG_SNAKE);
  await setTimeoutPromise(1000);
  console.log();
  console.log("\nWhat do you do?");
  console.log("A. Run back inside")
  console.log("B. Hit it with your " + name_of_sword(stats.sword))
  console.log("C. Try to sneak past and hope it doesn't notice: ")
  let snake_opt = options_prompt(": ", ["a", "b", "c"])
  if (snake_opt == "a"){
    await typewriter("You run back inside your small town, never to leave. You are now the laughing stock of the town. ", 50)
    await typewriter("You spent " + (8000-stats.balance) +" dollars only to run back inside. What a coward.", 50)
    await setTimeoutPromise(10000);
    for (let x = 0; x != 50 ; x++){
      console.log("\n\n\n"+ansi_red+BIG_COWARD)
      console.log(ansi_reset)
      await setTimeoutPromise(1000);
    }
    await typewriter(ansi_yellow_bg+"You got the coward ending..."+ansi_reset, 50)
    return;
  }
  else if(snake_opt == "b"){
    await fight(snake_animation, 40, SNAKE_FIGHT_FRAMES[21]);
    await typewriter("The snake dropped 500 dollars")
    stats.balance+=500
    await setTimeoutPromise(2000)
  }
  else if (snake_opt == "c"){
    await typewriter("You get on your tiptoes.", 50)
    await setTimeoutPromise(5000);

    if (chance(25)){ // 25% chance you die
      await typewriter("The snake turns towards you.", 50)
      await setTimeoutPromise(5000);
      await typewriter("You freeze", 50)
      await setTimeoutPromise(750);
      await typewriter("The snake bites you.", 50)
      await setTimeoutPromise(750);
      await typewriter("You feel a "+ansi_red+" pain"+ansi_reset +" run up your leg", 50)
      await setTimeoutPromise(1000);
      await typewriter("You begin to feel dizzy", 50)
      await setTimeoutPromise(2000);
      await typewriter("You fall asleep, never to wake up again.", 50)
      await setTimeoutPromise(4000);
      await typewriter(ansi_red+"\n\n"+BIG_DEAD+"\n\n"+ansi_reset, 50);
      await setTimeoutPromise(15000);
      await typewriter(ansi_yellow_bg+"You have gotten the snake coward ending"+ansi_reset, 50)

      return;
    }else{
      await typewriter("It works, you are past the snake", 50)
      await setTimeoutPromise(4000);
      await typewriter("Feeling a little bit of shame you continue", 50)
      await setTimeoutPromise(4000);
    }
  }
  await typewriter("You made it past the snake.", 50)
  return true
}
async function WIZZARD_ANIMATION(offset){
  let len = 29
  let frames = WIZZARD_FIGHT_FRAMES;
  if (offset) {
    frames = WIZZARD_HURT_FRAMES;
  }

    let start = 0;
    if (!stats.crown_of_chaos)
      start= 4
    for (let x = len; x != 0; x--){
      clear();
      let lines = frames[x].split("\n");
      console.log(lines.slice(start, lines.length).join("\n"))
      console.log("\nHealth: " + stats.health)
      console.log("Enemy Health: " + stats.enemy_health)
      console.log("First Aid Kits: " + stats.first_aid_kits)
      await setTimeoutPromise(20 + Math.abs(12-x));
    }
  
  if (!offset){
    for (let x = len; x != 0; x--){
      clear();
      let lines = frames[len-x].split("\n");
      console.log(lines.slice(start, lines.length).join("\n"))
      console.log("\nHealth: " + stats.health)

      console.log("Enemy Health: " + stats.enemy_health)
      console.log("First Aid Kits: " + stats.first_aid_kits)
      if (!offset)
        await setTimeoutPromise(20 + Math.abs(12-x));
      else
        await setTimeoutPromise(10);
    }
  }
}
async function snake_animation(offset){
  let len = 20
  let frames = SNAKE_FIGHT_FRAMES;
  if (offset) {
    frames = SNAKE_HURT_FRAMES;
    len = 19;
  }
  for (let x = len; x != 0; x--){
    clear();
    console.log(frames[x])
    console.log("\nHealth: " + stats.health)
    console.log("Enemy Health: " + stats.enemy_health)
    console.log("First Aid Kits: " + stats.first_aid_kits)
    await setTimeoutPromise(20 + Math.abs(12-x));
  }
  for (let x = len; x != 0; x--){
    clear();
    console.log(frames[len-x])
    console.log("\nHealth: " + stats.health)
    console.log("Enemy Health: " + stats.enemy_health)
    console.log("First Aid Kits: " + stats.first_aid_kits)
    await setTimeoutPromise(20 + Math.abs(12-x));
  }
}

async function demon_animation(offset) {
  let len = 40
  let frames = DEMON_FIGHT_FRAMES;
  if (offset) {
    frames = DEMON_HURT_FRAMES;
    len = 40;
  }
  for (let x = len; x != 0; x--){
    clear();
    console.log(frames[x])
    console.log("\nHealth: " + stats.enemy_health)
    console.log("Enemy Health: " + stats.health)
    console.log("First Aid Kits: " + stats.first_aid_kits)
    await setTimeoutPromise(20 + Math.abs(12-x));
  }
  for (let x = len; x != 0; x--){
    clear();
    console.log(frames[len-x])
    console.log("\nHealth: " + stats.enemy_health)
    console.log("Enemy Health: " + stats.health)
    console.log("First Aid Kits: " + stats.first_aid_kits)
    await setTimeoutPromise(20 + Math.abs(12-x));
  }
}

async function bear_animation(offset){
  let len = 27
  let frames = BEAR_FIGHT_FRAMES;
  if (offset) {
    frames = HURT_BEAR_FRAMES;
    len = 17;
  }
  for (let x = len; x != 0; x--){
    clear();
    console.log(frames[x])
    console.log("\nHealth: " + stats.health)
    console.log("Enemy Health: " + stats.enemy_health)
    console.log("First Aid Kits: " + stats.first_aid_kits)
    await setTimeoutPromise(20 + Math.abs(12-x));
  }
  for (let x = len; x != 0; x--){
    clear();
    console.log(frames[len-x])
    console.log("\nHealth: " + stats.health)

    console.log("Enemy Health: " + stats.enemy_health)
    console.log("First Aid Kits: " + stats.first_aid_kits)
    await setTimeoutPromise(20 + Math.abs(12-x));
  }
}

async function man_animation(offset){
  let len = 27
  let frames = MAN_FIGHT_FRAMES;
  if (offset) {
    frames = MAN_HURT_FRAMES;
    len = 42;
  }
  if (!offset){
    for (let x = len; x != 0; x--){
      clear();
      console.log(frames[x])
      console.log("\nHealth: " + stats.health)
      console.log("Enemy Health: " + stats.enemy_health)
      console.log("First Aid Kits: " + stats.first_aid_kits)
      await setTimeoutPromise(20 + Math.abs(12-x));
    }
  }
  
  for (let x = len; x != 0; x--){
    clear();
    console.log(frames[len-x])
    console.log("\nHealth: " + stats.health)

    console.log("Enemy Health: " + stats.enemy_health)
    console.log("First Aid Kits: " + stats.first_aid_kits)
    if (!offset)
      await setTimeoutPromise(20 + Math.abs(12-x));
    else
      await setTimeoutPromise(10);
  }

}
async function fight(animation_func, enemy_health, base_frame, reversed, damage){
  if (damage == undefined)
    damage = 20;
  let enemy_attack = false;
  stats.enemy_health = enemy_health;
  while (true){
      clear();
      console.log(base_frame)
      
      if (!reversed){
        console.log("\nHealth: " + stats.health)
        console.log("Enemy Health: " + stats.enemy_health)
      }else{
        console.log("\nHealth: " + stats.enemy_health)
        console.log("Enemy Health: " + stats.health )
      }
      console.log("First Aid Kits: " + stats.first_aid_kits)
      if (! enemy_attack){
        console.log("\n\n")
        console.log('A. Swing sword')
        if (stats.first_aid_kits >= 1)
          console.log("B. Heal")
        if (reversed)
          console.log("C. Resist")
      }


    if (!reversed){
      if (stats.health <= 0){
        clear();
        console.log(DEAD_GUY)
        console.log("\n\n")
        await setTimeoutPromise(3000)
        console.log(ansi_red+"\n\n"+BIG_DEAD+"\n\n"+ansi_reset);
        await setTimeoutPromise(6000)
        await typewriter("\n\n\n\nYou have earned a brave death", 50)
        process.exit()
      }
      if (stats.enemy_health <= 0){
        clear();
        await setTimeoutPromise(500)
        console.log(ansi_yellow + BIG_WIN + ansi_reset)
        await setTimeoutPromise(6000)
        stats.health = 100; 
        return;
      }
    }else{
      if (stats.enemy_health <= 0){
        clear();
        console.log(ansi_red+BIG_CONFUSION+ansi_reset);
        await setTimeoutPromise(6000)


        await typewriter("\n\n\n\nYou have been taken by the sword.", 59)
        await setTimeoutPromise(6000)
        await typewriter("This is the "+ name_of_sword(8) + " ending", 50)        
        process.exit()
      }
      if (stats.health <= 0){
        stats.health = 100; 
        clear();
        return;
      }

    }

    if (enemy_attack){
      await setTimeoutPromise(1000)
      enemy_attack = false;
      stats.health-=damage;
      if (reversed)
        stats.health -= 200;
      await animation_func(!reversed)
      continue
    }


    let potential_actions = ["a"];
    if (stats.first_aid_kits >= 1)
      potential_actions.push("b")
    if (reversed)
      potential_actions.push("c")
    let action = options_prompt("Action: ", potential_actions)

    if (action == "a"){
      stats.enemy_health -= (stats.sword*5) + (Math.random()*stats.sword*10)
      await animation_func(!!reversed)
      await setTimeoutPromise(300)
      enemy_attack = true;
      continue
    }else if(action == "b"){
      stats.health += 50;
      stats.first_aid_kits-=1;
      enemy_attack = true;
      continue
    }else if(action == "c"){
      clear();
      let nored = base_frame.replaceAll(ansi_red, ansi_reset)
      for (let t = 0; t != 5; t++){
        clear();
        console.log(nored);
        await setTimeoutPromise(200);
        clear();
        console.log(base_frame);
        await setTimeoutPromise(200);
      }
      enemy_attack = true;
    }


  }
}

async function first_encounter(){
  clear();
  await typewriter("You are ready to start out on your journey, with your trusty "+ name_of_wagon(stats.wagon) +". With the "+ name_of_sword(stats.sword) + " your family has been passing down for generations. You are excited, and if anything gets in your way you always have your "+name_of_shovel(stats.shovel)+".", 50);
  await setTimeoutPromise(2000);
  await PressAnyKey();
  await setTimeoutPromise(1000);
  await typewriter("\n\nYou step out the gates of your small town.\n", 50)
  await setTimeoutPromise(2500);
  await typewriter("\nYou have heard of about many travelers dieing in their journeys, but that could never happened to you\n", 50)
  await setTimeoutPromise(2500);
  await typewriter("\nThat only happens to those people, never people like you\n", 50)
  await setTimeoutPromise(2500);

  if ((await snake()) != true)
    process.exit()


  save(1);
}
async function wilderness_1_event1(){
  clear();
  await typewriter("You step up onto your "+ name_of_wagon(stats.wagon) + " and set out. With all hopes you will make it to California with all the riches from your journey", 50)
  await setTimeoutPromise(2000);
  if (stats.wagon <= 2){
    await typewriter("You don't have much confidence in your wagon, but you think it might just work", 50)
  }
  else if (stats.wagon == 3 || stats.wagon == 4){
    await typewriter('You feel your wagon is high quality, and am proud of it.', 50)
  }else{
    await typewriter("You are unsure how you got such a great wagon, and believe nothing can stop you now.", 50)
  }
  await PressAnyKey();

  clear();
  console.log(BIG_3);
  await setTimeoutPromise(2000);
  clear();
  console.log(BIG_HOURS);
  await setTimeoutPromise(2000);
  clear();
  console.log(BIG_LATER);
  await setTimeoutPromise(2000);
  clear();
  await typewriter("You have been outside of your village for a while now. And have not seen anything", 50)
  await setTimeoutPromise(3000);
  await typewriter("You start to hear something. Is that rushing water?", 50)
  await setTimeoutPromise(6000);
  await typewriter("You see it, a river. ", 50)
  await setTimeoutPromise(3000);

  await river_choice();}

async function wilderness_1_bear_event(){
    clear();
    await typewriter("You see something approaching in the woods", 50)
    await setTimeoutPromise(1000);
    console.log(ansi_red+BIG_BEAR+ansi_reset)
    await setTimeoutPromise(2000);
    await typewriter("Your back is against to water of the river, what do you do?", 50)
    console.log("A. Fight")
    console.log("B. Flight")
    console.log("C. Freeze")
    let choice = options_prompt(": ", ['a', 'b', 'c'])
    stats.enemy_health = 100; // For animations before the fight

    if ('a' == choice){
       await fight(bear_animation, 100, BEAR_FIGHT_FRAMES[27]);
        stats.artifacts.push("bear hide")
        await typewriter("The bear dropped 1500 dollars")
        stats.balance+=1500
        await setTimeoutPromise(2000)
    }
    else if ("b" == choice){
      if (chance(60)){
        await typewriter("You got away", 50)
      }else{
        await bear_animation(true);
        stats.health -= 30;
        await setTimeoutPromise(5000);
        await fight(bear_animation, 100, BEAR_FIGHT_FRAMES[27]);
        stats.artifacts.push("bear hide")
        await typewriter("The bear dropped 1500 dollars")
        stats.balance+=1500
        await setTimeoutPromise(2000)
      }
    }
    else if ("c" == choice){
      await typewriter("You stand perfectly still", 50)
      await setTimeoutPromise(2000);
      await typewriter("The bear sniffs you", 50)
      await setTimeoutPromise(5000);
      if (chance(50)){
        await typewriter("It walks away", 50)
        save(3)
        return;
      }else{
        await bear_animation(true);
        stats.health -= 30;
        await setTimeoutPromise(5000);
        await fight(bear_animation, 100, BEAR_FIGHT_FRAMES[27]);
        stats.artifacts.push("bear hide")
        await typewriter("The bear dropped 1500 dollars")
        stats.balance+=1500
        await setTimeoutPromise(2000)
      }
    }

    save(3)
  
}
async function river_choice(){
  console.log("\nWhat do you do?")
  console.log("A. Abandon all your stuff and swim")
  console.log("B. Turn back")
  console.log("C. Try to float your wagon over the river")
  console.log("D. Try to find a bridge")

  let choice = options_prompt(": ", ["a", "b", "c", "d"])
  if ("a" == choice){
    stats.flag_has_dove = true;
    await typewriter("You didn't want it to come to this, but you don't have a better choice.", 50)
    await setTimeoutPromise(3000);
    await typewriter("You strip down to your underwear, as you didn't bring a swimsuit", 50)
    await setTimeoutPromise(4000);
    let is_secound_time = false;
    while (1){
      await typewriter("You dive in, the current is strong.", 50)
      await setTimeoutPromise(4000);

      if (chance(50)){ // 50% chance
        await typewriter("It pulls you away, it was too strong", 50)
        await setTimeoutPromise(4000);
        await typewriter("You try to fight it, but you are pulled under", 50)
        await setTimeoutPromise(4000);
        await typewriter("You fall asleep, never to wake up again.", 50)
        await setTimeoutPromise(4000);
        await typewriter(ansi_red+"\n\n"+BIG_DEAD+"\n\n"+ansi_reset, 50);
        await setTimeoutPromise(10000);
        await typewriter(ansi_yellow_bg+"You have gotten the Bloated Naked Corpse ending"+ansi_reset, 50)
        await setTimeoutPromise(15000);
        process.exit()
        return;
      }else{
        if (is_secound_time){
          return await river_choice();
        }
        await typewriter("It was hard, but you made it across, but at what cost?", 50)
        await setTimeoutPromise(4000);
        await typewriter("You are in your underwear, on the other side of the river, with no supplies.", 50)
        await setTimeoutPromise(4000);
        if (options_prompt("Do you wish to try to make it back? (y/n): ", ["y", "n"]) == "y"){
          is_secound_time= true;
          continue
        }else{
          clear();
          await typewriter("It is a strange choice, but it is yours.", 50)
          await setTimeoutPromise(4000);
          await typewriter("You walk into the woods, naked, cold, but free.", 50)
          await setTimeoutPromise(4000);
          await typewriter("Never to emerge...", await typewriter)
          await setTimeoutPromise(15000);

          await typewriter(ansi_yellow_bg+"You have gotten the Naked Nomad ending."+ansi_reset, 50)
          process.exit()
          return;
        }


      }
  }

  }
  else if ("b" == choice){
    clear();
    await typewriter("You turn back. Rivers are just too hard for you.", 50)
    await setTimeoutPromise(7000);
    clear();
    console.log(BIG_3);
    await setTimeoutPromise(2000);
    clear();
    console.log(BIG_HOURS);
    await setTimeoutPromise(2000);
    clear();
    console.log(BIG_LATER);
    await setTimeoutPromise(2000);
    clear();
    await typewriter("You walk back inside your small town, never to leave. You are now the laughing stock of the town. ", 50)
    await setTimeoutPromise(10000);
    for (let x = 0; x != 50 ; x++){
      console.log("\n\n\n"+ansi_red+BIG_COWARD)
      console.log(ansi_reset)
      await setTimeoutPromise(1000);
    }
    await typewriter(ansi_yellow_bg+"You got the river coward ending..."+ansi_reset, 50)
    process.exit()
    return;
  }
  else if ("c" == choice){
    clear();
    await typewriter("You have seen over adventurers do this, it has to work.", 50)
    await setTimeoutPromise(3000);
    await typewriter("You take the wheels off", 50)
    await setTimeoutPromise(3000);
    await typewriter("You push it next to the river", 50)
    await setTimeoutPromise(3000);
    await typewriter("You climb on and push", 50)
    await setTimeoutPromise(8000);
    if (chance(90/stats.wagon)){ // The better wagon the better chance you survive. 
      await typewriter("It doesn't work, you start to sink.", 50)
      await setTimeoutPromise(4000);
      await typewriter("The current washes you away.", 50)
      await typewriter("You try to fight it, but you are pulled under", 50)
      await setTimeoutPromise(4000);
      await typewriter("You fall asleep, never to wake up again.", 50)
      await setTimeoutPromise(4000);
      await typewriter(ansi_red+"\n\n"+BIG_DEAD+"\n\n"+ansi_reset, 50);
      await setTimeoutPromise(10000);
      await typewriter(ansi_yellow_bg+"You have gotten the Bloated Corpse ending"+ansi_reset, 50)
      await setTimeoutPromise(15000);
      process.exit()
      return;
    }else{
      await typewriter("It worked, the current was strong, but you were stronger.", 50)
      await setTimeoutPromise(3000);
      stats.wagon_health-=30;
      await typewriter("Your wagon seems to have gotten a little damaged, but it will still function", 50)
      await setTimeoutPromise(3000);
      await typewriter("You will need to get it repaired at the next town", 50)
      return;
    }
  }
  else if ("d" == choice){
    await typewriter("You decide to not risk doing anything stupid.", 50)
    await setTimeoutPromise(3000)
    await typewriter("And start to head south.", 50)
    await setTimeoutPromise(3000)
    if (chance(40)){
      await typewriter("You didn't find anything", 50)
      await setTimeoutPromise(3000)
      return await river_choice();
    }else{
      await typewriter("You start to see something in the distance.", 50)
      await setTimeoutPromise(3000)
      await typewriter("A bridge!!!", 50)
      await setTimeoutPromise(3000)
      await typewriter("Good thing you didn't do something dumb like trying to swim.", 50)
      await setTimeoutPromise(4000)
      await typewriter("You start to cross the bridge", 50)
      if (chance(30)){
        await setTimeoutPromise(1000)
        await typewriter("But it gives out on you. You fall into the water", 50)
        await setTimeoutPromise(5000)
        await typewriter("You try to fight it, but you are pulled under", 50)
        await setTimeoutPromise(4000);
        await typewriter("You fall asleep, never to wake up again.", 50)
        await setTimeoutPromise(4000);
        console.log(ansi_red+"\n\n"+BIG_DEAD+"\n\n"+ansi_reset);
        await setTimeoutPromise(10000);
        await typewriter(ansi_yellow_bg+"You have gotten the Rickety Bridge ending"+ansi_reset, 50)
        await setTimeoutPromise(15000);
        process.exit()
        return;
      }
      await setTimeoutPromise(3000)
      await typewriter("And you come out on the other side, you were not sure the bridge would hold", 50)
      return;
    }
  }
}

async function temple_event(){
  clear();
  await typewriter("After surviving the bear attack, you continue on.\n", 50)
  await setTimeoutPromise(5000)
  await typewriter("Both the bear and the river have gotten you off the beaten path\n", 50)
  await setTimeoutPromise(5000)
  await typewriter("Some would say you are in the middle of nowhere\n", 50)
  await setTimeoutPromise(5000)
  await typewriter("But you know this is just a chance at exploring.\n", 50)
  await setTimeoutPromise(5000)
  await typewriter("And you have nowhere to go but forward\n", 50)

  await PressAnyKey();
  clear();
  console.log(BIG_2);
  await setTimeoutPromise(1500)
  clear();
  console.log(BIG_HOURS);
  await setTimeoutPromise(1500)
  clear();
  console.log(BIG_LATER);
  await setTimeoutPromise(1500)
  clear();


  console.log(TEMPLE)
  await setTimeoutPromise(10000);
  await typewriter("You find something in the middle of the woods.", 50)
  await setTimeoutPromise(1000)
  if ("n"==options_prompt("Do you enter (y/n): ", ["y", "n"])){
    clear();
    await typewriter("You ride past, ignoring all the potential treasure.", 50)
    await setTimeoutPromise(5000)
    return;
  }else{
    await typewriter("You enter the temple.\n", 50)
    await setTimeoutPromise(3000)
    await typewriter("It is even bigger inside than it is outside.\n", 50)
    await setTimeoutPromise(3000)
    await typewriter("There are 4 rooms.\n", 50)
    stats.temple_rooms_states = [true, true, true, true]
    while (true){
      console.log("Which room do you want to enter?")
      for (let i = 1; i <= 4; i++){
        let state = ""
        if (!stats.temple_rooms_states[i-1])
          state = "already entered"
        console.log(i + ". Room "+i+" " + state)
      }
      console.log("Or e to exit")
      let room = options_prompt(": ", ["1", "2", "3", "4", "e", "exit"]);
      if (room == "e" || room == "exit")
        break;

      if (!stats.temple_rooms_states[ (room*1) - 1]){
        await typewriter("You enter room " + room +" but it is empty.", 50)
        if (room == "4" && stats.curse_of_the_temple == undefined)
          await typewriter("Now you are really happy you didn't take that sword", 50)

        await setTimeoutPromise(3000)
      }else if (room == "1"){
        await typewriter("You enter room " + room, 50)
        await setTimeoutPromise(1000)
        console.log(BIG_SNAKE)
        await setTimeoutPromise(4000)
        await fight(snake_animation, 60, SNAKE_FIGHT_FRAMES[21]);
        stats.artifacts.push("Snake meat")
        await typewriter("The snake dropped 500 dollars and some snake meat")
        stats.balance+=500
        await setTimeoutPromise(2000)
        clear();
        stats.temple_rooms_states[0] = false
      }else if (room == "2"){
        await typewriter("You enter room " + room, 50)
        await setTimeoutPromise(4000)
        await typewriter("But it seems to be empty", 50)
        await setTimeoutPromise(4000)
        await typewriter("You look around a bit more", 50)
        await setTimeoutPromise(4000)
        await typewriter("There is a golden locket on the ground", 50)
        await setTimeoutPromise(4000)
        await typewriter(ansi_yellow_bg+"You pick it up"+ansi_reset, 50)
        stats.artifacts.push("Spooky Golden Locket")
        stats.temple_rooms_states[1] = false
        await setTimeoutPromise(1000)
      }else if (room == "3"){
        clear();
        console.log(STATUE)
        await setTimeoutPromise(4000)
        prompt("It is cool, but you are unsure what it means (enter to continue)")
        stats.temple_rooms_states[2] = false
      }else if (room == "4"){
        await typewriter("You enter room " + room, 50)
        await setTimeoutPromise(1000)
        clear()
        console.log(SWORD); 
        await setTimeoutPromise(4000)
        await typewriter("It was a sword in the middle of the room. It is giving off a bad feeling. But is better than your current sword", 50)
        if ("y"==options_prompt("Do you take it (y/n) ", ["y", "n"])){
          stats.curse_of_the_temple=true;
          stats.old_sword = stats.sword;
          stats.sword = 8;
          await typewriter("This is the best sword you have ever seen.", 50)
          await setTimeoutPromise(4000)
          await typewriter("However it give you a sense of impending doom.", 50)
          if ("n"==options_prompt("Do you still take it (y/n) ", ["y", "n"])){
            await typewriter("You put the sword back where you found it", 50)
            stats.curse_of_the_temple = undefined
            stats.sword = stats.old_sword
          }else{
            await typewriter("You exit the room with a new found sense of power, and dread", 50)
          }

        }else{
          clear();
          await typewriter("You turn back and walk away. ", 50)
        }


        stats.temple_rooms_states[3] = false
    }


    
  }
  save(4);
}

}
async function traveler_event() {
  
  clear();


  
  await setTimeoutPromise(3000)
  await typewriter("After the temple, you are ready to head back out\n", 50)
  await setTimeoutPromise(3000)
  if (stats.curse_of_the_temple != undefined)
    await typewriter("Whenever you look down at your sword you get a strange feeling, but you are sure it is nothing\n", 50)
  else
    await typewriter("You feel hopeful for the future\n", 50)
  await setTimeoutPromise(3000)
  clear();
  console.log(BIG_HOURS)
  await setTimeoutPromise(3000)
  clear();
  console.log(BIG_LATER)
  await setTimeoutPromise(3000)
  clear();
  await typewriter("You see something you have not seen for a long time\n", 50)
  await setTimeoutPromise(5000)
  await typewriter("A fellow traveler, just a few yards ahead of you\n", 50)
  await setTimeoutPromise(3000)
  await typewriter("You speed up your wagon to catch up to them.\n", 50)  
  await setTimeoutPromise(3000)
  if (stats.curse_of_the_temple){
    await typewriter("But then\n", 50)
    await setTimeoutPromise(3000)
    prompt("Press any key to continue\n")
    clear();
    console.log(DEMON)
    await setTimeoutPromise(3000)
    await typewriter("Something is wrong", 80)
    await setTimeoutPromise(750)
    await typewriter("Very wrong", 70)
    await setTimeoutPromise(3000)
    await typewriter("Your sword is vibrating. The " + name_of_sword(8) + " can't be controlled", 60)
    await setTimeoutPromise(10000)
    clear();
    console.log(DEMON)
    stats.health = 5000
    await fight(demon_animation, 200, DEMON_FIGHT_FRAMES[40], true)
    stats.balance+=2000
    let dem = DEMON.replace("\n ", "\n"+ansi_cyan_bg).replaceAll(ansi_red, "").replaceAll(ansi_reset, "")
    dem = dem.replace("\n ", "\n"+ansi_reset)
    for (let i = 0; i != dem.split("\n").length; i++){
      clear();
      console.log(dem)
      console.log(ansi_reset)

      dem = dem.replace("\n"+ansi_reset, "\n"+ansi_cyan_bg)
      dem = dem.replace("\n ", "\n"+ansi_reset+" ")
      await setTimeoutPromise(50);
    }
    await setTimeoutPromise(1000);
    clear();
    console.log(ansi_green+BIG_CURE+ansi_reset);
    await setTimeoutPromise(10000);
    clear();
    await typewriter(".......\n", 1500)
    clear();
    await typewriter("You wake up.\n\nYou do not remember anything. \n\nThere is a kind old man looking down at you.\n", 50)

    await setTimeoutPromise(2000)

    await typewriter("It is a look of concern, but also one of relief.\n", 50)
    await setTimeoutPromise(2000)
    await typewriter(`"Hello their, your finally awake" he says\n`, 50)
    await setTimeoutPromise(2000)
    await typewriter(`"You gave me quite the fright"\n`, 50)
    await setTimeoutPromise(2000)
    await typewriter(`You have a mild headache, and notice a shattered sword next to you. At this point it all starts coming back.\n`, 50)
    await setTimeoutPromise(2000)
    await typewriter(`"Wait, were you the demon" You say.\n`, 50)
    await setTimeoutPromise(2000)
    await typewriter(`He starts laughing hysterically, and finally replies "I think you have a few things mixed up"\n`, 50)
    prompt("Press any key to continue")
    clear();

    await typewriter(`After a long discursion, you and the fellow traveler decide to part ways. With a mutual respect for one another, he for the will power you showed it throwing off the demon, and you for him defeating you in your demon form."\n`, 50)
    stats.sword = stats.old_sword;
    save(5);
    return;
  }else{
    await typewriter("Wait!!! You call out.\n", 50)
    await setTimeoutPromise(2000)
    await typewriter("He looks back at you and slows down.\n", 50)
    await setTimeoutPromise(2000)
    
    await typewriter(`He says "What do you want? Are you lost?"\n`, 50)
    await setTimeoutPromise(2000)


    await typewriter(`You respond "No, I'm not lost, but I could use some guidance."\n`, 50)
    await setTimeoutPromise(2000)


    await typewriter(`He says "Well, you're in luck. I've been down this trail before. There's a shortcut up ahead,"\n`, 50)
    await setTimeoutPromise(2000)
    await typewriter(`"just be careful, it's easy to miss. Look for a large rock shaped like a bear's head."\n`, 50)
    await setTimeoutPromise(3000)
    await typewriter(`"Turn left there and you'll save yourself a day's travel. Safe journey!"\n`, 50)
    await setTimeoutPromise(3000)
    await typewriter(`You thank the man, and follow his instructions`, 50)

    stats.has_shortcut = true;
    save(5);
    return;
  }

}
async function shortcut_event(){
  if (stats.has_shortcut == true || chance(40)){ // Allow cursed players a chance
    clear();
    let like_he_said = "like the old man said";
    if (!stats.has_shortcut){
      like_he_said = ""
      if ("n"==options_prompt("You see a rock shaped like a bear's head, next to a path into the woods. Do you follow it? (y/n) ", ["y", "n"]))
        return;
    }
    stats.followed_shortcut=true;
    await typewriter("You follow the path, quickly the trail becomes thinner\n", 50)
    await setTimeoutPromise(2000)
    await typewriter("You still follow it, hoping it is quicker " + like_he_said+"\n", 50)
    await setTimeoutPromise(2000)
    await typewriter("Luckly the wagon managed to fit through\n", 50)
    await setTimeoutPromise(2000)
    if (stats.has_shortcut){
      await typewriter("Although the old man never seemed to follow after you\n", 50)
      await setTimeoutPromise(2000)
    }
    await typewriter("You continue down the path.", 50)
    await setTimeoutPromise(2000)
    await typewriter("Half an hour later you check your campus, you are not heading in the correct direction.\n", 50)
    await setTimeoutPromise(2000)
    await typewriter("But you are too far down now to turn back, so you continue down the path.\n", 50)
    await setTimeoutPromise(2000)
    await PressAnyKey();
    clear();
    console.log(BIG_3);
    await setTimeoutPromise(2000)
    clear();
    console.log(BIG_HOURS);
    await setTimeoutPromise(2000)
    clear();
    console.log(BIG_LATER)
    await setTimeoutPromise(2000)
    clear();
    await typewriter("It is starting to turn dark, you are still heading far too North. \n\nWhat should you do?", 50)
    console.log("A. Go off trail")
    console.log("B. Keep following the path")
    console.log("C. Head back from where you came.")
    let option = options_prompt(": ", ["a", "b", "c"]);
    if (option == "a"){
      clear();
      await setTimeoutPromise(2000)
      await typewriter("You drive into the woods, you can barely see a few feet in front of you.", 50)
      await setTimeoutPromise(2000)



      await typewriter("You see something approaching in the woods", 50)
      await setTimeoutPromise(1000);
      console.log(ansi_red+BIG_BEAR+ansi_reset)
      await PressAnyKey();

      
      await fight(bear_animation, 100, BEAR_FIGHT_FRAMES[27]);
       stats.artifacts.push("bear teeth")

        await typewriter("The bear dropped 1500 dollars")
        stats.balance+=1500
        await setTimeoutPromise(2000)

       save(6)
       return
    }
    else if (option == "b"){
      clear();
      await typewriter("You continue on.\n", 150)
      await setTimeoutPromise(1500)
      clear();
        console.log(BIG_HOURS);
      await setTimeoutPromise(2000)
      clear();
      console.log(BIG_LATER)
      await setTimeoutPromise(2000)
      clear();
      await typewriter("It is complexly dark now, but at least the campus is pointing the correct direction now. But you are completely lost.\n", 50)
      await setTimeoutPromise(2000)
      await typewriter("You come across a cabin. Behind it is a wall of rock. You are seeming at a dead end.\n", 50)
      await setTimeoutPromise(2000)
      await typewriter("Behind you, you hear a branch break. \nYou turn\nIt is the old man with a gun\n", 50)
      await setTimeoutPromise(2000)
      if (stats.has_shortcut)
        await typewriter("He says \"You decided to take my advice, thanks, now I can do this in a secluded location\"", 50)
      else
        await typewriter("He says  \"What are you doing on my secret trail?\"", 50)
      await setTimeoutPromise(2000)
      await typewriter("He similes, a cruel, menacing smile.", 50)
      await typewriter("He says \"No matter, you are far enough from town anyways\"", 50)
    }
    else if (option == "c"){
      clear();
      await typewriter("You start to head back, you have lost soo much time, but you don't want to become fully lost.\n", 50)
      await setTimeoutPromise(8000)
      clear();  
      console.log(BIG_2)
      await setTimeoutPromise(2000)
      clear();
      console.log(BIG_HOURS);
      await setTimeoutPromise(2000)
      clear();
      console.log(BIG_LATER)
      await setTimeoutPromise(2000)
      clear();
      await typewriter("You are close to getting back on the main path, but you see something ahead of you.", 50)
      await setTimeoutPromise(2000)
      await typewriter("It is the old man from earlier. With a gun.", 50)
      await setTimeoutPromise(2000)
      if (stats.has_shortcut)
        await typewriter("He says\"So, you decided not to trust my shortcut after all\"", 50)
      else
        await typewriter("He says \"What are you doing on my secret trail?\"", 50)
      await setTimeoutPromise(2000)
      await typewriter("He similes, a cruel, menacing smile.", 50)
      await typewriter("He says \"No matter, you are far enough from town anyways\"", 50)
    }
    await PressAnyKey();
    clear();
    stats.health = 100; 
    await fight(man_animation, 500, MAN_HURT_FRAMES[40], false, 40);
    stats.has_killed=true
    await typewriter("But at what cost. You have killed a man, sure it was self defense, but it will still haunt you.", 50)
    await typewriter("He dropped 5000 dollars", 50)
    stats.balance+=5000

    await setTimeoutPromise(10000);
    stats.going_to_hell =0; // Self defence so no hell points yet
    if ('y' == options_prompt("Do you ransack his cabin? (y/n) ", ["y", "n"])){
      await typewriter("You walk in and go through his stuff.", 50)
      await setTimeoutPromise(4000);
      await typewriter("You find 15 First Aid Kits. And 10,000 dollars, he won't need it now.", 50)
      stats.health=100
      stats.balance+=10000
      stats.first_aid_kits+=15
      stats.going_to_hell +=1; // Looting though
    }


    if (option == "b"){
      await PressAnyKey();

      clear();
      await typewriter("You have defeated your enemy. But are still in the middle of nowhere.\n", 50)

      await typewriter("You look around, the cabin seems to be completely surrounded by rock. Although there seems to be a caved in mineshaft.\nDirectly in front of the cabin\n", 50)

      await typewriter("Do you attempt to enter with your "+ name_of_shovel(stats.shovel)+"?", 50)

      if ("y" == options_prompt("(y/n) ", ["y", "n"])){

        while (true){
          clear();
          await blue_cyan_backdrop(500);
          clear();
          console.log(BIG_SWING);
          await setTimeoutPromise(1000);
          if (chance(75)){
            continue;
          }else{
            clear();
            console.log(BIG_CRACK);
            break;
          }
        }
        clear();
        if (chance(Math.max(5, 45 - (stats.shovel*10)))){ // Never less than 5% chance, but bad shovels can beak

          await typewriter("Your "+name_of_shovel(stats.shovel)+" breaks.\n", 50)
          stats.shovel = 0
          await setTimeoutPromise(5000);
          await typewriter("You have no option but to turn back.\n", 50)
        }else{
          await typewriter("All the debris falls back into the cave\n", 50)
          await typewriter("You feel that your shovel has been sharpened by this\n", 50)
          let new_s = Math.min(7, stats.shovel+1); // No more than World Clearer
          await typewriter("You no longer have a "+name_of_shovel(stats.shovel)+" but a "+name_of_shovel(new_s), 50)
          stats.shovel = new_s;
          await PressAnyKey();
          clear();
          await typewriter("You enter the cave.\n", 50)
          await setTimeoutPromise(2000);
          await typewriter("The ground is littered with stuff.\n", 50)
          await setTimeoutPromise(2000);
          await typewriter("You pick up 344 dollars.\n", 50)
          stats.balance+=344
          await setTimeoutPromise(2000);
          await typewriter("Then a few yards in you see something.\n", 50)
          await setTimeoutPromise(2000);

          await typewriter("It is a....\n", 250)
          await setTimeoutPromise(2000);
          await typewriter("A, Red Amulet", 200);

          await typewriter("You pick it up, it has to be valuable.\n", 50)

          stats.artifacts.push("Red Amulet")

          await typewriter("You continue through the cave, but you do not find anything else interesting.\n", 50)

          await typewriter("You do find 500 more dollars.\n", 50)
          stats.balance+=500

          await typewriter("But after a few hour of walking, you see something, .\n", 50)
          await setTimeoutPromise(5000)
          console.log(ansi_yellow+BIG_SUNLIGHT+ansi_reset)
          save(6)
          return

        }

      }else{
        await typewriter("You turn back, and walk back the way you came on the trail.\n", 75)
      }



    }

    await typewriter("It takes you a half a day to find your way to town.\n", 75)
    if (stats.has_shortcut)
      await typewriter("The old man was just trying to kill you.\n", 75)
    else
      await typewriter("This shortcut was just a bad idea.\n", 75)

    save(6)

  }
  
}
async function secound_town(){
  clear();
  await typewriter("It was been a long journey, but you have finally made it to Frontier Town, the half way point for aspiring Californians.\n", 50)
  await setTimeoutPromise(2000)
  if (stats.followed_shortcut)
    await typewriter("You may have missed a few towns with your detour\n", 50)
  else
    await typewriter("You may have gotten a little lost after the river messed you up, and missed a few towns\n", 50)
  await setTimeoutPromise(2000)
  await typewriter("But you are finally here.\n\n", 50)
  while (true){
    await typewriter("What to do next.", 50)
    console.log("A. Buy some needed supplies from the local shop")
    console.log("B. Check out the local tavern")
    console.log("C. Talk to the towns people")
    let options = ["a", "b", "c", 'l']
    if (stats.going_to_hell){
      options.push("d")
      console.log("D. Repent your sins at the local church")
    }
    console.log("L. Leave and continue on to California")
    let action = options_prompt(": ", options)
    clear();
    if (action == "a"){
      await shop_window();
      clear();
    } else if (action == "d"){
      await typewriter('You enter the local church, you have never been much of the religious type, but now is the time to see if it can help.', 50)
      await setTimeoutPromise(3000)
      await typewriter("The local priest approaches and asks you to confess your sins", 50)
      if ('y'==options_prompt("Do you confess your sin (y/n) ", ["y", "n"])){
        await typewriter("You start to explain to the priest all you have done wrong, he sits and listens.\n", 50)
        await setTimeoutPromise(5000)
        await typewriter(`The priest, after hearing you out responds "My son, this is the Catholic Church. `, 25)
        await typewriter(`All can be forgiven, for he is a merciful god. Now, let's talk about Indulgences. They're a bit like heavenly coupons, `, 20)
        await typewriter(`you see, A miracle from heaven, for the small price of $25,000 you can get one soul point removed. `,15)
        await typewriter(`And judging by what you have told me you currently have `+(stats.going_to_hell*1)+` that need forgiven. For the small price of $`+ (stats.going_to_hell*25_000), 15)
        await typewriter(`you can go to heaven, doesn't that sound like nothing in comparison to Eternal Damnation?!`, 15)
        await typewriter(`Quite the bargain, don't you think? Here at the Catholic Church, we have a motto 'God accepts credit cards'"\n\n`, 10)

        await typewriter(`"How many soul points can I put you down for? 2, 6, 23, or perhaps you're aiming for the spiritual high score!`, 10)
        await typewriter(`I get paid, I mean 'Jesus', gets paid by the referral you know.`, 10)
        if ('y'==options_prompt("He raises an eyebrow expectantly, awaiting your decision. Do you take the 'priest's' up on his offer? (y/n) ", ["y", "n"])){
          while (1){
            let n= number_prompt("How many Indulgences do you with to purchase (0 to exit) (You currently have $"+stats.balance+") ")
            if (n == 0)
              break;
            if (n>(stats.going_to_hell*1))
              await typewriter(ansi_red+"Too many, your max is "+(stats.going_to_hell*1)+ansi_reset, 50)
            else if (n*25000 > stats.balance)
              await typewriter(ansi_red+"You can not afford this."+ansi_reset, 50)
            else{
              stats.going_to_hell-=n;
              stats.balance-=n*25000
              let remaining = stats.going_to_hell;
              if (stats.going_to_hell == 0){
                stats.going_to_hell = undefined;
                stats.sin_but_forgiven = true;
              }
              console.log("\n\n")
              await typewriter("The priest, talking faster than ever \"Thank you my son, your remaining soul", 7)
              await typewriter("points is "+remaining+" and your generous donation will help us buy soo ", 7)
              await typewriter("much coke, I mean, It will help us feed the poor, Your donation is ", 7)
              await typewriter("helping more people than you could ever know.\"\n\n", 7)

              await typewriter("Before the priest could convince you to buy more things, you managed to get out of the church.", 60)
              if (stats.going_to_hell == undefined)
                await typewriter("You know he is a con artist, but you still feel better getting all that off your shoulders.", 60)
              save(6)
              break;
            }

          }
        }else{
          await typewriter("You slap the priest and walk out, that was not the wrong move.", 50)
          stats.going_to_hell = stats.going_to_hell+1;
          await setTimeoutPromise(3000)
          await typewriter("You walk out of the church.", 50)
          await setTimeoutPromise(3000)
        }
      }else{
        await typewriter("You slap the priest and walk out, that may have been the wrong move.", 50)
        stats.going_to_hell = stats.going_to_hell+1;
        await setTimeoutPromise(3000)
        await typewriter("You walk out of the church.", 50)
        await setTimeoutPromise(3000)
      }
    
    }
    else if (action == "b"){
      await typewriter("You walk over to the local tavern, but before you enter you notice something.\n", 50)
      await setTimeoutPromise(2000)
      await typewriter("It is a wanted poster, a wanted poster of the traveler from earlier.\n", 50)
      await setTimeoutPromise(2000)

      if (!stats.got_body && stats.good_person != true){
        await typewriter("According to the poster, this man is suspected for a string of serial murders.\n\"Dead or alive\"\n\"50,000\"", 50);

        if ('y'==options_prompt("Do you wish to try to claim this reward? (y/n) ", ['y', 'n'])){
          if (stats.has_killed){
            await typewriter("This job should be as easy as bringing back the body, however that cabin is over half a day away.\n", 50)
            await typewriter("However, as that is the only way, you must make the journey, and waste a day round trip", 50)
            await typewriter("........", 1500)
            await blue_cyan_backdrop(5000)
            clear();
            console.log(BIG_DAY)
            await setTimeoutPromise(3000)
            await typewriter("You have done it, you have retrieved the body of your murder victim\n", 50)
            await typewriter("He is lying in your "+ name_of_wagon(stats.wagon) +" with a cloth covering the body\n", 50)
            await typewriter("You bring the body to the local sherif, who comments on how suspects are typically brought in alive.\n", 50)
            await typewriter("You feel even worse about yourself, and he pays you the 50,000 dollars in blood money\n", 50)
            stats.balance+=50000
            stats.going_to_hell+=1;
            stats.got_body = true;
            save(6)
          }
          else{
            await typewriter("This job should be quite hard as you last saw that man over half a day away.\n", 50)
            await typewriter("However, as that is the only way, you must make the journey, and waste a day round trip", 50)
            await typewriter("........", 1500)
            await blue_cyan_backdrop(5000)
            clear();
            console.log(BIG_DAY)
            await setTimeoutPromise(3000)
            await typewriter("It took longer than you would have liked, but you managed to track him down.\n", 50)

            await typewriter("He is hiding out in a cabin, and that cabin is off the trail you met him at earlier. \n\nThere is a branching trail next to large rock shaped like a bear's head\n", 50)

            await typewriter("You are hiding out in the bushes watching him through the window.\n", 50)

            if ('n'==options_prompt("Do you still with to try to try to claim this reward? (y/n) ", ['y', 'n'])){
              await typewriter("You just can't do this, you are not a bad person. So you head back. Sure you wasted some time, but not your soul.\n", 50)
              stats.good_person = true;
              clear();
            }else{
              clear();
              await typewriter("\nYour storm in, and manage to surprise him. You get in the first hit, he was unarmed. You are going to hell.\n", 50)
              await setTimeoutPromise(3000)
              save(6)

              stats.health = 100; 
              await fight(man_animation, 90, MAN_HURT_FRAMES[40], false, 40);
              stats.has_killed=true
              await typewriter("He dropped 5000 dollars", 50)
              stats.balance+=5000

              await setTimeoutPromise(10000);
              if ('y' == options_prompt("Do you ransack his cabin? (y/n) ", ["y", "n"])){
                await typewriter("You walk in and go through his stuff.", 50)
                await setTimeoutPromise(4000);
                await typewriter("You find 15 First Aid Kits. And 10,000 dollars, he won't need it now.", 50)
                stats.health=100
                stats.balance+=10000
                stats.first_aid_kits+=15
              }
              await setTimeoutPromise(15000);
              await blue_cyan_backdrop(5000)
              clear();
              await typewriter("You have done it, you have brought back the body of your murder victim\n", 50)
              await typewriter("He is lying in your "+ name_of_wagon(stats.wagon) +" with a cloth covering the body\n", 50)
              await typewriter("You bring the body to the local sherif, who comments on how suspects are typically brought in alive.\n", 50)
              await typewriter("You feel even worse about yourself, and he pays you the 50,000 dollars in blood money\n", 50)
              stats.balance+=50000

              

              stats.going_to_hell+=1;
              stats.got_body = true;
              save(6)
              clear();
            }
          }
        }
       }else{
        await typewriter("You enter the local tavern, trying to ignore the wanted posters. Not trying those again", 50);
        await typewriter("You see a group of locals are gambling, do you wish to join them. (knowing you will likely lose)", 50);
        if ("y"==options_prompt("(y/n): ", ["y", "n"])){
          while (true){
            clear();
            console.log(ansi_yellow+"Warning: each time you play you will lose soul points!" + ansi_reset)
            console.log()
            console.log("You have 3 games available. (current balance: " + stats.balance + ")")
            console.log("A. Coin toss")
            console.log("B. Roulette")
            console.log("C. Rock Paper Scissors")
            console.log("L. Leave now")
            let game = options_prompt(": ", ["a", "b", "c", "l"])
            if (game == 'l')
              break;
            else if (game == "a"){
              let n = number_prompt("How much do you wish to bet? ")
              if (n<= stats.balance){
                let p_result = options_prompt("What do you think it will land on? (heads, tails, side) ", ["heads", "tails", "side"])
                if (stats.going_to_hell == undefined)
                  stats.going_to_hell = 0
                stats.going_to_hell += Math.random*0.1; // At most 0.1 soul points
                if (chance(10)){ // 10% chance it lands on its side
                  await typewriter("It landed on it's side",250)
                  if (p_result == "side")
                    stats.balance += n*5
                  else
                    stats.balance -= n
                }else if (chance(45)){ // 45% heads
                  await typewriter("It landed on heads",250)
                  if (p_result == "heads")
                    stats.balance += n
                  else
                    stats.balance -= n
                }else{ // Otherwise tails
                  await typewriter("It landed on tails",250)
                  if (p_result == "tails")
                    stats.balance += n
                  else
                    stats.balance -= n
                }
                await setTimeoutPromise(3000)
                save(6)
              }else{await typewriter(ansi_red+"Invalid bet amount"+ansi_reset, 50); await setTimeoutPromise(3000)}
            } 
            else if (game == "b"){
              let n = number_prompt("How much do you wish to bet? ")
              if (n >  stats.balance){
                await typewriter(ansi_red+"Invalid bet amount" + ansi_reset, 50);
                await setTimeoutPromise(3000)
                continue;
              }
              let p_result = options_prompt("What is your bet (0-36 or red, black, even, odd)  ", ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', 'red', 'black', "even", 'odd']);

                if (stats.going_to_hell == undefined)
                  stats.going_to_hell = 0
                stats.going_to_hell += Math.random*0.35; // At most 0.35 soul points


              let result = Math.floor(Math.random() * 37);
              let number = result*1;
                let color = "";
                if (
                  (number >= 1 && number <= 10) ||
                  (number >= 19 && number <= 28)
                  )
                  color= number % 2 == 0 ? "black" : "red";
                else if (
                  (number >= 11 && number <= 18) ||
                  (number >= 29 && number <= 36)
                  ) 
                  color= number % 2 == 0 ? "red" : "black";
              typewriter(result + " " + color, 250);
              if (result == 0 && p_result != 0){
                stats.balance-=n
              }else if (p_result==result)
                stats.balance+=n*35;
              else if (color==p_result)
                stats.balance+=n;
              else if (p_result == "even" && number%2==0)
                stats.balance+=n
              else if (p_result == "odd" && number%2==1)
                stats.balance+=n
              else
                stats.balance-=n
              save(6)
              await setTimeoutPromise(3000)

            }
            else if (game == "c"){
              let n = number_prompt("How much do you wish to bet? ")
              if (n >  stats.balance){
                await typewriter(ansi_red+"Invalid bet amount" + ansi_reset, 50);
                await setTimeoutPromise(3000)
                continue;
              }
                if (stats.going_to_hell == undefined)
                  stats.going_to_hell = 0
                stats.going_to_hell += Math.random*0.075; // At most 0.075 soul points 
              let p_result = options_prompt("What is your guess (rock/paper/scissors): ", ["rock", "paper", "scissors"])

              let result = ["rock", "paper", "scissors"][Math.floor(Math.random()*3)];

              await typewriter("The opponent got: "+ result, 200);

              if (p_result == "rock" && result=="scissors"){
                stats.balance+=n*2;
              }else if (p_result == result){}
              else if (p_result == "paper" && result == "rock"){
                stats.balance+=n*2;
              }else if (p_result == "scissors" && result == "paper"){
                stats.balance+=n*2;
              }else{
                stats.balance-=n;
              }

              save(6)
              await setTimeoutPromise(4000)

            }
          }
        }else{
          await typewriter("You walk out of the tavern, not wanting to lose all your money gambling", 50);
        }
       }


    }
    else if (action == "c"){
      await typewriter("You walk up to a random towns person and ask about the town", 50);
      await setTimeoutPromise(3000)
      let not_yet = true;
      while (not_yet){
        not_yet = false;
        if (chance(10))
          await typewriter(`"The priest is scamming people out of their money with indulgences, no other priest believes on those!"`, 50);
        else if (chance(10))
          await typewriter(`"I heard there is a dangerous killer going around!"`, 50);
        else if (chance(10))
          await typewriter(`"Some say the shop keeper sets his prices arbitrarily!"`, 50);
        else if (chance(10))
          await typewriter(`"Did you hear, the sheriff is issuing false bounties on mental patients and releasing them into the woods?!"`, 50);
        else if (chance(10)){
          await typewriter(`"Hey, some moron took the demon sword out of its containment chamber in the woods. We kept it in the middle of nowhere to protect people!"`, 50);
        }else if (chance(10)){
          await typewriter(`"The road to California is dangerous, makes you wonder why nobody takes the train?"`, 50);
        }else if (chance(10)){
          await typewriter(`"Did you hear, a bear is attacking the mayor, think you can help?!"`, 50) //Effectively infinite money
          if ("y" == options_prompt("(y/n) ", ['y', 'n'])){
              await fight(bear_animation, 100, BEAR_FIGHT_FRAMES[27]);
              await typewriter("The bear dropped 1500 dollars", 50)
              stats.balance+=1500
              await setTimeoutPromise(2000)
          }else {await typewriter("Thanks anyways...", 50)}
        }else if (chance(10)){
          await typewriter(`"Did you hear, a snake is attacking the mayor, think you can help?!"`, 50)
          if ("y" == options_prompt("(y/n) ", ['y', 'n'])){
              await fight(snake_animation, 40, SNAKE_FIGHT_FRAMES[21]);
              await typewriter("The snake dropped 500 dollars", 50)
              stats.balance+=500

              await setTimeoutPromise(2000)
          }else {await typewriter("Thanks anyways...", 50)}
        }else if (chance(10)){
          await typewriter(`"Did you hear, a demon is attacking the mayor, think you can help?!"`, 50)
          if ("y" == options_prompt("(y/n) ", ['y', 'n'])){
              await fight(demon_animation, 5000, DEMON_FIGHT_FRAMES[40])
              
              await typewriter("The demon dropped 5000 dollars", 50)
             stats.balance+=5000

              await setTimeoutPromise(2000)
          }else {await typewriter("Thanks anyways...", 50)}
        }else if (chance(10)){
          await typewriter(`"Did you hear, a guy with a gun is attacking the mayor, think you can help?"`, 50)
          if ("y" == options_prompt("(y/n) ", ['y', 'n'])){
              await fight(man_animation, 90, MAN_HURT_FRAMES[40], false, 40);
              await typewriter("The guy dropped 5000 dollars", 50)
             stats.balance+=5000
             stats.going_to_hell+=0.1 // They asked for it

              await setTimeoutPromise(2000)
          }else {await typewriter("Thanks anyways...", 50)}
        }else{not_yet=true;}
      }
      await setTimeoutPromise(3000)


    }
    else if (action == "l"){
      save(7)
      return;
    }



  
    }

}
async function rocks_event(){
  clear();
  await typewriter("You walk out of Frontier Town.\n", 50)
  await setTimeoutPromise(3000)
  await typewriter("It was fun, but not your final destination.\n", 50)
  await setTimeoutPromise(3000)
  await typewriter("You start riding, on your "+ name_of_wagon(stats.wagon)+" in the direction of California.\n", 50)
  await setTimeoutPromise(5000)
  clear();
  console.log(BIG_HOURS)
  await setTimeoutPromise(2000)
  clear();
  console.log(BIG_LATER)
  await setTimeoutPromise(2000)
  clear();
  await typewriter("You are riding through a canyon, 200 feet clifts on both sides.\n", 150)

  await typewriter("You must be careful, an Avalanche Warning was clearly marked at the entrance.\n", 150)

  await typewriter("But this is the only path.\n", 150)
  await setTimeoutPromise(5000)
  clear();
  console.log(ansi_red+BIG_CRACK+ansi_reset)
  await setTimeoutPromise(1000)

  await typewriter("The wheel! It snapped!.\n", 50)
  await setTimeoutPromise(2000)
  await typewriter("You hear a low rumbling in the distance.\n", 50)
  await setTimeoutPromise(2000)
  await typewriter("You do not have much time, you must continue on foot. And hurry!\n", 50)
  await setTimeoutPromise(2000)
  await typewriter("You continue on foot, running for your life.\n", 50)
  await setTimeoutPromise(2000)
  await typewriter("The wagon was expensive, but not no more so than your life.\n", 50)
  await setTimeoutPromise(2000)
  await typewriter("Rocks are falling down, the you must dodge them.\n", 50)


  await PressAnyKey();
  clear();
  while (!await dondge_rock(true, 20, 10, 3, 5, 25, 1, 60)){
    clear();
    console.log(ansi_red+BIG_DEAD+ansi_reset)
    await setTimeoutPromise(1000)
  }
  await PressAnyKey();
  clear();
  while (!await dondge_rock(true, 40, 24, 8, 9, 25, 2, 64)){
    clear();
    console.log(ansi_red+BIG_DEAD+ansi_reset)
    await setTimeoutPromise(1000)
  }

  await PressAnyKey();
  clear();
  while (!await dondge_rock(false, 20, 10, 3, 9, 25, 3, 95)){
    clear();
    console.log(ansi_red+BIG_DEAD+ansi_reset)
    await setTimeoutPromise(1000)
  }
  clear();
  await typewriter("You escape from the canyon!\n", 50)
  await typewriter("But your wagon is destroyed\n", 50)
  await typewriter("Your only hope is to make a new one\n", 50)
  stats.wagon = 0;
  save(8);
}
async function new_wagon_event(){
  clear();
  await typewriter("You exit the canyon. But you have lost your most valuable possession.\n", 50);
  await typewriter("You are in a dense forest.\n", 50);
  await typewriter("Your only option now is to forage.\n", 50);
  await setTimeoutPromise(2000)
  await typewriter("You walk around thinking of ideas.\n", 50);
  await setTimeoutPromise(2000)
  await typewriter("But then you see something, a fox.\n", 50);
  prompt("Press any key")
  clear();
  console.log(FOX)
  await setTimeoutPromise(10000)
  prompt("Press any key")
  clear();
  await typewriter("The fox looks up at you with a curious look. You can't help but feel a connection towards it.\n", 50)
  await typewriter("The fox stands up and starts walking. He looks back at you, and you feel he wants you to follow.\n", 50)
  if ("y"==options_prompt("Do you follow? (y/n) ", ["y", "n"])){
    clear();
    await typewriter("You follow the fox. He seems to know where he is going. You keep walking deeper into the woods.\n", 50)
    await typewriter("You see something. It is some sort of statue\n", 50)
    await setTimeoutPromise(5000)
    clear();
    console.log(STATUE)
    await setTimeoutPromise(4000)
    stats.has_followed_fox=true;
    if (stats.temple_rooms_states[2]==false)
      prompt("It is the same statue from the temple, but you are still unsure what it means (enter to continue)")
    else
      prompt("It is cool, but you are unsure what it means (enter to continue)")
    clear();
    await typewriter("\nBut the fox keeps going, and looks back.\n", 50)
    await setTimeoutPromise(2000)
    await typewriter("You continue to follow.\n", 50)
    await setTimeoutPromise(2000)
    await typewriter("But then, he stops.\n")
    await setTimeoutPromise(2000)
    await typewriter("There is a pile of wood!\n")
    await setTimeoutPromise(2000)
    await typewriter("You are so excited you lose track of the fox.\n")
    await setTimeoutPromise(2000)
    await typewriter("By the time you realize, he is gone. You are forever indebted to the fox\n")
    stats.wagon = 5;
  }else{
    clear();
    await typewriter("You decide not to follow the fox, it is just a fox after all.\n", 50)
    await setTimeoutPromise(2000)
    await typewriter("If you want a new wagon, you must do this yourself.\n", 50)
    await setTimeoutPromise(2000)
    await typewriter("You do not have an axe. But your trusty "+ name_of_shovel(stats.shovel) +" will do", 50)
    stats.wagon = Math.min(stats.shovel+1, 7); // Better the shovel, better the wagon
  }
  await PressAnyKey();
  clear();
  console.log(BIG_HOURS)
  await setTimeoutPromise(2000)
  clear();
  console.log(BIG_LATER)
  await setTimeoutPromise(2000)
  clear();
  await typewriter("It was hard, but you finally manage to build a new wagon.\n", 50)
  await typewriter("And a good quality wagon if you don't say so yourself. You make the "+name_of_wagon(stats.wagon) , 50)
  save(9)
}

async function weather_event(){
  clear();
  await typewriter("You build yourself a new wagon, and now it is time to set out.", 60)
  await setTimeoutPromise(3000)
  clear()
  console.log(BIG_HOURS)
  await setTimeoutPromise(2000)
  clear();
  console.log(BIG_LATER)
  await setTimeoutPromise(2000)
  clear();

  await typewriter("What is that? You hear a rumbling in the distance.\n", 60)
  await typewriter("It sounds, like a train?.\n", 100)
  await typewriter("But that could not be, you are in the middle of nowhere.\n", 50)
  await typewriter(".......", 350)
  clear();
  console.log(ansi_red+BIG_TORNADO+ansi_reset)
  await setTimeoutPromise(2000)
  clear();

  await typewriter("You put your new " +name_of_wagon(stats.wagon) +" at full speed. It is behind you.\n", 50)
  await setTimeoutPromise(1000)
  await typewriter("Suddenly you feel a jolt, it lifted you into the air briefly.\n", 50)
  await typewriter("You are in trouble now.\n", 50)
  await setTimeoutPromise(1000)
  await typewriter("The tornado has you in it's grips, it is mere yards away.", 50)
  await typewriter(".........\n", 350)
  clear();
  await typewriter("It begins to lift you again. But this time it is not letting go\n", 50)
  await typewriter("It lifts you 10, 20, 50, 100 feet\n", 150)
  await typewriter("You hold on with all you can\n", 50)
  console.log("You have 2 options")
  console.log("A. Jump, and hope the tornado slows your fall")
  console.log("B. See where the tornado takes you")
  

  if ("a"==options_prompt(": ", ["a", "b"])){
    clear();
    await typewriter("You jump, it appears you were correct. The tornado has caught you.\n", 50)
    await typewriter("But now you are at to tornado's mercy. And just lost your newly acquired wagon\n", 50)
    stats.wagon = -1;
    await typewriter(".......", 250)
    clear();
    if (chance(50)){
      console.log(ansi_red+BIG_SPLAT + "\n\n" + BIG_DEAD + ansi_reset)
      await setTimeoutPromise(10000)
      console.log(ansi_yellow+"You have gotten the jumping tornado ending."+ansi_reset)
      await setTimeoutPromise(10000)
      process.exit();
    }else{
      await typewriter("You land, and you are alive. The tornado set you down. But with nothing\n", 50)
      await typewriter("In the middle of nowhere\n", 50)
      save(10)
      return
    }

  }else{
    clear();
    await typewriter("You hold on for dear life. The tornado keeps pulling you higher and higher\n")
    await typewriter(".......", 250)
    clear();
    if (chance(Math.max(50-(stats.wagon*8), 5))){
      console.log(ansi_red+BIG_SPLAT + "\n\n" + BIG_DEAD + ansi_reset)
      await setTimeoutPromise(10000)
      console.log(ansi_yellow+"You have gotten the falling tornado ending."+ansi_reset)
      await setTimeoutPromise(10000)
      process.exit();
    }else{
      await typewriter("You land, and you are alive. The wagon appeared to shield you.\n", 50)
      await typewriter("It apers not to have taken any significant damage\n", 50)
      await typewriter("You are in the middle of nowhere\n", 50)
      save(10)
      return
    }
  }
}
async function lost_event(){
  clear();
  if (chance(33)){
    console.log(ansi_red+BIG_BEAR+ansi_reset)
    await setTimeoutPromise(5000)
    await fight(bear_animation, 100, BEAR_FIGHT_FRAMES[27]);
    stats.artifacts.push("bear skull")
    await typewriter("The bear dropped 1500 dollars")
    stats.balance+=1500   
  }
  clear();
  await typewriter("You see something in the distance. You walk towards it", 50)
  await typewriter(".......", 350)
  clear();
  console.log(STATUE)
  await setTimeoutPromise(4000)
  if (stats.has_followed_fox&&stats.temple_rooms_states[2]==false)
    await typewriter("You are starting to think this might be significant\n", 100)
  else if (stats.has_followed_fox||stats.temple_rooms_states[2]==false)
    await typewriter("This is the second time you have seen it now\n", 100)
  else 
    await typewriter("It is cool, but you are unsure what it means\n", 100)

  await PressAnyKey();
  clear();

  await typewriter("You continue on. You have no idea where you are\n", 50)

  if (!stats.has_followed_fox && stats.wagon == -1)
    await typewriter("You must, once again, build a new wagon\n", 50)
  else if (stats.wagon == -1)
    await typewriter('No friendly fox to help you this time. You must build a new wagon yourself', 50)

  if (stats.wagon == -1){
    await typewriter("You do not have an axe. But your trusty "+ name_of_shovel(stats.shovel) +" will do", 50)

    await setTimeoutPromise(1000)
    stats.wagon = Math.min(stats.shovel+1, 7); // Better the shovel, better the wagon

    await setTimeoutPromise(6000)
    clear();
    console.log(BIG_HOURS)
    await setTimeoutPromise(2000)
    clear();
    console.log(BIG_LATER)
    await setTimeoutPromise(2000)
    clear();
    await typewriter("It was hard, but you finally manage to build a new wagon. Hope this pattern doesn't continue\n", 50)
    await typewriter("And a good quality wagon if you don't say so yourself. You make the "+name_of_wagon(stats.wagon) +"\n", 50)
  }
  
  await typewriter("But before you leave, you notice something. A crown, a crimson, "+ansi_red+"blood"+ansi_reset+" colored, crown.\n", 50)

  await typewriter("It has a strange feeling. Do you take it?")
  if ("y"==options_prompt("(y/n) ", ["y", "n"])){
    stats.crown_of_chaos = true
    await typewriter("You put on the crown. You can feel it's power surge through you.\n", 50)
    await typewriter("But it also fills you with a feeling of deep dread.\n", 50)
    await setTimeoutPromise(3000)
  }else{
    stats.crown_of_chaos = false
    await typewriter("You walk away, feeling you dodged a bullet.\n", 50)
  }

  save(11)}


async function strange_animals(){
  clear();
  await typewriter("You continue on, you are unsure where you are, but if you keep heading west you should arrive\n", 50)

  await typewriter('You hear a rustling in the forrest, you stop your wagon to see what it is.\n', 50)
  await setTimeoutPromise(3000)

  console.log(ansi_red+BIG_BEAR+ansi_reset)
  
  await setTimeoutPromise(5000)

  if (stats.crown_of_chaos){
    await typewriter("The bear looks at you, it freezes, and walks away.\n", 50)
    await typewriter("You wounder what that was about.\n", 50)
  }
  else{
    await fight(bear_animation, 100, BEAR_FIGHT_FRAMES[27]);
    await typewriter("The bear dropped 1500 dollars\n", 50)
    stats.balance+=1500
    await setTimeoutPromise(2000)
    clear();
  }
  await typewriter("You continue on, when suddenly...\n", 50);
  await setTimeoutPromise(3000)
  console.log(ansi_red+BIG_SNAKE+ansi_reset)

  await setTimeoutPromise(5000)

  if (stats.crown_of_chaos){
    await typewriter("The snake looks at you, it freezes, and walks away.\n", 50)
    await typewriter("You are starting to become confused.\n", 50)
    await setTimeoutPromise(10000)
  }
  else{
    await fight(snake_animation, 40, SNAKE_FIGHT_FRAMES[21]);
    await typewriter("The snake dropped 500 dollars. There are a lot of enemies today", 50)
    stats.balance+=500

    save(12)
    clear();
  }
}
async function river_travelers(){
  clear();
  await typewriter("You are traveling next to the river, with hopes that you might find civilization\n", 50)
  await setTimeoutPromise(2000)
  await typewriter("You start to hear something. It is the sound of splashing, and of talking\n", 50)
  await setTimeoutPromise(2000)
  await typewriter("It must be other people!\n", 50)
  await typewriter("They are ahead of you\n", 50)
  await typewriter("They don't look like indians\n", 50)
  await typewriter("But they also don't like civilized\n", 50)
  await typewriter('.......', 350)
  await typewriter("Do you hide in the woods and let them pass by, or make your presence known?", 50)
  if ("y"==options_prompt("(y/n) ", ["y", "n"])){
    clear();
    await typewriter("You hide in the woods, they do not look like the friendly type anyways\n", 50)
    await setTimeoutPromise(1000)
    await typewriter("You can make out some of their conversation\n", 50)
    await setTimeoutPromise(1000)
    await typewriter('"Are you sure their is a Pillar Of Yash around here?" One says through a heavy accent\n', 50)
    await setTimeoutPromise(1000)
    await typewriter('"Of course, this is the very forest mentioned in the ancient texts," one of them replies, excitement evident in their voice\n', 50)
    await setTimeoutPromise(1000)
    await typewriter(`"We must get there soon, the sword from the temple of Tish was missing. We can't allow the Crown Of Chaos to be lost as well" He goes on, urgency lacing his words.\n`, 50)

    if (stats.crown_of_chaos) // If the charictor has picked up the crown
      await typewriter(`The one who is explaining this has a similar crown to your own, however it seems rough, almost as if it were a replica.\n`, 50)
    else
      await typewriter("Now you are both relived and terrified you left the crown behind \n", 50)

    await typewriter(`"The four pillars that have survived to the present time are our sacred birthright. We must not allow another artifact to be lost"\n`, 50)

    await typewriter(`The over one replies "And if anyone has already took it?"\n`, 50)

    await typewriter(`"We prepare for war"\n`, 50)

    await typewriter(`Their boat is now out of ear shot, you come out of the woods and head in the opposite direction.\n`, 50)
    await typewriter(`They must be coming from California, or at least the west\n`, 50)
  }else{
    await typewriter("You walk into the sunlight, they look at you, you look at them.\n", 60)
    await setTimeoutPromise(1000)
    if (stats.crown_of_chaos){
      await typewriter("Their eyes open in realization\n", 50)
      await setTimeoutPromise(1000)
      await typewriter(`The taller one has a similar crown to your own, however it seems rough, almost as if it were a replica.\n`, 50)
      await setTimeoutPromise(1000)
      await typewriter("They look at your crown, and look more shocked than you have ever seen anyone look before.\n", 50)
      await setTimeoutPromise(1000)
      await typewriter("Then they do something unexpected.\n", 50)
      await setTimeoutPromise(1000)
      await typewriter("They bow towards you, the deepest bow you have ever seen. Their faces are touching the floor of their boat\n", 50)
      await setTimeoutPromise(1000)
      await typewriter("After about a minute of silence, they look up, their faces more pail then you have seen before", 50)
      await setTimeoutPromise(1000)
      await typewriter("They turn their boat around, and sail back from the direction they came", 50)
      stats.they_saw=true

    }else{
      await typewriter("They stop taking, and continue on east, the opposite direction as you\n", 50)
      stats.they_saw=true
    }
  }



  save(13);
}




async function the_tower() {
  clear();
  



  console.log(BIG_HOURS)
  await setTimeoutPromise(2000)
  clear();
  console.log(BIG_LATER)
  await setTimeoutPromise(2000)
  clear();

  await typewriter("You are still walking beside a river\n", 50)
  await setTimeoutPromise(2000)
  await typewriter("You begin to see something in the distance.\n", 50)
  await setTimeoutPromise(2000)
  await typewriter("It is a tower.\n", 350)

  clear();

  console.log(TOWER)
  await setTimeoutPromise(2000)
  if (options_prompt("Do you enter (y/n)", ["y", "n"]) == 'y'){
    clear();
    await typewriter("You enter the tower\n", 50)
    await typewriter("Inside you see a man. He is wearing a long black robe and a crimson crown.\n", 50)
    if (stats.crown_of_chaos)
      await typewriter(`"I see you have something I want" He say with a menacing smile`)
    if (stats.crown_of_chaos && stats.they_saw)
      await typewriter(`"My men have told me about you"`)
    if (!stats.crown_of_chaos){
      await typewriter('"Who the hell are you, and what are you doing in my base of operations?"')
      await typewriter(`"No matter, I will make you leave"`)
    }

    
    await PressAnyKey();

    let lines = WIZZARD_FIGHT_FRAMES[WIZZARD_FIGHT_FRAMES.length-1].split("\n");
    let start=0;
    if (!stats.crown_of_chaos)
    start = 4;
    await fight(WIZZARD_ANIMATION, 300, lines.slice(start, lines.length).join("\n"), false, 30)
    clear();

    await typewriter(`"You have defeated me"`)
    await typewriter(`"It is now up to you to lead the order of Tkyshi"`)
    if (!stats.crown_of_chaos){
      await typewriter(`"Take this" The man hands you his crown`)
    }

    if ("y"==options_prompt("Do you stop your adventure and lead a cult? (y/n) ", ["y", "n"])){
      clear();
      console.log(ansi_red+BIG_CONFUSION+ansi_reset)
      await setTimeoutPromise(15000)
      console.log(ansi_yellow+"You have gotten the cult leader ending"+ansi_reset)
      process.exit()
    }
    await typewriter(`You kick the old man`)    



    await typewriter(`And you take his 15000 dollars along with the crown`)
    stats.balance+=15000
    stats.artifacts.push("Occult crown")


    if ("y"==options_prompt("Do explore the tower? (y/n) ", ["y", "n"])){
      clear();
      await typewriter(`You climb the tower to see what it contains\n`)

      await typewriter(`You see a snake, it looks at you, you look at it. And it follows you.\n\nYou are now it's master.`)

      let name = length_prompt("What do you name your snake: ", 2)
      stats.snake_name = name
      stats.has_snake = true

      clear();
      await typewriter("You continue on, in the next floor you find a circle. It has a large pentagram.\n")

      if ('y'==options_prompt("Do you ask a cult follower about it? (y/n) ", ['y', 'n'])){
        await typewriter(`"S, Sir, that is the circle the crown bearer can summon the beast"\n`)

        await typewriter("You walk away as soon as you hear that.")

      }

      await typewriter("You go the the next floor. Then you see something")

      await typewriter("............", 400)

      clear();

      console.log(STATUE)

      await PressAnyKey();

      await typewriter("At this point, you decide to leave")





    }
    await typewriter(`The cult followers watch in amazement while you walk out`)
    save(14)



  }else{
    clear();
    await typewriter("You walk on past, ignoring all potential adventurer inside.", 50)
    await setTimeoutPromise(2000)
  }
}

async function california(){
  await typewriter(BIG_WELCOME)
  await typewriter("Congrats, you have made it to the end of the game.")
  await typewriter("The artifacts you have collected are\n + " + stats.artifacts.join("\n + "))
}


// -1 means not saved before, overwise last saved level
async function game(save_stage) {
  if (save_stage == -1)  save(0);
  if (0 >= save_stage) await first_encounter(); // Check if the snake is finished
  if (1 >= save_stage) {await wilderness_1_event1(); save(2)}
  if (2 >= save_stage) await wilderness_1_bear_event();
  if (3 >= save_stage) await temple_event();
  if (4 >= save_stage) await traveler_event();
  if (5 >= save_stage) await shortcut_event();
  if (6 >= save_stage) await secound_town();
  if (7 >= save_stage) await rocks_event();
  if (8 >= save_stage) await new_wagon_event();
  if (9 >= save_stage) await weather_event();
  if (10 >= save_stage) await lost_event();
  if (11 >= save_stage) await strange_animals();
  if (12 >= save_stage) await river_travelers();
  if (13 >= save_stage) await the_tower();
  if (14 >= save_stage) await california();




}

function save(stage){
  if ("y"==options_prompt("Would you like to save? (y/n)", ["n", "y"])){
    stats.last_level = stage;
    let code = btoa(JSON.stringify(stats)); // Encode with base64 
    console.log("This is your save code, keep it somewhere save: " + code)
    prompt("Press enter to continue.")
    clear();
  }
}
async function main(){
  clear()
  console.log(BIG_NAME)
  console.log("This game is best played in as large a screen as possible. Resize the run window to take up as much of the screen as posible. Otherwise the ascii art will look bad.")
  console.log("Also this game contains real time ascii game play, so bad internet may cause some issues rendering")
  console.log("For BEST results, clone the repo locally: `git clone https://github.com/HeronErin/Californian-Trail.git`")
  console.log("\n\n")

  // Fast debug save loading
  if (process.argv[2] != undefined){
    try{
      stats = JSON.parse(atob(process.argv[2]));
      return await game(stats.last_level);
    }catch(e){console.log(e); prompt(''); return;}
  }

  if (options_prompt("Do you have a save code? (y/n) ", ["y", "n"]) == "y"){
    while (true){
      let answer = prompt("Enter a save code (or e to exit): ")
      if (answer != "e"){
        try{
          stats = JSON.parse(atob(answer));
          clear();
          console.log("Welcome back "+ stats.name)
          await setTimeoutPromise(2000)
          return await game(stats.last_level);
        }catch(e){
          console.log(ansi_red+"Invalid save code"+ansi_reset);
        }
      }else{break;}
    }
    
  }
  stats.name = get_name();
  await starting_shop();
  return await game(-1);
  
}




main().then(()=>{})






