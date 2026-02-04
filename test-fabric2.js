const fabric = require('fabric');
console.log('Text === FabricText?', fabric.Text === fabric.FabricText);
console.log('Text type:', typeof fabric.Text);
console.log('FabricText type:', typeof fabric.FabricText);

// Test if we can create objects
try {
  const canvas = new fabric.Canvas(null);
  console.log('Canvas created:', canvas ? 'yes' : 'no');
} catch(e) {
  console.log('Canvas error:', e.message);
}
