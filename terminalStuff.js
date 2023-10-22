var prompt = require('prompt-sync')()
// https://nodejs.org/api/timers.html
const { setTimeout: setTimeoutPromise } = require('node:timers/promises');





// https://textkool.com/en/ascii-art-generator?hl=default&vl=default&font=Pagga&text=hours%20later
const BIG_NAME = `
 █▀▀ █▀█ █   ▀█▀ █▀▀ █▀█ █▀▄ █▀█ ▀█▀ █▀█ █▀█   ▀█▀ █▀▄ █▀█ ▀█▀ █  
 █   █▀█ █    █  █▀▀ █ █ █▀▄ █ █  █  █▀█ █ █    █  █▀▄ █▀█  █  █  
 ▀▀▀ ▀ ▀ ▀▀▀ ▀▀▀ ▀   ▀▀▀ ▀ ▀ ▀ ▀ ▀▀▀ ▀ ▀ ▀ ▀    ▀  ▀ ▀ ▀ ▀ ▀▀▀ ▀▀▀`
const BIG_SHOP_TEXT = `
 █ █ █▀▀ ▀   █▀█ █   █▀▄   █▀▀ █ █ █▀█ █▀█
  █  █▀▀     █ █ █   █ █   ▀▀█ █▀█ █ █ █▀▀
  ▀  ▀▀▀     ▀▀▀ ▀▀▀ ▀▀    ▀▀▀ ▀ ▀ ▀▀▀ ▀  `
const BIG_START = `
 █▀▀ ▀█▀ █▀█ █▀▄ ▀█▀ █  
 ▀▀█  █  █▀█ █▀▄  █  ▀  
 ▀▀▀  ▀  ▀ ▀ ▀ ▀  ▀  ▀  `

const BIG_SNAKE = `
 █▀▀ █▀█ █▀█ █ █ █▀▀ █
 ▀▀█ █ █ █▀█ █▀▄ █▀▀ ▀
 ▀▀▀ ▀ ▀ ▀ ▀ ▀ ▀ ▀▀▀ ▀`
const BIG_COWARD = `
 █▀▀ █▀█ █ █ █▀█ █▀▄ █▀▄
 █   █ █ █▄█ █▀█ █▀▄ █ █
 ▀▀▀ ▀▀▀ ▀ ▀ ▀ ▀ ▀ ▀ ▀▀ `
 const BIG_DEAD = `
 █ █ █▀█ █ █   █▀█ █▀▄ █▀▀   █▀▄ █▀▀ █▀█ █▀▄
  █  █ █ █ █   █▀█ █▀▄ █▀▀   █ █ █▀▀ █▀█ █ █
  ▀  ▀▀▀ ▀▀▀   ▀ ▀ ▀ ▀ ▀▀▀   ▀▀  ▀▀▀ ▀ ▀ ▀▀ `
const BIG_1 = `
 ▀█ 
  █ 
 ▀▀▀`
const BIG_2 = `
 ▀▀▄
 ▄▀ 
 ▀▀▀`
const BIG_3 = `
 ▀▀█
  ▀▄
 ▀▀ `
const BIG_HOURS = `
 █ █ █▀█ █ █ █▀▄ █▀▀
 █▀█ █ █ █ █ █▀▄ ▀▀█
 ▀ ▀ ▀▀▀ ▀▀▀ ▀ ▀ ▀▀▀`

const BIG_LATER = `
 █   █▀█ ▀█▀ █▀▀ █▀▄
 █   █▀█  █  █▀▀ █▀▄
 ▀▀▀ ▀ ▀  ▀  ▀▀▀ ▀ ▀`
const BIG_THAT = `
 ▀█▀ █ █ █▀█ ▀█▀
  █  █▀█ █▀█  █ 
  ▀  ▀ ▀ ▀ ▀  ▀ `
const BIG_NIGHT = `
 ▀█▀ █ █ █▀█ ▀█▀
  █  █▀█ █▀█  █ 
  ▀  ▀ ▀ ▀ ▀  ▀ `
const BIG_BEAR = `
 █▀▄ █▀▀ █▀█ █▀▄
 █▀▄ █▀▀ █▀█ █▀▄
 ▀▀  ▀▀▀ ▀ ▀ ▀ ▀`
const BIG_WIN = `
 █ █ █▀█ █ █   █ █ ▀█▀ █▀█
  █  █ █ █ █   █▄█  █  █ █
  ▀  ▀▀▀ ▀▀▀   ▀ ▀ ▀▀▀ ▀ ▀`
const BIG_CONFUSION = `
 █ █ █▀█ █ █   ▀ ▀ █ █ ▀█▀ █▀█ ▀ ▀
  █  █ █ █ █       █▄█  █  █ █    
  ▀  ▀▀▀ ▀▀▀       ▀ ▀ ▀▀▀ ▀ ▀    `
const BIG_CURE = `
 █ █ █▀█ █ █   █▀█ █▀▄ █▀▀   █▀▀ █ █ █▀▄ █▀▀ █▀▄
  █  █ █ █ █   █▀█ █▀▄ █▀▀   █   █ █ █▀▄ █▀▀ █ █
  ▀  ▀▀▀ ▀▀▀   ▀ ▀ ▀ ▀ ▀▀▀   ▀▀▀ ▀▀▀ ▀ ▀ ▀▀▀ ▀▀ `
const BIG_DAY = `
 ▀█    █▀▄ █▀█ █ █   █   █▀█ ▀█▀ █▀▀ █▀▄
  █    █ █ █▀█  █    █   █▀█  █  █▀▀ █▀▄
 ▀▀▀   ▀▀  ▀ ▀  ▀    ▀▀▀ ▀ ▀  ▀  ▀▀▀ ▀ ▀`

const BIG_SWING = `
 █▀▀ █ █ ▀█▀ █▀█ █▀▀
 ▀▀█ █▄█  █  █ █ █ █
 ▀▀▀ ▀ ▀ ▀▀▀ ▀ ▀ ▀▀▀`
const BIG_CRACK = `
 █▀▀ █▀▄ █▀█ █▀▀ █ █
 █   █▀▄ █▀█ █   █▀▄
 ▀▀▀ ▀ ▀ ▀ ▀ ▀▀▀ ▀ ▀`
const BIG_SUNLIGHT = `
 █▀▀ █ █ █▀█ █   ▀█▀ █▀▀ █ █ ▀█▀
 ▀▀█ █ █ █ █ █    █  █ █ █▀█  █ 
 ▀▀▀ ▀▀▀ ▀ ▀ ▀▀▀ ▀▀▀ ▀▀▀ ▀ ▀  ▀ `

const BIG_TORNADO= `
 ▀█▀ █▀█ █▀▄ █▀█ █▀█ █▀▄ █▀█
  █  █ █ █▀▄ █ █ █▀█ █ █ █ █
  ▀  ▀▀▀ ▀ ▀ ▀ ▀ ▀ ▀ ▀▀  ▀▀▀`
const BIG_SPLAT = `
 █▀▀ █▀█ █   █▀█ ▀█▀
 ▀▀█ █▀▀ █   █▀█  █ 
 ▀▀▀ ▀   ▀▀▀ ▀ ▀  ▀ `



// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color#41407246
const ansi_reset = "\x1b[0m"
const ansi_red = "\x1b[31m"
const ansi_green = "\x1b[32m"
const ansi_yellow = "\x1b[33m"
const ansi_yellow_bg = "\x1b[103m"
const ansi_cyan_bg = "\x1b[46m"
const ansi_purple= "\x1b[95m"
const ansi_dark_purple = "\x1b[35m"



