import fs from 'fs';
import { PROVINCE_DETAILS } from './province-details.js';
import { PROVINCE_SHAPES } from './province-shapes.js';

console.log('Merging data...');

const mergedShapes = PROVINCE_SHAPES.map(p => {
  const details = PROVINCE_DETAILS[p.name];
  if (details) {
    return {
      ...p,
      image: details.image,
      detailDesc: details.detailDesc,
      experiences: details.experiences,
      foods: details.foods
    };
  }
  console.warn(`No details found for ${p.name}`);
  return p;
});

const outputContent = `export const PROVINCE_SHAPES = ${JSON.stringify(mergedShapes)};\n`;

fs.writeFileSync('./province-shapes.js', outputContent, 'utf-8');
console.log('Successfully merged details into province-shapes.js');
