import {formatCurrency} from '../scripts/utils/money.js';

//Test cases for formatCurency function

console.log(formatCurrency(2095) === '20.95' ? 'passed' : 'failed'); //basic test cases

console.log(formatCurrency(0) === '0.00' ? 'passed' : 'failed');

console.log(formatCurrency(2000.5) === '20.01' ? 'passed' : 'failed'); //edge case

