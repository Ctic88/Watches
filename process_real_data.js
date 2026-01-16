
import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('src/data/raw_watches.json', 'utf8'));

// Helper to normalize brand
const normalizeBrand = (brand) => {
    if (!brand) return 'Unknown';
    // Title case
    return brand.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
};

const descriptions = [
    "A masterpiece of engineering and design, offering unparalleled precision.",
    "The definition of luxury and performance, crafted for the modern explorer.",
    "An icon of horology, blending tradition with avant-garde innovation.",
    "Elegant, sophisticated, and timeless. A perfect companion for any occasion.",
    "Robust yet refined, designed to withstand the toughest conditions.",
    "Minimalist design meets maximum impact. A true statement piece.",
    "Celebrating heritage with a modern twist. The ultimate mechanical achievement.",
    "Precision chronometer certified, ensuring accurate timekeeping in all environments.",
    "Exquisite craftsmanship visible in every detail of the dial and movement.",
    "A symbol of status and taste, recognized around the world."
];

let id = 1;
const watches = rawData.map(item => {
    const brand = normalizeBrand(item.brand);
    // Clean model name (remove brand from it if present)
    let model = item.model;
    const modelLower = model.toLowerCase();
    const brandLower = brand.toLowerCase();

    // Attempt to remove brand name from model start
    if (modelLower.startsWith(brandLower)) {
        model = model.slice(brand.length).trim();
    }

    // Remove "Mens Watch" or similar noise
    model = model.replace(/Men's Watch/i, '').replace(/Watch/i, '').trim();
    // Remove random trailing junk if it looks like a ref number at the end, maybe keep it.
    // Actually, Jomashop models often include the reference, which is good.

    return {
        id: id++,
        brand: brand,
        model: model,
        price: item.price,
        image: item.image,
        description: descriptions[Math.floor(Math.random() * descriptions.length)] + ` The ${brand} ${model} features exceptional build quality.`,
        youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(brand + ' ' + model + ' review')}`
    };
});

fs.writeFileSync('src/data/watches.json', JSON.stringify(watches, null, 2));
console.log(`Processed ${watches.length} watches.`);
