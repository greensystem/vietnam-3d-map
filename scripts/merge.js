const fs = require('fs');

try {
  let shapesCode = fs.readFileSync('province-shapes.js', 'utf-8');
  shapesCode = shapesCode.replace('export const PROVINCE_SHAPES = ', 'return ');
  const shapes = new Function(shapesCode)();

  let detailsCode = fs.readFileSync('province-details.js', 'utf-8');
  detailsCode = detailsCode.replace('export const PROVINCE_DETAILS = ', 'return ');
  const details = new Function(detailsCode)();

  const missing = [];

  shapes.forEach(s => {
    let d = details[s.name];
    
    // Check aliases
    if (!d && s.name === 'Hồ Chí Minh') d = details['TP. Hồ Chí Minh'];
    if (!d && s.name === 'Thừa Thiên Huế') d = details['Huế'];
    if (!d && s.name === 'Bà Rịa - Vũng Tàu') d = details['Vũng Tàu'];

    if (d) {
      s.detailDesc = d.detailDesc;
      s.experiences = d.experiences;
      s.foods = d.foods;
    } else {
      missing.push(s.name);
    }
  });

  fs.writeFileSync('province-shapes.js', 'export const PROVINCE_SHAPES = ' + JSON.stringify(shapes) + ';\n');
  console.log('Merge complete. Missing details for:', missing);

} catch (e) {
  console.error(e);
}
