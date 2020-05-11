import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    let comboFirstPlayer = new Set();
    let comboSecondPlayer = new Set();
    const leftPlayerState = {
      isBlock:false,
      canDamageCritical:true,
      originalHealth:firstFighter.health
    };
    const rightPlayerState = {
      isBlock:false,
      canDamageCritical:true,
      originalHealth:secondFighter.health
    };
    document.addEventListener("keyup", (event)=>{
      if(firstFighter.health<=0){
        resolve(secondFighter);
      }
      if(secondFighter.health<=0){
        resolve(firstFighter);
      }
      let damage;
      switch (event.code) {
        case controls.PlayerOneAttack:
          if(leftPlayerState.isBlock){
            break;
          }
          damage = rightPlayerState.isBlock?0:getDamage(firstFighter, secondFighter);
          leftPlayerState.isAttack = true;
          secondFighter.health -= damage;
          if(secondFighter.health<=0){
            resolve(firstFighter);
          }
          secondFighter.health = secondFighter.health<=0?0:secondFighter.health;
          break;
        case controls.PlayerTwoAttack:
          if(rightPlayerState.isBlock){
            break;
          }
          damage = leftPlayerState.isBlock?0:getDamage(secondFighter, firstFighter);
          leftPlayerState.isAttack = true;
          firstFighter.health -= damage;
          if(firstFighter.health<=0){
            resolve(secondFighter);
          }
          firstFighter.health = firstFighter.health<=0?0:firstFighter.health;
          break;
        case controls.PlayerOneBlock:
          leftPlayerState.isBlock = false;
          break;
        case controls.PlayerTwoBlock:
          rightPlayerState.isBlock = false;
          break;
      }
      changeHealth("left",firstFighter, leftPlayerState);
      changeHealth("right",secondFighter, rightPlayerState);
    });
    document.addEventListener("keydown", (event)=>{
      if(firstFighter.health<=0){
        resolve(secondFighter);
      }
      if(secondFighter.health<=0){
        resolve(firstFighter);
      }
      if(event.code===controls.PlayerOneCriticalHitCombination[0]&&leftPlayerState.canDamageCritical){
        comboFirstPlayer.clear();
        comboFirstPlayer.add(event.code)
      }
      if(event.code===controls.PlayerOneCriticalHitCombination[1]){
        if (comboFirstPlayer.has(controls.PlayerOneCriticalHitCombination[0])){
          comboFirstPlayer.add(event.code)
        }else {
          comboFirstPlayer.clear();
        }
      }
      if(event.code===controls.PlayerOneCriticalHitCombination[2]){
        if (comboFirstPlayer.has(controls.PlayerOneCriticalHitCombination[1])){
          secondFighter.health -= firstFighter.attack*2;
          secondFighter.health = secondFighter.health<=0?0:secondFighter.health;
          leftPlayerState.canDamageCritical = false;
          if(secondFighter.health<=0){
            resolve(firstFighter);
          }
          setTimeout(()=>{
            leftPlayerState.canDamageCritical = true
          }, 10000);
        }
        comboFirstPlayer.clear();
      }
      if(event.code===controls.PlayerTwoCriticalHitCombination[0]&&rightPlayerState.canDamageCritical){
        comboSecondPlayer.clear();
        comboSecondPlayer.add(event.code)
      }
      if(event.code===controls.PlayerTwoCriticalHitCombination[1]){
        if (comboSecondPlayer.has(controls.PlayerTwoCriticalHitCombination[0])){
          comboSecondPlayer.add(event.code)
        }else {
          comboSecondPlayer.clear();
        }
      }
      if(event.code===controls.PlayerTwoCriticalHitCombination[2]){
        if (comboSecondPlayer.has(controls.PlayerTwoCriticalHitCombination[1])){
          firstFighter.health -= secondFighter.attack*2;
          firstFighter.health = firstFighter.health<=0?0:firstFighter.health;
          rightPlayerState.canDamageCritical = false;
          if(firstFighter.health<=0){
            resolve(secondFighter);
          }
          setTimeout(()=>{
            rightPlayerState.canDamageCritical = true
          }, 10000);
        }
        comboSecondPlayer.clear();
      }
      switch (event.code) {
        case controls.PlayerOneBlock:
          comboFirstPlayer.clear();
          if(leftPlayerState.isBlock){
            break;
          }
          leftPlayerState.isBlock = true;
          break;
        case controls.PlayerTwoBlock:
          comboSecondPlayer.clear();
          if(rightPlayerState.isBlock){
            break;
          }
          rightPlayerState.isBlock = true;
          break;
        case controls.PlayerTwoAttack:
          comboSecondPlayer.clear();
          break;
        case controls.PlayerOneAttack:
          comboFirstPlayer.clear();
          break;
      }
      changeHealth("left",firstFighter, leftPlayerState);
      changeHealth("right",secondFighter, rightPlayerState);
    });
  });
}

export function getDamage(attacker, defender) {
  let dmg = getHitPower(attacker)-getBlockPower(defender);
  dmg = dmg<=0?0:dmg;
  return dmg;
}

export function getHitPower(fighter) {
  return fighter.attack*getRandomInt();
}

export function getBlockPower(fighter) {
  return fighter.defense*getRandomInt();
}

function getRandomInt() {
  return Math.random()+1;
}

function changeHealth(where,{health}, {originalHealth}) {
  document.getElementById(`${where}-fighter-indicator`).style.width = `${health*100/originalHealth}%`
}

