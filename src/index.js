#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { generate, generateMultiple } = require('generate-passphrase')
//const { validateNumberOrString  } = require('./helper')

const nowPath = path.join(process.cwd(), 'now.json');
const existingConfig = fs.existsSync(nowPath);
//const existingConfig = false;

async function buildConfig() {
  let config = {
    version: 2,
  };
  let passphrase,answerMulitple;
  const answers = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'type',
        message: 'What Type Generate Passprashe',
        choices: [
          'generatePassphrase',
          'generateMultiplePassphrase',
          'generatePassphraseOptions',
          'generateMultiplePassphraseOptions',
        ],
      },
    ]);
  config.date = Date.now();
  switch (answers.type) {
    case 'generatePassphrase':
      console.clear()
      passphrase = generate()
      console.log(passphrase)
      break;
    case 'generateMultiplePassphrase':
      answerMulitple = await inquirer
        .prompt([
         {
           type: 'number',
           name: 'numberMultiple',
           message: 'What is Multiple Generate Passphrase',
           default: 1 
         } 
        ])
      console.clear()
      passphrase = generateMultiple(answerMulitple.numberMultiple)
      console.log(passphrase)
      break;
    case 'generatePassphraseOptions':
      answerMulitple = await inquirer
        .prompt([
         {
           type: 'number',
           name: 'numberLength',
           message: 'How Much length',
           default: 4,
         },
         {
           type: 'text',
           name: 'str',
           message: 'Separator',
           default: '-',
         },
         {
           type: 'confirm',
           name: 'typeTitle',
           message: 'Do you want titlecase',
           default: false,
         }, 
         {
           type: 'confirm',
           name: 'typeNumbers',
           message: 'Do you want numbers',
           default: true,
         }, 
         {
           type: 'confirm',
           name: 'typeUppercase',
           message: 'Do you want uppercase',
           default: false,
         }, 
         {
           type: 'text',
           name: 'typePattern',
           message: 'Do you want pattern',
           default: null,
         } 
        ])
      console.clear()
      passphrase = generate({ numbers:answerMulitple.typeNumbers, uppercase: answerMulitple.typeUppercase, pattern: answerMulitple.typePattern, length: answerMulitple.numberLength, separator: answerMulitple.str, titlecase: answerMulitple.typeTitle})
      console.log(passphrase)
      break;
    case 'generateMultiplePassphraseOptions':
      answerMulitple = await inquirer
        .prompt([
         {
           type: 'number',
           name: 'numberIs',
           message: 'How Much Generate Passphrase',
           default: 1
         },
         {
           type: 'number',
           name: 'numberLength',
           message: 'How Much length',
           default: 4
         },
         {
           type: 'text',
           name: 'str',
           message: 'Separator',
           default: '-'
         },
         {
           type: 'confirm',
           name: 'typeTitle',
           message: 'Do you want titlecase',
           default: false,
         }, 
         {
           type: 'confirm',
           name: 'typeNumbers',
           message: 'Do you want numbers',
           default: true,
         }, 
         {
           type: 'confirm',
           name: 'typeUppercase',
           message: 'Do you want uppercase',
           default: false,
         }, 
         {
           type: 'text',
           name: 'typePattern',
           message: 'Do you want pattern',
           default: null,
         } 
        ])
      console.clear()
      passphrase = generateMultiple(answerMulitple.numberIs,{ length: answerMulitple.numberLength, separator: answerMulitple.str, titlecase: answerMulitple.typeTitle})
      console.log(passphrase)
      break;
    default:
      break;
  }
  config.passphrase = passphrase;
  fs.writeFileSync(nowPath, JSON.stringify(config, null, 2), 'utf8');
  process.exit(0);
}

if (existingConfig) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: '🚫🚨 now.json already exists! Would you like to overwrite it? 🚨🚫',
        default: false,
      },
    ])
    .then((answers) => {
      if (answers.overwrite) {
        buildConfig();
      } else {
        console.log('Goodbye! 👋');
      }
    });
} else {
  buildConfig();
}
