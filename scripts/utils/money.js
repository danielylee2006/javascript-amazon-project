export function formatCurrency(priceCents) {
    return (priceCents / 100).toFixed(2);
}

export default formatCurrency; //only one default export per file 

/*
Orginal (named export): {} required because you might need to import more than 1
import { formatCurrency } from "./utils/money.js";

Default export: no need for {} because it is the only thing imported (default!)
import formatCurrency from "./utils/money.js";
*/

