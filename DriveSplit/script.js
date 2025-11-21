const fields = ["distance", "efficiency", "price", "toll", "people"];
const result = document.getElementById("result");

// ページ読み込み時に保存データを復元
window.onload = function() {
  fields.forEach(id => {
    const saved = localStorage.getItem(id);
    if (saved !== null) {
      document.getElementById(id).value = saved;
    }
  });
};

// 入力が変更されたら自動保存
fields.forEach(id => {
  document.getElementById(id).addEventListener("input", () => {
    localStorage.setItem(id, document.getElementById(id).value);
  });
});

function calculate() {
  const d = Number(distance.value);
  const e = Number(efficiency.value);
  const p = Number(price.value);
  const t = Number(toll.value);
  const n = Number(people.value);

  if (d <= 0 || e <= 0 || p <= 0 || n <= 0) {
    result.textContent = "すべて正しく入力してください";
    return;
  }

  const fuel = d / e;
  const fuelCost = fuel * p;
  const total = fuelCost + t;
  const per = Math.ceil(total / n);

  result.innerHTML = `
    総費用：${Math.round(total)} 円<br>
    1人あたり：${per} 円
  `;
}

function resetForm() {
  fields.forEach(id => {
    document.getElementById(id).value = "";
    localStorage.removeItem(id);
  });
  result.textContent = "";
}
