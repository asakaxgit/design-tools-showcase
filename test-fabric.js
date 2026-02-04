const fabric = require('fabric');
console.log('fabric namespace:', Object.keys(fabric).slice(0, 20));
console.log('Has Canvas?', typeof fabric.Canvas);
console.log('Has Rect?', typeof fabric.Rect);
console.log('Has Circle?', typeof fabric.Circle);
console.log('Has Text?', typeof fabric.Text);
console.log('Has Polygon?', typeof fabric.Polygon);
console.log('Has Shadow?', typeof fabric.Shadow);
