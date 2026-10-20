import fs from "fs";
import path from "path";
import sharp from "sharp";

async function processImages() {
  const rootDir = process.cwd();
  const mangoDir = path.join(rootDir, "public", "images", "mango");
  const chocDir = path.join(rootDir, "public", "images", "chocolate");
  const pomDir = path.join(rootDir, "public", "images", "pomegranate");

  fs.mkdirSync(mangoDir, { recursive: true });
  fs.mkdirSync(chocDir, { recursive: true });
  fs.mkdirSync(pomDir, { recursive: true });

  console.log("Reading ezgif frames from root...");
  const frameFiles = fs
    .readdirSync(rootDir)
    .filter((f) => f.startsWith("ezgif-frame-") && f.endsWith(".jpg"))
    .sort();

  console.log(`Found ${frameFiles.length} frames.`);

  // Restore the full original sequence starting from Frame 1 (swirls & eruption)
  const startFrame = 0;
  const endFrame = frameFiles.length - 1; // 239

  console.log(`Mapping 120 frames across full original sequence (0 to ${endFrame})...`);

  for (let i = 1; i <= 120; i++) {
    const fraction = (i - 1) / (120 - 1);
    const sourceIndex = Math.min(
      Math.round(startFrame + fraction * (endFrame - startFrame)),
      endFrame
    );
    const sourceFile = path.join(rootDir, frameFiles[sourceIndex]);

    const targetWebp = path.join(mangoDir, `${i}.webp`);
    const targetJpg = path.join(mangoDir, `${i}.jpg`);

    try {
      await sharp(sourceFile)
        .resize(1920, 1080, {
          kernel: sharp.kernel.lanczos3,
          fit: "contain",
          background: { r: 216, g: 112, b: 23, alpha: 1 },
        })
        .webp({ quality: 92, effort: 4 })
        .toFile(targetWebp);

      await sharp(sourceFile)
        .resize(1920, 1080, {
          kernel: sharp.kernel.lanczos3,
          fit: "contain",
          background: { r: 216, g: 112, b: 23, alpha: 1 },
        })
        .jpeg({ quality: 90 })
        .toFile(targetJpg);
    } catch (err) {
      fs.copyFileSync(sourceFile, targetWebp);
      fs.copyFileSync(sourceFile, targetJpg);
    }

    if (i % 20 === 0 || i === 120) {
      console.log(`Processed 1080p full sequence frame ${i}/120 (source frame ${sourceIndex})`);
    }
  }

  // Chocolate & Pomegranate
  console.log("Generating chocolate and pomegranate full sequence...");
  for (let i = 1; i <= 120; i++) {
    const fraction = (i - 1) / (120 - 1);
    const sourceIndex = Math.min(
      Math.round(startFrame + fraction * (endFrame - startFrame)),
      endFrame
    );
    const sourceFile = path.join(rootDir, frameFiles[sourceIndex]);

    const chocWebp = path.join(chocDir, `${i}.webp`);
    const chocJpg = path.join(chocDir, `${i}.jpg`);
    const pomWebp = path.join(pomDir, `${i}.webp`);
    const pomJpg = path.join(pomDir, `${i}.jpg`);

    try {
      await sharp(sourceFile)
        .resize(1920, 1080, { kernel: sharp.kernel.lanczos3, fit: "contain" })
        .modulate({ saturation: 0.65, brightness: 0.88 })
        .tint({ r: 141, g: 110, b: 99 })
        .webp({ quality: 88 })
        .toFile(chocWebp);
      fs.copyFileSync(chocWebp, chocJpg);

      await sharp(sourceFile)
        .resize(1920, 1080, { kernel: sharp.kernel.lanczos3, fit: "contain" })
        .modulate({ hue: -35, saturation: 1.25 })
        .tint({ r: 215, g: 60, b: 80 })
        .webp({ quality: 88 })
        .toFile(pomWebp);
      fs.copyFileSync(pomWebp, pomJpg);
    } catch {
      fs.copyFileSync(sourceFile, chocWebp);
      fs.copyFileSync(sourceFile, chocJpg);
      fs.copyFileSync(sourceFile, pomWebp);
      fs.copyFileSync(sourceFile, pomJpg);
    }
  }

  console.log("Full original sequence restored in 1080p Lanczos3 quality!");
}

processImages().catch(console.error);
