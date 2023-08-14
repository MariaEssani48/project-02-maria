#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from "chalk";


type accountType = {
    name: string,
    pin: number,
    balance: number
};
let account_A: accountType = {
    name: "Ryan",
    pin: 1235,
    balance: 40000
};
// a sleep function
const sleep1 = () => {
    return new Promise((r) =>
     {setTimeout(r,2000)});
};
const sleep2 = () => {
    return new Promise((r) =>
     {setTimeout(r,1000)});
};
console.log(chalk.bgGray(chalk.red("BANK ATM"))); 
await sleep1();
    


//to perform basic *ATM TRANSACTIONS*
async function transaction(tbalance: number){
    const transType =  await inquirer.prompt([    
        {
            message: "Your transaction type is:",
            type:  "list",
            choices: ["Cash-Withdrawal", "Fast Cash", "Balance Inquiry"],
            name: "transaction"
        }
    ])
    console.log("\n");
    if(transType.transaction == "Cash-Withdrawal"){
            await sleep2();
            const amount = await inquirer.prompt([
                {
                    message: "Type your Amount:",
                    type:  "number",
                    name: "userAmount"
                }
            ])
            
            if(amount.userAmount > tbalance){
            console.log(chalk.yellow(`Your available balance is ${tbalance}`));
            }
            else {
             console.log(`Ok! your cash amount is here: ${chalk.blue(amount.userAmount)}`);
             tbalance = tbalance - amount.userAmount;
             console.log(chalk.yellow(`Your available balance is: ${tbalance}`));
            }
            }
   
    else if(transType.transaction == "Fast Cash"){
            await sleep2();
            const amount =  await inquirer.prompt([    
        {
                    message: "What amount you want to withdraw:",
                    type:  "list",
                    name: "userAmount",
                    choices: ["1000", "5000","10000", "20000", "25000"]
                    
        }
        ])  
            console.log(`Ok! your cash amount is here: ${chalk.blue(amount.userAmount)}`);
            tbalance = tbalance - amount.userAmount;
            console.log(chalk.yellow(`Your available balance is: ${tbalance}`));
         }
    else if(transType.transaction == "Balance Inquiry"){
        await sleep2();
        console.log(chalk.yellow(`Your available balance is: ${tbalance}`));
    }
return tbalance;
}  

//function to start the process of transaction recursively
async function process(proAccount:accountType){
    do{
    proAccount.balance = await transaction(proAccount.balance)
    await sleep1();
    console.log("\n");
    var reStart = await inquirer.prompt([
      {
        type: "list",
        name: "moreProcess",
        message: "Do you want to process more transactions?",
        choices:["Yes", "No"]
      },
      
    ])
  }
  while(reStart.moreProcess == "Yes");
}
// to take user input, i.e account details
const answer = await inquirer.prompt([
    {
        message: "Enter pin",
        name: "pin",
        type: "number"
    },
])

await sleep2();
if(answer.pin == account_A.pin){
       process(account_A);
}
    else{
        console.log("You entered an invalid pin");
    }


   