// This was HARD to figure out how to work with ansi codes
// but gives great atmosphere
async function typewriter(text, interval){
  if (!interval) interval = 50

  let activeCodes = ""; 
  let isAnsi = false
  for (let char of text){
    if (char == '\x1b') {
      isAnsi = true;
      activeCodes+=char;
    } else if (isAnsi){
      activeCodes+=char;
      if (char == "m")
        isAnsi = false;
    }else {
      process.stdout.write(activeCodes + char + ansi_reset);
      await setTimeoutPromise(interval);
    }
    
  }
  if (isAnsi)
    process.stdout.write(activeCodes);
  process.stdout.write("\n")
  await setTimeoutPromise(interval);

}

async function blue_cyan_backdrop(time){
  console.log(ansi_cyan_bg) // Fun trick to turn the screen one color
  clear(); // Just print a background code and clear
  
  await setTimeoutPromise(time)
  console.log(ansi_reset)
  clear();
}





 // converted with https://www.text-image.com/convert/ascii.html
 // Converted from image from https://www.nps.gov/subjects/bears/safety.htm
const BEAR_FIGHT = `
..........................................................................................:~P##G!...
..........................................................................................^J&&#&Y ..
............................................................................................YG&&G!..
...................................  ..     .^~:.  ................................. .....  :5&#&&5:
......................          ..:!YGGY77?Y5#&GGJ!: ............................::~7!^^^^75B&####&?
................  .:^!!7?777??Y5PP#&&&&&&&&&&&&&&&&B?^............................~#BGB##&&&&#####&Y
...............^7YPB#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#?  .........................:G5?Y5YJJJJ#####&Y
............ :J#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&Y!:.........................:. .     .B&####G
.......... .?B&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@&G^..................................Y&###&P
.........:7G&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#GYYJYY5YY?:.................................. !&###&5
....... ~B&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&G^.    .    ...................................:P&###&7
.......!B&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&B~............................................ ?&###&B:
......J&&&&&&&&&&&&&&&&&&&&&&&&&#GGGP#&&&&&&&&&BP7..........................................G&###&P.
... :J#&&&&&&&&&&&&&&&&&&&#B5Y??^:...~5&&&&&&&#G&&Y........................................~&####&P.
...~G&&&&&&&#GJ75B&&&&&&&&Y:.   .......J#&&&&&G~?#&J.......................................^#&###&B~
 ~G#&&&&#B57^..  ~B&&&&&&B^.............^JB&&&&#J~75^ ..................................... ?&&###&P
^G@##GY7^:  .....:G&&&&&&?................:!5##&@BJ!^^:......................................?######
G&Y^^:  .........J&&&&#57:................. .^^!7YPGG57:.....................................:Y&&&&P
Y? ..............5####BYYY!.................................................................:5PGGPY~

(Image from national park service)`

// Animation frames of you apreaching
let BEAR_FIGHT_FRAMES = [];
for (let x = 0; x != 28; x++){
  let frame = "";
  for (let line of BEAR_FIGHT.split("\n")){
    if (line.length > 59){
      frame+=line.substring(0, 59) + line.substring(59, 59+x) + line.substring(81, line.length) + "\n"
    }else{
      frame+=line+"\n";
    }
  }
  BEAR_FIGHT_FRAMES.push(frame);
}
// Animation frames of bear apreaching
let HURT_BEAR_FRAMES = [];
for (let x = 0; x != 18; x++){
  let frame = "";
  for (let line of BEAR_FIGHT.split("\n")){
    if (line.length > 59){
      frame+=line.substring(63, 81-x)+line.substring(0, 59) + line.substring(59, 54+x) + line.substring(81, line.length) + "\n"
    }else{
      frame+=line+"\n";
    }
  }
  HURT_BEAR_FRAMES.push(frame);
}


// converted with https://www.text-image.com/convert/ascii.html
// Snake made in gimp, and man taken from bear fight
const SNAKE_FIGHT = `
                                                                                :~P##G!   
                                                                                ^J&&#&Y   
                                                                                  YG&&G!  
                                                                                  :5&#&&5:
                                                                       ::~7!^^^^75B&####&?
                                                                        ~#BGB##&&&&#####&Y
                                      !5B#B?:^~:                        :G5?Y5YJJJJ#####&Y
                                    7B@@@@@G::                           :         B&####G
                                   Y@@@@@BJ:                                       Y&###&P
                        ::       :P@@@@&?                                          !&###&5
       ~777~:       :YG#&&&G7~: ?&@@@@@!                                          :P&###&7
    :YB@@@@@@G7:   ^#@@@@@@@@@&#@@@@@P~                                           ?&###&B:
   Y&@@@@@@@@@@&P?Y&@@@@BG#@@@@@@@@B7                                             G&###&P 
 :G@@@@@G~?G&@@@@@@@@@@G   ^YGBGPY~                                              ~&####&P 
!#@@@@#~    :?G#&&&&BY~                                                          ^#&###&B~
@@@@@P          ::::                                                              ?&&###&P
@@@@J                                                                              ?######
                                                                                   :Y&&&&P
                                                                                  :5PGGPY~ 
`
// Animation frames of snake apreaching
let SNAKE_FIGHT_FRAMES = [];
for (let x = 0; x != 22; x++){
  let frame = "";
  for (let line of SNAKE_FIGHT.split("\n")){
    if (line.length > 40){
      frame+=line.substring(0, 48) + line.substring(48, 48+x) + line.substring(71, line.length) + "\n"
    }else{
      frame+=line+"\n";
    }
  }
  SNAKE_FIGHT_FRAMES.push(frame);
}

let SNAKE_HURT_FRAMES = [];
for (let x = 0; x != 20; x++){
  let frame = "";
  for (let line of SNAKE_FIGHT.split("\n")){
    if (line.length > 40){
      frame+=line.substring(48, 70-x)+line.substring(0, 48) + line.substring(48, 48+x) + line.substring(71, line.length) + "\n"
    }else{
      frame+=line+"\n";
    }
  }
  SNAKE_HURT_FRAMES.push(frame);
}




const WIZZARD_FIGHT = ` 
                                                                          `+ansi_red+`:   GB   . `+ansi_reset+`
                                                                         `+ansi_red+`.@~?B@@B?^@^  `+ansi_reset+`             
                                                                         `+ansi_red+`.&&@@@@@@&&:   `+ansi_reset+`            
                `+ansi_red+`.7`+ansi_reset+`                                                          @@@@@@            
            `+ansi_red+`G^ ^G@J: ?J`+ansi_reset+`                                                    J@@@@@@#.                
           `+ansi_red+` &@#@@@@@#@P`+ansi_reset+`                                                    #@@@@@@@Y                
            :7@@@@@@5^.                                           ~#!      ?&@@@@@G.                
             .@@@@@@B                                              .GB:      ^#@5                   
              :B@@BY:                                                ^BP..~7.:B@7.                  
         :Y&@@GB@@?YG^                                                ^&@&##P!G@~YPJ^               
      :5&@@G?@@@@@@@&GB7. :^:!!!!JY:                                  ?5:.#&.  J@   :^               
      J@@5.  @@@@@@@7 .7PJ#&5^.....                                       ?~  Y@                    
       .    .@@@@@@@7                                                         Y@                    
            ?@@@@@@@~                                                         Y@                    
            B@@@@@@@7                                                        ?#GB:                  
         .~B@@@@@@@@&                                                      !#J  ^GG.                
   #@&#&&@@@@@@@@@@@@#:                                                  .#P.     !#J               
  `

