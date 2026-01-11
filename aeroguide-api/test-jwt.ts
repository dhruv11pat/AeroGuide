
import * as jwtStar from 'jsonwebtoken';
import jwtDefault from 'jsonwebtoken';
import { sign } from 'jsonwebtoken';

console.log('Star import keys:', Object.keys(jwtStar));
console.log('Default import keys:', jwtDefault ? Object.keys(jwtDefault) : 'null');
console.log('Named import sign:', typeof sign);
