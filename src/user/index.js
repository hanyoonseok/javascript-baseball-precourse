import { GAME_RULE, RESULT_MESSAGE, ALERT_MESSAGE } from '../constants/index.js';
import { $ } from '../utils/index.js';

export default class User {
  constructor() {
    this.number = 0;
    this.strikeNum = 0;
    this.ballNum = 0;
  }
  getNumber() {
    return this.number;
  }
  setNumber(number) {
    this.number = number;
  }
  initUser() {
    this.number = 0;
    this.strikeNum = 0;
    this.ballNum = 0;
  }
  isNumeric(userInput) {
    let i;
    let isValid = true;

    for (i = 0; i < userInput.length; i++) {
      if (isNaN(userInput[i])) {
        isValid = false;
        break;
      }
    }

    return isValid;
  }
  isMatchLength(userInput) {
    return userInput.length === GAME_RULE.numberLength;
  }
  isOutOfRange(userInput) {
    return userInput.includes(0);
  }
  isDuplicated(userInput) {
    const userInputArray = userInput.split('');
    const userInputSet = [...new Set(userInputArray)];

    return !(userInputArray.length === userInputSet.length);
  }
  isUserInputValid() {
    const userInput = $('user-input').value;
    let isValid = false;
    if (!this.isNumeric(userInput)) {
      alert(ALERT_MESSAGE.isNumeric);
    } else if (!this.isMatchLength(userInput)) {
      alert(ALERT_MESSAGE.isMatchLength);
    } else if (this.isOutOfRange(userInput)) {
      alert(ALERT_MESSAGE.isOutOfRange);
    } else if (this.isDuplicated(userInput)) {
      alert(ALERT_MESSAGE.isDuplicated);
    } else {
      isValid = true;
    }

    return isValid;
  }

  // 컴퓨터 난수와 사용자 입력을 비교하여 볼과 스트라이크 개수를 세팅하는 함수
  setBallStrike(computerInputNumbers, userInputNumbers) {
    let i;
    for (i = 0; i < userInputNumbers.length; i += 1) {
      if (
        computerInputNumbers.includes(userInputNumbers[i]) &&
        computerInputNumbers.indexOf(userInputNumbers[i]) === i
      ) {
        this.strikeNum++;
      } else if (computerInputNumbers.includes(userInputNumbers[i])) {
        this.ballNum++;
      }
    }
  }

  // 볼과 스트라이크 개수에 따라 힌트를 생성하는 함수
  makeHint() {
    let resultMessage = '';
    if (this.ballNum > 0) {
      resultMessage += `${this.ballNum}볼 `;
    }
    if (this.strikeNum > 0) {
      resultMessage += `${this.strikeNum}스트라이크`;
    }
    if (this.strikeNum === 3) {
      resultMessage = RESULT_MESSAGE.clear;
    } else if (this.strikeNum === 0 && this.ballNum === 0) {
      resultMessage = RESULT_MESSAGE.nothing;
    }

    return resultMessage;
  }
}
