// player, enemy - arrays
export function fightEnemy(player, enemy) {
	let pHealth = player[3],
			eHealth = enemy[3];
	const pDamage = player[4],
				eDamage = enemy[4];
	const turn = getRandomInt(0,1);

	while (pHealth > 10 && eHealth > 10) {
		if (turn === 0){
			eHealth -= pDamage;
			pHealth -= eDamage;
		} else {
			pHealth -= eDamage;
			eHealth -= pDamage;
		}
	}
	return [pHealth, eHealth];
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}


//updates player level
export function getLevel(score) {
	let level = 0;
	let levelUpgarade = 20-score;
	if (score >= 20 && score < 45) {level = 1; levelUpgarade = 45-score;}
	if (score >= 45 && score < 80) { level = 2; levelUpgarade = 80-score;}
	if (score >= 80 && score < 125) { level = 3; levelUpgarade = 125-score;}
	if (score >= 125 && score < 175) { level = 4; levelUpgarade = 175-score;}
	if (score >= 175 && score < 250) { level = 5; levelUpgarade = 250-score;}
	if (score >= 250 && score < 325) { level = 6; levelUpgarade = 325-score;}
	if (score >= 325 && score < 400) { level = 7; levelUpgarade = 400-score;}
	if (score >= 400 && score < 475) { level = 8; levelUpgarade = 475-score;}
	if (score >= 475) {level = 9; levelUpgarade = 0};
	return [level, levelUpgarade];
}