// Animation frames of snake apreaching
let WIZZARD_FIGHT_FRAMES = [];
for (let x = 0; x != 30; x++){
  let frame = "";
  let nline = 0;
  for (let line of WIZZARD_FIGHT.split("\n")){
    nline +=1;
    if (line.length > 30){
      frame+=line.substring(0, 35) + " ".repeat(x)  +line.substring(67, line.length) + "\n"
    }else{
      frame+=line+"\n";
    }
  }
  WIZZARD_FIGHT_FRAMES.push(frame);
}
let WIZZARD_HURT_FRAMES = [];
for (let x = 0; x != 30; x++){
  let frame = "";
  let nline = 0;
  for (let line of WIZZARD_FIGHT.split("\n")){
    nline +=1;
    if (line.length > 30){
      let mid = " ".repeat(30)
      if (nline == 12)
        mid = mid.substring(x, mid.length-1) + "*" + mid.substring(0, x)
      frame+=line.substring(0, 35) + mid +line.substring(67, line.length) + "\n"
    }else{
      frame+=line+"\n";
    }
  }
  WIZZARD_HURT_FRAMES.push(frame);
}











const DEMON_FIGHT = `
.JY!   !Y.        .^!7YYYY7!^.        .Y!   !YJ
.&@@7  ~#&!   :75GGP5??~~??5PGG57:   !&#~  7@@@
 !@@@G: .J#G?GBP7:            :7PBG?G#J. :G@@@7
  7@@@&Y:.P@P?^!??J!^      ^!J??!^?P@P.:Y&@@@7 
   ^5#@@&&P^~5#@`+ansi_red+`BJ5`+ansi_reset+`@#.    .#@`+ansi_red+`5JB@`+ansi_reset+`#5~^P&&@#5^
      J@&^  &`+ansi_red+`B?@J Y`+ansi_reset+`@~      ~@P`+ansi_red+` J@Y`+ansi_reset+`#&  ^&@J     
      ^@J  .&`+ansi_red+`&55?G`+ansi_reset+`@!        ~@`+ansi_red+`G?55&`+ansi_reset+`&.  J@^     
      B&:   7@`+ansi_red+`GPB`+ansi_reset+`G^          ^G`+ansi_red+`BPG`+ansi_reset+`@7   :&B     
     ?@!     ~?!.              .!?~     !@?    
    ~&#                                  #&~   
    J@J      7GGG57~.      .~75GGG7      J@J   
    J@J    .B#G@5J&@&B?..?B&@&J5@G#B.    J@J   
    ~&#    .@J .  5P5?&##&?5P5  . J@.    #&~   
     ?@!   .#&BP      Y@@Y      PB&#.   !@?    
      B&:   ?@&Y    .5@@@@5.    Y&@?   :&B     
      ^@J   .&#?!    P#@@#P    !?#&.   J@^     
       G@^   ?@@&.    ^77^    .&@@?   ^@G      
       :5&P^  B@7:!JPGGGGGGPJ!:7@B  ^P&5:      
         :5&G?^G&B@B5J?~~?J5B@B&G^?G&5:        
           :?GBGB5?77J5YY5J77?5BGBG?:          
              :75GPP5?7^^7?5PPG57:             
                  .^!7YYYY7!^.                 
`


// Animation frames of snake apreaching
let DEMON_FIGHT_FRAMES = [];
for (let x = 0; x != 41; x++){
  let frame = "";
  let nline = 0;
  for (let line of DEMON_FIGHT.split("\n")){
    nline +=1;
    if (line.length > 40){
      let ln = SNAKE_FIGHT.split("\n")[nline-5];
      let add = "";
      if (ln)
        add=ln.substring(ln.length-19, ln.length)
      frame+=line + " ".repeat(x)  +add + "\n"
    }else{
      frame+=line+"\n";
    }
  }
  DEMON_FIGHT_FRAMES.push(frame);
}

let DEMON_HURT_FRAMES = [];
for (let x = 0; x != 41; x++){
  let frame = "";
  let nline = 0;
  for (let line of DEMON_FIGHT.split("\n")){
    nline +=1;
    if (line.length > 40){
      let ln = SNAKE_FIGHT.split("\n")[nline-5];
      let add = "";
      if (ln)
        add=ln.substring(ln.length-19, ln.length)
      frame+=" ".repeat(41-x)+line + " ".repeat(x)  +add + "\n"
    }else{
      frame+=line+"\n";
    }
  }
  DEMON_HURT_FRAMES.push(frame);
}






const MAN_FIGHT = `
   !G##P~:         
   Y&#&&J^         
  !G&&GY           
:5&&#&5:           
?&####&B5########+ 
Y&#####&&&&&&&     
Y&#####JJJ         
G####&B            
P&###&Y            
5&###&!            
7&###&P:           
:B&###&?           
 P&###&G           
 P&####&~          
~B&###&#^          
P&###&&?           
######?            
P&&&&Y:            
~YPGGP5:           
`

// Animation frames of snake apreaching
let MAN_FIGHT_FRAMES = [];
for (let x = 0; x != 41; x++){
  let frame = "";
  let nline = 0;
  for (let line of MAN_FIGHT.split("\n")){
    nline +=1;
    if (line.length > 5){
      let ln = SNAKE_FIGHT.split("\n")[nline];
      let add = "";
      if (ln)
        add=ln.substring(ln.length-19, ln.length)
      frame+=line + " ".repeat(x)  +add + "\n"
    }else{
      frame+=line+"\n";
    }
  }
  MAN_FIGHT_FRAMES.push(frame);
}

let MAN_HURT_FRAMES = [];
for (let x = 0; x != 45; x++){
  let frame = "";
  let nline = 0;
  for (let line of MAN_FIGHT.split("\n")){
    nline +=1;
    if (line.length > 5){
      let ln = SNAKE_FIGHT.split("\n")[nline];
      let add = "";
      if (ln)
        add=ln.substring(ln.length-19, ln.length)
      let xline = line + " ".repeat(40)  +add + "\n"
      if (nline == 6){
        xline = xline.substring(0, x+20) + "*" + xline.substring(x+1+20, xline.length);
      }
      frame+= xline;
    }else{
      frame+=line+"\n";
    }
  }
  MAN_HURT_FRAMES.push(frame);
}









let CANYON_WALL = `
MMMMMM
M@@@@M
M@@@@M
MMMMMM
M@@@@M
M@@@@M
MMMMMM
M@@@@M
M@@@@M
MMMMMM
M@@@@M
M@@@@M
MMMMMM
M@@@@M
M@@@@M
MMMMMM
M@@@@M
M@@@@M
MMMMMM
M@@@@M
M@@@@M
MMMMMM
M@@@@M
M@@@@M
MMMMMM
M@@@@M
M@@@@M
MMMMMM
M@@@@M
M@@@@M
MMMMMM
M@@@@M
M@@@@M
MMMMMM
M@@@@M
M@@@@M
MMMMMM`
CANYON_WALL+=CANYON_WALL









