const nf = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const fixed = (value, digits = 2) => Number(value).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const num = (obj, key) => {
  const x = Number(obj[key]);
  if (!Number.isFinite(x)) throw new Error("Please enter a valid number for " + key + ".");
  return x;
};
const nonnegative = (obj, key) => {
  const x = num(obj, key);
  if (x < 0) throw new Error(key + " cannot be negative.");
  return x;
};
const percent = (obj, key) => {
  const x = nonnegative(obj, key);
  if (x > 100) throw new Error(key + " must not exceed 100%.");
  return x;
};
export function calculate(kind, v) {
  let x, y, total;
  switch (kind) {
    case "marketcap":
      total = nonnegative(v, "price") * nonnegative(v, "supply");
      break;
    case "rainwater":
      total = nonnegative(v, "area") * nonnegative(v, "rainfall") * percent(v, "efficiency") / 100;
      break;
    case "solar": {
      const daily = nonnegative(v, "capacity") * nonnegative(v, "sunHours") * percent(v, "performance") / 100;
      if (Number(v.sunHours) > 24) throw new Error("Peak sun hours cannot exceed 24.");
      const monthly = daily * 30 * nonnegative(v, "tariff");
      return { headline: fixed(daily) + " kWh/day", detail: "Estimated value for 30 days: " + fixed(monthly) + " in your entered currency." };
    }
    case "ai":
      total = nonnegative(v, "inputTokens") / 1000000 * nonnegative(v, "inputRate") + nonnegative(v, "outputTokens") / 1000000 * nonnegative(v, "outputRate");
      break;
    case "emi": {
      const principal = nonnegative(v, "principal");
      const annual = nonnegative(v, "annualRate");
      const months = num(v, "months");
      if (!Number.isInteger(months) || months < 1 || months > 1200) throw new Error("Loan term must be between 1 and 1,200 whole months.");
      const r = annual / 1200;
      const factor = Math.pow(1 + r, months);
      const emi = r === 0 ? principal / months : principal * r * factor / (factor - 1);
      if (!Number.isFinite(emi)) throw new Error("This combination of values is too large.");
      return { headline: fixed(emi) + " per month", detail: "Total repayment: " + fixed(emi * months) + " • Interest: " + fixed(emi * months - principal) + ". Values use your local currency." };
    }
    case "oee":
      total = percent(v, "availability") * percent(v, "performance") * percent(v, "quality") / 10000;
      break;
    case "days": {
      function date(key) {
        const s = String(v[key] || "");
        if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) throw new Error("Enter a valid " + key + ".");
        const time = Date.parse(s + "T00:00:00.000Z");
        if (!Number.isFinite(time) || new Date(time).toISOString().slice(0, 10) !== s) throw new Error("Invalid date: " + s);
        return time;
      }
      const d = Math.abs(date("endDate") - date("startDate")) / 86400000;
      return { headline: nf.format(d) + " days", detail: "Absolute calendar-day difference; the start date is excluded." };
    }
    case "bmi": {
      const height = num(v, "height");
      const weight = num(v, "weight");
      if (height <= 0 || weight <= 0) throw new Error("Height and weight must be positive.");
      return { headline: fixed(weight / Math.pow(height / 100, 2), 1) + " BMI", detail: "A screening metric only; not a medical diagnosis." };
    }
    case "gpa": {
      let credits = 0, points = 0;
      for (let i = 1; i <= 3; i++) {
        x = nonnegative(v, "credit" + i);
        y = nonnegative(v, "grade" + i);
        if (y > 4) throw new Error("Grade points must be between 0 and 4.");
        credits += x;
        points += x * y;
      }
      if (credits <= 0) throw new Error("Total credits must be positive.");
      return { headline: fixed(points / credits) + " / 4.00", detail: "Credit-weighted GPA across the three courses." };
    }
    case "trip": {
      const days = num(v, "days");
      if (!Number.isInteger(days) || days < 1) throw new Error("Trip length must be positive whole days.");
      total = days * (nonnegative(v, "daily") + nonnegative(v, "hotel")) + nonnegative(v, "transport") + nonnegative(v, "extras");
      break;
    }
    default: throw new Error("Unknown calculator.");
  }
  if (!Number.isFinite(total)) throw new Error("Result is too large.");
  if (kind === "marketcap") return { headline: fixed(total) + " USD", detail: "Price × circulating supply. Not a live market quote." };
  if (kind === "rainwater") return { headline: nf.format(total) + " liters", detail: "Estimated rainwater from this rainfall event." };
  if (kind === "ai") return { headline: fixed(total) + " USD", detail: "Estimated combined input and output token cost." };
  if (kind === "oee") return { headline: fixed(total) + "% OEE", detail: "Availability × Performance × Quality." };
  return { headline: fixed(total), detail: "Estimated total in the currency used for all inputs." };
}
if (typeof document !== "undefined") {
  for (const form of document.querySelectorAll("form[data-calculator]")) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const result = form.querySelector("[data-result]");
      if (!result) return;
      const fields = {};
      for (const input of form.querySelectorAll("[data-field]")) {
        fields[input.dataset.field] = input.type === "date" ? input.value : Number(input.value);
      }
      try {
        const output = calculate(form.dataset.calculator, fields);
        result.replaceChildren();
        const strong = document.createElement("strong");
        strong.textContent = output.headline;
        const p = document.createElement("p");
        p.textContent = output.detail;
        result.append(strong, p);
        result.dataset.state = "success";
      } catch (error) {
        result.replaceChildren();
        result.textContent = error.message || "Unable to calculate.";
        result.dataset.state = "error";
      }
    });
  }
}