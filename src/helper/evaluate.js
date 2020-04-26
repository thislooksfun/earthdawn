import { evaluate as meval } from "mathjs";

const get = require("lodash/get");

export default function evaluate(expr, dChar) {
  const ctx = {
    dex: dChar.attrs.dex.step,
    wil: dChar.attrs.wil.step,

    spellRank: get(dChar, "talents.Spellcasting.rank") || 0,
  };

  return meval(expr, ctx);
}

export function evalTemplate(template, dChar) {
  console.log("> Evaluating template", template);
  try {
    return template.replace(/{{(.*?)}}/g, (_, expr) => evaluate(expr, dChar));
  } catch (e) {
    console.log(e);
    return template;
  }
}