// converted with https://www.text-image.com/convert/ascii.html
// But I made it in gimp myself
const DEAD_GUY = `
                                         J@@@@@B:                                                   
                                         ?@@@@@@@Y                            :~YYYYYYY~:.          
                                          ...^#@@@@J                       ^P&@@@@@@@@@@@@&5!..     
...                                            ^B@@@&^                  ^G@@@@@@@@@@@@@@@@@@@@@@#J. 
@@@#Y7.                                          7@@@@5^              5&@@@@@@@B7^..:!7YG@@@@@@@@@@#
@@@@@@@&BP!.                                      .P@@@@P.          .&@@@@@@G!      5&P:  ^?YB@@@@@@
J#@@@@@@@@@@@&P7.                                   .5@@@@P.        &@@@@@J          .J&&J^?&B~.!&@@
  .:YB&@@@@@@@@@@##55###5Y~~~........    ...........  ^B@@@@?      B@@@@@?              J@@@@^   ~@@
        ^YGB@@@@@@@@@@@@@@@@@@@@@@@@@&&&&@@@@@@@@@@@@@@@@@@@@&&&P5Y@@@@@P  G&J        ^#@P..&@    @@
             :J&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@5  .Y@&:      -      .   .@@
                Y@@@@@&^^~~?55555Y5########5Y55555YY5&@@@@@###@@@@@@@@@@@?   :@@    ~.     .     Y@@
               5@@@@@&                             ~#@@@&7.    .^^^P@@@@@7    J@     .&&..JB&P   @@@
             .B@@@@@B.                          :Y&@@@&!            @@@@@@    J@ .~~~J#@@@G:    B@@@
            7@@@@@@Y                           Y@@@@#~             P@@@@@P   :@& 5GJ??^.Y@#.   5@@@@
          :B@@@@@&^                           G@@@B.              7@@@@@#   ~&&:          P@G^#@@@@@
         Y@@@@@@?                           .B@@@#                J@@@@@.                  #@@@@@@&J
       ~@@@@@@G.                            J@@@P                 J@@@@@             ::?G&@@@@@@&?  
     .G@@@@@&~                              .JY!                  J@@@@@@BJ?^:::^?PB&@@@@@@@@@&7    
   .G@@@@@@5                                                      .P@@@@@@@@@@@@@@@@@@@@@@@BJ.      
   ?@@@@@@~                                                          ~G&@@@@@@@@@@@@@&#?~.          
    ^PGGJ.                                                              .:!7777777!:.               
                                                                                                    
                                                                                                    
                                                                                                   `

// converted with https://www.text-image.com/convert/ascii.html
// But I made it in gimp myself then added ansi color codes
const TEMPLE = `                                                           ..                                                           
                                                      .^Y#@@@@#Y^.                                                      
                                                 .~JG@@@@@B??B@@@@@GJ~.                                                 
                                             :?P&@@@@#Y^.      .^Y#@@@@&P?:                                             
                                        .!P&@@@@&P!.                .!P&@@@@&P!.                                        
                                   .~Y#@@@@&P?:        .^?#&&#?^.        :?P&@@@@#Y~.                                   
                              .^?B@@@@&G?^.       :!YB@@@@@&&@@@@@BY!:       .^?G&@@@@B?^.                              
                          :7G&@@@@#J~.      .~?G&@@@@&BJ~.    .~JB&@@@@&G?~.      .~J#@@@@&G7:                          
                     :~5&@@@@&5~.      :75&@@@@@#P7^                ^7P#@@@@@&57:      .~5&@@@@&5~:                     
                .!YB@@@@&G7:     .^YG&@@@@#P7^.                          .^7P#@@@@&GY^.     :7G&@@@@BY!.                
            ^JG&@@@&BJ^       Y&@@@@@@@&GY?7!7777??????????????????????7777!7?YG&@@@@@@@&Y       ^JB&@@@&GJ^            
       :7G&@@@&BY^.           B&&&#####&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#####&&&B           .^YB&@@@&G7:       
     ^@@@@@#P7^:..::::::!7777777777777!G@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@77777777777777!::::::..:^7P#@@@@@^     
     7@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@7     
     !@@# ...............                                                                      ............... G@@7     
     .@@&!!!!!!!777777777777777777777^::::::::::::::::::::::::::::::::::::::::::::^777777777777777777777!!!!!!!@@@.     
      PB@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@BP      
        5@@@@@@:                    ......`+ansi_green+`&@@~`+ansi_reset+`.......:@@@@@@@@@@@@:...........`+ansi_green+`#@@#:. `+ansi_reset+`                   :@@@@@@5        
        P@@@@@@:`+ansi_green+`                         G@@#`+ansi_reset+`         @@@@@@@@@@@@     `+ansi_green+`        P@@&                     `+ansi_reset+`:@@@@@@P        
        P@@@@@@:`+ansi_green+`                        G@@G `+ansi_reset+`         @@@@@@@@@@@@     `+ansi_green+`         G@@Y                    `+ansi_reset+`:@@@@@@P        
        P@@@@@@:`+ansi_green+`                       B@@&  `+ansi_reset+`         @@@@@@@@@@@@     `+ansi_green+`         .@@&                    `+ansi_reset+`:@@@@@@P        
        P@@@@@@:`+ansi_green+`                     ^&@@P   `+ansi_reset+`         @@@@@@@@@@@@     `+ansi_green+`          &@@^                   `+ansi_reset+`:@@@@@@P        
        P@@@@@@:`+ansi_green+`                    Y@@@!    `+ansi_reset+`         @@@@@@@@@@@@     `+ansi_green+`          ?@@G                   `+ansi_reset+`:@@@@@@P        
        P@@@@@@:`+ansi_green+`                   !@@&.     `+ansi_reset+`         @@@@@@@@@@@@     `+ansi_green+`          .@@@.                  `+ansi_reset+`:@@@@@@P        
        P@@@@@@:`+ansi_green+`                  !@@@^      `+ansi_reset+`         @@@@@@@@@@@@     `+ansi_green+`           Y@@@!                 `+ansi_reset+`:@@@@@@P        
        P@@@@@@:`+ansi_green+`               .?&@@&!       `+ansi_reset+`         @@@@@@@@@@@@     `+ansi_green+`            !@@@G.               `+ansi_reset+`:@@@@@@P        
        P@@@@@@:`+ansi_green+`             .P@@@G:         `+ansi_reset+`        .@@@@@@@@@@@@.    `+ansi_green+`             .G@@@!              `+ansi_reset+`:@@@@@@P        
        P@@@@@@:`+ansi_green+`           .?@@@P.           `+ansi_reset+`        7@@@@@@@@@@@@7    `+ansi_green+`               ~&@@G:            `+ansi_reset+`:@@@@@@P        
        P@@@@@@:`+ansi_green+`      .^!G@@@@B!             `+ansi_reset+`        7@@@@@@@@@@@@7    `+ansi_green+`                 Y@@@P.          `+ansi_reset+`:@@@@@@P        
        P@@@@@@.`+ansi_green+`  J#@@@@@@&Y^                `+ansi_reset+`        7@@@@@@@@@@@@7    `+ansi_green+`                  .Y@@@&J.       `+ansi_reset+`.@@@@@@P        
        P@@@@@@&`+ansi_green+`&@@@&?~:.                    `+ansi_reset+`        7@@@@@@@@@@@@7    `+ansi_green+`                     ?#@@@PJGGGGG`+ansi_reset+`#@@@@@@P        
        !@@@@@@#`+ansi_green+`G5?!                         `+ansi_reset+`        7@@@@@@@@@@@@7    `+ansi_green+`                      :G@@@@@&GGG`+ansi_reset+`#@@@@@@!        
        .@@@@@@.`+ansi_green+`                             `+ansi_reset+`        7@@@@@@@@@@@@7    `+ansi_green+`                   ~G@@@@&&@@P   `+ansi_reset+`.@@@@@@.        
        :@@@@@@:`+ansi_green+`                             `+ansi_reset+`        7@@@@@@@@@@@@7    `+ansi_green+`                .5&@@&J:   &@@P  `+ansi_reset+`:@@@@@@:        
        :@@@@@@:`+ansi_green+`                             `+ansi_reset+`        7@@@@@@@@@@@@7    `+ansi_green+`              :G@@@P:      .&@@P `+ansi_reset+`.@@@@@@:        
        :@@@@@@:`+ansi_green+`                             `+ansi_reset+`        !@@@@@@@@@@@@!    `+ansi_green+`             5@@@7          .B@@&`+ansi_reset+`#@@@@@@:        
        :@@@@@@:`+ansi_green+`                             `+ansi_reset+`     :J?B@@@@@@@@@@@@B?J: `+ansi_green+`            B@@#              ^B@`+ansi_reset+`@@@@@@@:        
        :@@@@@@:`+ansi_green+`                             `+ansi_reset+`     P@@&############&@@P `+ansi_green+`           Y@@#                 :`+ansi_reset+`Y@@@@@@:        
        :@@@@@@:`+ansi_green+`                             `+ansi_reset+`     P@@:            :@@P `+ansi_green+`          .@@@.                  `+ansi_reset+`.@@@@@@:        
        :@@@@@@:`+ansi_green+`                             `+ansi_reset+`     P@@:            :@@P `+ansi_green+`          P@@5                   `+ansi_reset+`:@@@@@@:        
        :@@@@@@:`+ansi_green+`                             `+ansi_reset+`     P@@:         `+ansi_red+`Y&G`+ansi_reset+`:@@P `+ansi_green+`         .@@@.                   `+ansi_reset+`:@@@@@@:        
        :@@@@@@:`+ansi_green+`                             `+ansi_reset+`     P@@:         `+ansi_red+`!P?`+ansi_reset+`:@@P `+ansi_green+`         :@@P                    `+ansi_reset+`:@@@@@@:        
        :@@@@@@:`+ansi_green+`                             `+ansi_reset+`     P@@:            :@@P `+ansi_green+`         #@@Y                    `+ansi_reset+`:@@@@@@:        
        :@@@@@@.`+ansi_green+`                             `+ansi_reset+`     5@@.            .@@5 `+ansi_green+`        ?@@#                     `+ansi_reset+`.@@@@@@:        
        :@@@@@@~......................^^^^^^^^^^^^B@@7^^^^^^^^^^^^7@@B^^^^^^^^^&@@7 ....................~@@@@@@:        
        :@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:        
         &@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&         
         #@@!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~!@@#         
         &@@                                                                                                @@&         
        :@@@&###############################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:        
        :@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:        
        :@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:        `

