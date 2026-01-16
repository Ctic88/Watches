export const removeWhiteBackground = (imageSrc, threshold = 240) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageSrc;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(img, 0, 0);

            try {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];

                    // Heuristic: if pixel is close to white
                    if (r > threshold && g > threshold && b > threshold) {
                        data[i + 3] = 0; // Set alpha to 0 (transparent)
                    }
                }

                ctx.putImageData(imageData, 0, 0);
                resolve(canvas.toDataURL());
            } catch (err) {
                console.error("Error processing image (likely CORS):", err);
                resolve(imageSrc); // Fallback to original if processing fails
            }
        };

        img.onerror = (err) => {
            console.error("Error loading image:", err);
            reject(err);
        };
    });
};
