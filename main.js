
const fights = [
  {
    name: "เสกสรร vs เมืองไทย",
    fighterA: {
      name: "เสกสรร",
      scores: { form: 10, ko: 4, style: 5, matchup: 7, odds: 5, risk: 5 }
    },
    fighterB: {
      name: "เมืองไทย",
      scores: { form: 8, ko: 7, style: 5, matchup: 7, odds: 5, risk: 5 }
    }
  }
];

function populateFights() {
  const select = document.getElementById("fightSelect");
  fights.forEach((fight, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = fight.name;
    select.appendChild(opt);
  });
}

function analyzeFight() {
  const index = document.getElementById("fightSelect").value;
  const fight = fights[index];
  const weights = { form: 0.2, ko: 0.15, style: 0.2, matchup: 0.25, odds: 0.1, risk: 0.1 };

  function calcTotal(s) {
    return Object.entries(s).reduce((sum, [k, v]) => sum + v * weights[k], 0);
  }

  const totalA = calcTotal(fight.fighterA.scores);
  const totalB = calcTotal(fight.fighterB.scores);
  const winRateA = ((totalA / (totalA + totalB)) * 100).toFixed(2);
  const winRateB = (100 - winRateA).toFixed(2);

  const result = `
    <h2>${fight.name}</h2>
    <p>${fight.fighterA.name}: ${winRateA}%<br>
    ${fight.fighterB.name}: ${winRateB}%</p>
    <p>📢 เซียนน้อยว่า: ผลนี้คำนวณตามสูตรลับที่ไม่มีใครลอกได้!</p>
  `;

  document.getElementById("resultContainer").innerHTML = result;
}

window.onload = populateFights;