// Also made by me in gimp then converted
const STATUE = `
                       !!!!                       
                      J@@@@J                      
                     5@@@@@@5                     
                   7&@@@GG@@@&7                   
                 ^B@@@&^  ^&@@@B^                 
               .5@@@@?      ?&@@@G.               
              J@@@@P.         P@@@@J              
            ~&@@@#. `+ansi_red+` :G@@@@G: `+ansi_reset+` .#@@@&~            
          :B@@@&^  `+ansi_red+` 5@@@@@@@@B. `+ansi_reset+` ^&@@@B:          
         !@@@@?  `+ansi_red+` Y@@@@P  Y@@@@Y  `+ansi_reset+` ?@@@@!         
         ^@@@@5  `+ansi_red+` &@@@@P~~P@@@@& `+ansi_reset+`  5@@@@^         
          .G@@@&: `+ansi_red+` ~5@@@@@@@@5~ `+ansi_reset+` :&@@@G.          
            7@@@@P   `+ansi_red+` ^PPPP^ `+ansi_reset+`   P@@@@7            
              G@@@&~          ~&@@@G              
               !&@@@P        P@@@&!               
                 G@@@&~    ~&@@@G                 
                  ^@@@@    @@@@^                  
                   J@@@    @@@J                   
                   J@@@    @@@J                   
                   J@@@    @@@&                   
        B&&&&&&&&&&@@@@&&&&@@@@&&&&&&&&&&B        
        #@@@&#######B&@@@@@@&B#######&@@@#        
        J@@@        .&@@@@@@&.        @@@J        
        J@@@       5@@@@@@@@@@5       @@@J        
        J@@@     7@@@@#@@@@#@@@@7     @@@J        
        J@@@   .#@@@&: @@@@ :&@@@#.   @@@J        
        J@@@  P@@@@J .~@@@@~. J@@@@P  @@@J        
        J@@@7&@@@P  :^.@@@@.^:  P@@@&7@@@J        
        J@@@@@@@@PPP&GG`+ansi_yellow+`@@@@`+ansi_reset+`GG&PPP@@@@@@@@J        
        J@@@@@@@@@@@@@@`+ansi_yellow+`@@@@`+ansi_reset+`@@@@@@@@@@@@@@J        
        J@@@@@@G:::P~:^@@@@^:~P:::G@@@@@@J        
        J@@@&@@@Y  :!. @@@@ .!:  Y@@@&@@@J        
        J@@@.G@@@&:  :^@@@@^:  :&@@@G.@@@J        
        J@@@  7@@@@?   @@@@   ?@@@@7  @@@J        
        J@@@   .#@@@B. @@@@ .B@@@#.   @@@J        
        J@@@     Y@@@@7@@@@7@@@@Y     @@@J        
        J@@@      ^&@@@@@@@@@@&^      @@@J        
        J@@@       .#@@@@@@@@#.       @@@J
        #@@@&#######B&@@@@@@&B#######&@@@#
        B&&&&&&&&&&@@@@&&&&@@@@&&&&&&&&&&B    `


// Made byself in gimp
const SWORD = `
                                                                                                    
                                                                                                    
                                                                                             ^&@&@7 
                                                                                           7&@@@@@J 
                                                                                          ^@@@@@@~  
                                                                                        ^B@@@@@@Y   
                                                                                      !#@@@@@@?     
                                                                                    !&@@@@@@@P      
                                                                                   G@@@@@@@Y.       
                                                                                 ^#@@@@@@5          
                                                                               !&@@@@@@@G:          
                                                                             ?&@@@@@@@P.            
                                                                           :@@@@@@@@@#:             
                                                                          ~B@@@@@@@B^               
                                                                        !&@@@@@@@@&^                
                                                                     .?&@@@@@@@@#!                  
                                                                     !@@@@@@@@@@^                   
                                                                   ~&@@@@@@@@&J                     
                                                                 7&@@@@@@@@&7                       
                                                               ?@@@@@@@@@@@Y                        
                                                              &@@@@@@@@@&Y.                         
                                                            !&@@@@@@@@@@P                           
                                                          7&@@@@@@@@@@P.                            
                                                        J&@@@@@@@@@@@P                              
                                                      !@@@@@@@@@@@@#^                               
                                                     7#@@@@@@@@@@@G                                 
                                                   ?&@@@@@@@@@@@&!                                  
                                                .J@@@@@@@@@@@@@G                                    
                                                5@@@@@@@@@@@@@?.                                    
                                              !&@@@@@@@@@@@&?                                       
                                            J&@@@@@@@@@@@@@.                                        
                                         .Y@@@@@@@@@@@@@@Y.                                         
                                        .@@@@@@@@@@@@@@@.                                           
            5#BB#B:                    ?&@@@@@@@@@@@@@G:                                            
            &@@@@@@#^               .?@@@@@@@@@@@@@@@.                                              
            ^G@@@@@@@BPP.         .5@@@@@@@@@@@@@@@B~                                               
              .&@@@@@@@@@@@7     Y@@@@@@@@@@@@@@@@:                                                 
               !#@@@@@@@@@@@&J???&@@@@@@@@@@@@@@&7                                                  
                 ::.:B@@@@@@@@@@@@@@@@@@@@@@@@&^                                                    
                      .G@@@@@@@@@@@@@@@@@@@@@J                                                      
                        .Y@@@@@&!`+ansi_green+`~~~`+ansi_reset+`#@@@@@@&7.                                                      
                         ?@@@@@B`+ansi_green+`MMMM`+ansi_reset+`5@@@@@J                                                         
                      .Y@@@@@@@&YJJJ&@@@@@7                                                         
                     5@@@@@@@@@@@@@@@@@@@@@&&?                                                      
                    7&@@@@@@@@@@@@@@#Y5&@@@@@@@J.                                                   
                  J&@@@@@@@@@@@@@@@@~  .^^G@@@@@&GB!                                                
                ^@@@@@@@@@@@@@@@@@Y        .G@@@@@@@&!::                                            
               7#@@@@@@@@@@@@@@@?            :?!B@@@@@@@G^                                          
             7@@@@@@@@@@@@@@@@@P                 :#@@@@@@5                                          
            &@@@@@@@@@@@@@@@@5.                    :P@@@@5                                          
          ~#@@@@@@@@@@@@@@@Y.                        :^^^.                                          
         #@@@@@@@@@@@@@@@@G.                                                                        
       :G@@@@@@@@@@@@@@@5:                                                                          
     ^#@@@@@@@@@@@@@@@#                                                                             
   !#@@@@@@@@@@@@@@@@G^                                                                             
 ~&@@@@@&~.:.?@@@@@@@:                                                                              
 ?@@@@@5`+ansi_green+`-------`+ansi_reset+`#@@@@@^                                                                              
 ?@@@@@5`+ansi_green+`-------`+ansi_reset+`#@@@@@^                                                                              
 ~&@@@@@&!.:.J@@@@@@#.                                                                              
   ~#@@@@@@@@@@@@@P:                                                                                
     :#@@@@@@@@@P.                                                                                  
       :P5555PY.                                                                                    
`

// Made myself in gimp then converted
const DEMON = `
    .....        ...                          ........                          ...        .....    
    @@@@@:       @@@:                  :::BB##@@@@@@@@##BB:::                  :@@@       :@@@@@    
    @@@@@@^      B@@@#            ^^##&@@@@@BBBB::::BBBB@@@@@&##^^            #@@@B      ^@@@@@@    
    G@@@@@@~      .@@@&~       ~&&@@@@GGG...            ...GGG@@@@&&~       ~&@@@.      ~@@@@@@@    
     @@@@@@@&7     .5@@@&7  7&&@@@55..                        ..55@@@&&7  7&@@@5.     7&@@@@@@@.    
      @@@@@@@@?       J&@@@@@@@YY                                  YY@@@@@@@&J       ?@@@@@@@@      
       &@@@@@@@@Y.     P@@@@&?    .......                  .......    ?&@@@@P     .Y@@@@@@@@&       
        &@@@@@@@@@P..P@@@&!   .PP@@@@@@@@PPP            PPP@@@@@@@@PP.   !&@@@P..P@@@@@@@@@&        
         ~&@@@@@@@@@@@@&~  ..G@@@@@&&&&#@@@@            @@@@#&&&&@@@@@G..  ~&@@@@@@@@@@@@&~         
           ^^#@@@@@@@#^   :@@@@`+ansi_red+`#@@@`+ansi_reset+`    :@@@^            ^@@@:    `+ansi_red+`@@@#`+ansi_reset+`@@@@:   ^#@@@@@@@#^^           
              :@@@@@:     @@@G. `+ansi_red+`@@@`+ansi_reset+`    @@@B              B@@@^   `+ansi_red+`@@@ `+ansi_reset+`GG@@@     :@@@@@:              
               .@@@P      @@@`+ansi_red+`~~&@@@`+ansi_reset+`  !&@@@                P@@@!  `+ansi_red+`@@@&~~`+ansi_reset+`@@@      P@@@.               
                @@@       @@@`+ansi_red+`@@@@@5`+ansi_reset+` 7@@@5.                 5@@@7 `+ansi_red+`5@@@@@`+ansi_reset+`@@@       @@@                
               @@@@       J@@@.  . @@@@J                    J@@@@ .  .@@@J       @@@@               
              Y@@@         &@@@YY@@@@&?                      ?&@@@@YY@@@&         @@@Y              
             .@@@!          &@@@@&&!!                          !!&&@@@@&          !@@@.             
             @@@#            ~~~~                                  ~~~~            #@@@             
            ^@@@                                                                    @@@^            
           ~@@@@                                                                    @@@@~           
           @@@@.                                                                    .@@@@           
           @@@@              7&&&&&&&77                      77&&&&&&&7              @@@@           
           @@@@            J@@@@@@@@@@@@@@JJ            JJ@@@@@@@@@@@@@@J            @@@@           
           @@@@           @@@&7@@@@ 775@@@@@@@5.    .5@@@@@@@577 @@@@7&@@@           @@@@           
           @@@@.          @@@  !!!!   @@@@@@&@@@P..P@@@&@@@@@@   !!!!  @@@          .@@@@           
           ~@@@@          @@@         ###### ~@@@@@@@@~ ######         @@@          @@@@~           
            ^@@@          @@@^^^^             ^@@@@@@^             ^^^^@@@          @@@^            
             @@@#         @@@@@@@&             @@@@@@             &@@@@@@@         #@@@             
             .@@@!        .@@@@@@@            &@@@@@@&            @@@@@@@.        !@@@.             
              Y@@@         @@@@@@.          &&@@@@@@@@&&          .@@@@@@         @@@Y              
               @@@@         @@@.            @@@@@@@@@@@@            .@@@         @@@@               
                @@@         @@@@555.        7&&@@@@@@&&7        .555@@@@         @@@                
                @@@P        !@@@@@@@           !&&&&!           @@@@@@@!        P@@@                
                ^@@@:        #@@@@@@                            @@@@@@#        :@@@^                
                 B@@@#^       @@@@G:      ^^^##########^^^      :G@@@@       ^#@@@B                 
                  :G@@@&~     G@@@^  ~~~&&@@@@@@@@@@@@@@@@&&~~~  ^@@@G     ~&@@@G:                  
                    .P@@@&!    P@@@& @@@@@555..........555@@@@@ &@@@P    !&@@@P.                    
                      .Y@@@@&?  J@@@@@@@55777777    77777755@@@@@@@J  ?&@@@@Y.                      
                         ?@@@@@Y?.&&@&@@@@@@@@@@@@@@@@@@@@@@@@&@&&.?Y@@@@@?                         
                            7&&@@@PP..       7777777777       ..PP@@@&&7                            
                               ~&&@@@@GPP...            ...PPG@@@@&&~                               
                                  ^^##&@@@@@BBBB::::BBBB@@@@@&##^^                                  
                                       :::BB##@@@@@@@@##BB:::                                       
                                              ........                                              `


const FOX = `
                      :!.                                                           
                    .!:~G!                                                          
                    !.  .P?                                                         
                   ~~     &7                     .                                  
                   G:    .&&.                :7Y?7~                                 
                  .&~    .&@J             ^YG5!. :~                                 
                   ##.   .Y:7~.     ..:~5&&?.   .7.                                 
                  .757.             :^^?@B.     7.                                  
                .J:                    .#^    .5~                                   
               .#~             .        .   :J&P                                    
               J@5:   .^:...  ~^           ~&@&.                                    
               J@Y     5`+ansi_green+`@&!G`+ansi_reset+`..J .:          ^@#                                     
              .BB.     .^^`+ansi_green+`:B.`+ansi_reset+`  !5`+ansi_green+`5GBP`+ansi_reset+`^       #@~                                    
             .~J!   .     ~!  :Y.`+ansi_green+`^Y5`+ansi_reset+`~        G@7                                    
            .^5!    ^~    .   :.             75.                                    
           .Y@B.     G!                 ..    :                                     
            .!B@!    ^&: .^~:    .~~:.  .J.                                         
              ?@J     7B:`+ansi_red+`J@@&^`+ansi_reset+` ^YJ:      7#~    .                                   
             .Y@P      :!`+ansi_red+`^^!!!JJ`+ansi_reset+`:         ?B:   ^:                                  
             Y@@?            .             7&?.  ?:                                 
            7#@Y                           :#@#~ .Y^                                
            7JB                             .&@&! .5~                               
            !@^                              !@&~  .Y?                              
           .&&:                             :!&@J    ?P.                            
           :@&#?J                           J#@P~     ~B!                           
           .G@@@Y                        .. 5@@?       :BP.                         
            .7B@P                        ?^ B&7:         Y&!                        
              ?@&. .                    :&5&@#:           ~&G.                      
              .Y&G^G.              .   .#@@G: .            .#&7.                    
              .^:#@@P   ^         ^B::.B@G:.                .B&!.                   
             .G^  7B?J. &5       7@@B&#@5                    .#~                    
            .P&    . :PY@@B.    5@@!.^.P.     ..            .7&B                    
            :&Y      .:!#P@&~  PB^~    .   :^?J.             .#@^                   
             P^      !? : J&&:JB      ^?   P@5.               .&#.                  
            !#       ^&....~?&&.    . PP  .&B.                 !@B:                 
            #@7.    ^J@&&B. .&?     PP@J..GP~.                  #@Y.                
            5&B     .#@@@@G  :.    .&@&B~5^                     Y@Y:                
             ^&.     .G@@@@~ .   :P#@@@&57                      Y&.                 
         ...  #B.     .#@@@&B^   ^@@@@@JB.                      #B                  
     .^7~:.   ~@#?.    ^@@@@@:   ~@@@@B^&                    .YJ@~                  
   .?&B.       ?#@~.    P@@@@!   7@@@@~^@^                   ^@@G                   
  ~&@B^         :&@G    ^@@@@J   P@@@& .&&^?                 G@#.                   
 :&#^            ^5B5    #@@@B   #@@@5  J@@@5.              5@#.                    
 JB.                ?Y.  5@@@@^ .&@@@!  .P#@@&?:.         ^#@@^                     
.&~                  :7: 7@@@@7 ~@@@@^     ~P&@@&#P!.   ^G@#??.                     
Y@.             .   !: . ~@@@@? P@@@@.    .^!?~^~^:. .!5&B~                         
G@..     ~BJ. .Y&:.J?    J@@@@&:&@@@@7   :&@@@&&&P..:^:^:                           
7@#Y    J@Y?&BP.?P&#    J@@@@@@#@@@@@@Y  !@@@@@@@@^                                 
 5@? .G?B7. :PP  :P&^   #@@@@@@&@@@@@@B   ^~JBG?~:                                  
  JP .@#.          :P~  .7B&&#Y:?P#&#J.                                             
  .G! B#             7J^           .                                                
   .PY~#!             .?5!.                                                         
     ?##@J. ..          .?B!                                                        
      .?B@&J?B?.          :&P.                                                      
         .^::?BBP?^...  .. ?&:                                                      
               .:~777???Y&PY@P                                                      
                       .:7^7B@~                                                     
                             7Y                                                     
Credit Naddiya from istockphoto (tinyurl.com/yvawuyvj)`

const ROCK_1 = `    .^!?J?7~. 
   J#@@@@@@@&G?^  
 :P@@@@@@@@@@@@@P.
 P@@@@@@@@@@@@@@@G
^&@@@@@@@@@@@@@@@&.
5@@@@@@@@@@@@@@@@!
P@@@@@@@@@@#&@@@J`
const ROCK_2 = `  :JY?5G#BPJ~  
 !#@@@@@@@@@@BY~  
 B@@@@@@@@@@@@@@P. 
 ~@@@@@@@@@@@@@@@#:
 :&@@@@@@@@@@@@@@@J
 :@@@@@@@@@@@@@@@@!
 ?@@@@@@@@@@@@@#G? 
.#@@@@@@@@@@BY~. 
 7B&@@@@@@G7.  `
 const ROCK_3 = `    .::~!!^.   
 ^5PB&&@@@&#P^ 
!@@@@@@@@@@@@#.
B@@@@@@@@@@@@@!
7@@@@@@@@@@@@@Y
 !&@@@@@@@@@@#:
  !@@@@@@@&P!. 
   75GBGY!.  `

const TOWER = `
                ......                                            
           .^!77?`+ansi_red+`?7?7?7`+ansi_reset+`!~^:                                       
          ^JYJ`+ansi_red+`??7777777?`+ansi_reset+`JJJ?^                                     
         .???`+ansi_red+`?777?JJ????7`+ansi_reset+`77?J.                                    
         .7YJ7`+ansi_red+`7?7JYYY7777`+ansi_reset+`JY??:                                    
          75Y?YYY`+ansi_red+`?????Y`+ansi_reset+`YJJ5Y~                                     
         .??7JYJJ?777JJ5Y7?J^                                     
        .^J??JYJJJ???JJYJ??Y:                                     
      .!???7!7?77?77?!777??J7~:.                                  
      ~YJ77?J!JY^JJ~YY^JJ!?!7??7.                                 
      :5JJ7JJ~JJ^J?^J?:JY^YY7Y5~                                  
      ^JJ?7J?~J?^JJ~Y?^Y?^Y?!5J.                                  
      !YYY?YJ7JJ?JJ?YJ7Y?757JY?.                                  
     ^JJ?JJ????7??????????J?YY7                                   
     :J????J~J?^J?^J?~JJ7Y???J?.                                  
     :?7?7?J!J?^JJ~J?~JJ!J!?Y7^                                   
     ~J?YJJJJJJ?JJJYJJYYJJ7JY!:                                   
    :?JJ????7??!!?J7J?7??JJJJ?^                                   
    .??!J77J~??^!J7~J?^J7!J?YJ^                                   
    :!7!J7??~??:7J~!J7~J7!J!J?                                    
    ^7?7J?JJ?YJ!JY7?J7?Y7JY7J7                                    
   .?JJ????????????J?JJJJJYJJ7                                    
   .?J!??!??~??^??^?7!??7?7?J?.                                   
   :??!77!7?!J7~??:J?~??~?7~J^                                    
   ~???????J?J?!??^J?~J?~J7~?:                                    
  ^JJJ??J?JJJJJJJJ?JJ?YJ7J?7?.                                    
  .7?!??!?J!??!7J???JJJJJJJJJ^                                    
  .77^J7^??:??:!J~!??^J?~???J^                                    
  ^77^J7~??^J?:7J~7?!^J7^J!7?                                     
 :???7JJ?JJ?JJ7JJ?JJ77J?7Y!J7                                     
 .J?77?7?7??7??7???7????JJJY?:                                    
 .J7~J!:??^??~~JJ^??~??7?7??J:                                    
 ^J!!J!^??^JJ^~JJ:J?^??^?J!Y!                                     
:7J77J?!JJ~JJ~7J?:JJ^??~JJ!Y~                                     
~JJJJ?JJJJJYYJJJJJYY?YY?YY?Y~                                     
^J?JJ??J?7?7???7???J????JJJY7                                     
7YJ7?Y7?75?7------Y75?Y?JJJ?:                                     
.?J?^!J~^~Y!|    |!!~Y77!5??J:                                     
:?J?^!J~^!Y!|    |^^^Y!^^Y7!?:                                     
^?Y?^7J~^!Y|    `+ansi_red+`*`+ansi_reset+`|^^~Y!^^Y77?.                                     
!?Y?^7J~^7JL____|^^^~Y!^^577?.                                     
~7??!??7!??7!!7??7!77J?!7J??7.                                     
   .................... ....    `




// https://coolaj86.com/articles/how-to-clear-nodes-repl.html
function clear() {
  process.stdout.write('\u001B[2J\u001B[0;0f');
}

async function PressAnyKey(){
  let startTime = Date.now();

  process.stdout.write("Press any key to continue. ")
  process.stdin.setRawMode( true );
  process.stdin.setEncoding( 'utf8' );
  process.stdin.resume();

  let running = true;
  process.stdin.on('data', function(key) {
    if (key && Date.now()-startTime > 100)
      running = false;
  });
  while (running) {
    await setTimeoutPromise(50);
  }
  process.stdin.setRawMode( false );
  process.stdin.pause();
  console.log()
}


function options_prompt(question, valid_options) {
  while (true) {
    let answer = prompt(question).toLowerCase().trim();
    if (valid_options.includes(answer))
      return answer

  }
}
function length_prompt(question, min) {
  while (true) {
    let answer = prompt(question).trim();
    if (answer.length >= min)
      return answer
  }
}
function number_prompt(question) {
  while (true) {
    let answer = prompt(question).trim();
    try{
      return answer*1;
    }catch(e){}
  }
}

function get_name() {
  while (true) {
    let name = length_prompt("Welcome adventurer, please state your name: ", 1)
    if ("y" == options_prompt("You have entered \"" + name + "\" is this correct (y/n): ", ["y", "n"]))
      return name;
  }
}







function name_of_wagon(wagon) {
  if (wagon == -1)
    return "none"
  else if (wagon == 0)
    return "Broken Wagon"
  else if (wagon == 1)
    return "Children's Wagon"
  else if (wagon == 2)
    return "Acceptible Wagon"
  else if (wagon == 3)
    return "Average Wagon"
  else if (wagon == 4)
    return "Advanced Wagon"
  else if (wagon == 5)
    return ansi_yellow+"Armored Wagon" + ansi_reset
  else if (wagon == 6)
    return ansi_purple+"Wagon of destiny" + ansi_reset
  else if (wagon == 7)
    return ansi_yellow+ansi_yellow_bg+"Chariot of the Gods"+ ansi_reset
}
function name_of_sword(sword) {
  if (sword == -1)
    return "none"
  else if (sword == 0)
    return "Broken Sword"
  else if (sword == 1)
    return "Weak Sword"
  else if (sword == 2)
    return "Acceptible Sword"
  else if (sword == 3)
    return "Average Sword"
  else if (sword == 4)
    return "Advanced Sword"
  else if (sword == 5)
    return ansi_yellow+"Master Sword" + ansi_reset
  else if (sword == 6)
    return ansi_purple+"Legendary Sword" + ansi_reset
  else if (sword == 7)
    return ansi_yellow+ansi_yellow_bg+"Sword Of The Gods"+ ansi_reset
  else if (sword == 8)
    return ansi_yellow_bg+"Sword Of The "+ansi_red+"Temple"+ansi_reset
}
function name_of_shovel(shovel) {
  if (shovel == -1)
    return "none"
  else if (shovel == 0)
    return "Broken Shovel"
  else if (shovel == 1)
    return "Flimsy Shovel"
  else if (shovel == 2)
    return "Acceptible Shovel"
  else if (shovel == 3)
    return "Average Shovel"
  else if (shovel == 4)
    return "Advanced Shovel"
  else if (shovel == 5)
    return ansi_yellow+"Hill scraper" + ansi_reset
  else if (shovel == 6)
    return ansi_purple+"Mountain slayer" + ansi_reset
  else if (shovel == 7)
    return ansi_yellow+ansi_yellow_bg+"World Clearer"+ ansi_reset
}

function chance(percent){
  return Math.random() <= (percent/100)
}

 const BIG_WELCOME =`
 █ █ █▀▀ █   █▀▀ █▀█ █▄█ █▀▀
 █▄█ █▀▀ █   █   █ █ █ █ █▀▀
 ▀ ▀ ▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀ ▀ ▀ ▀▀▀ `+ansi_yellow+`
 ▀█▀ █▀█
  █  █ █
  ▀  ▀▀▀ `+ansi_dark_purple+`
 █▀▀ █▀█ █   ▀█▀ █▀▀ █▀█ █▀▄ █▀█ ▀█▀ █▀█  
 █   █▀█ █    █  █▀▀ █ █ █▀▄ █ █  █  █▀█  
 ▀▀▀ ▀ ▀ ▀▀▀ ▀▀▀ ▀   ▀▀▀ ▀ ▀ ▀ ▀ ▀▀▀ ▀ ▀  
 ` + ansi_reset
module.exports = {
  DEAD_GUY, TEMPLE, DEMON, DEMON_FIGHT_FRAMES, DEMON_HURT_FRAMES,
  BIG_WIN, ansi_green, BIG_CURE, typewriter, BIG_DAY,
  STATUE, SWORD, number_prompt,
  HURT_BEAR_FRAMES,
  BEAR_FIGHT_FRAMES,
  SNAKE_FIGHT_FRAMES, blue_cyan_backdrop, MAN_FIGHT_FRAMES, MAN_HURT_FRAMES, SNAKE_FIGHT,
  SNAKE_HURT_FRAMES, BIG_SPLAT,
  BIG_BEAR, BIG_CONFUSION,
  BIG_NAME, WIZZARD_FIGHT_FRAMES, WIZZARD_HURT_FRAMES,
  BIG_SHOP_TEXT, CANYON_WALL, BIG_WELCOME,
  BIG_START,
  BIG_SNAKE, BIG_TORNADO,
  BIG_COWARD, ROCK_1, ROCK_2, ROCK_3,
  BIG_DEAD,
  BIG_1, BIG_SWING, BIG_CRACK,
  BIG_2,
  BIG_3,FOX,
  clear,
  chance,
  options_prompt,
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
  PressAnyKey,
  name_of_shovel,
  BIG_HOURS, TOWER,
  BIG_THAT, BIG_SUNLIGHT,
  BIG_NIGHT,
  BIG_LATER, ansi_cyan_bg
};