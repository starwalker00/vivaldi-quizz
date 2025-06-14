const { writeFileSync, readdirSync } = require("fs");
const { join } = require("path");

// Dossier des fichiers audio
const audioDir = join(__dirname, "../public/audio");

// Traduction anglais → français
const traduction = {
    spring: "Printemps",
    summer: "Été",
    autumn: "Automne",
    winter: "Hiver",
};

const files = readdirSync(audioDir).filter((file) => file.endsWith(".mp3"));

const data = files
    .map((file) => {
        const match = file.match(/Vivaldi_(Spring|Summer|Autumn|Winter)_/i);
        if (!match) {
            console.warn(`⚠️ Fichier ignoré (format invalide) : ${file}`);
            return null;
        }

        const saisonEn = match[1].toLowerCase();
        const saisonFr = traduction[saisonEn];

        return {
            fichier: `/audio/${file}`,
            saison: saisonFr,
        };
    })
    .filter(Boolean);

const content = `// 🛑 Fichier généré automatiquement. Ne pas modifier manuellement.
export const pieces = ${JSON.stringify(data, null, 2)};
`;

writeFileSync(join(__dirname, "../app/lib/data.ts"), content);
console.log("✅ Fichier app/lib/data.ts généré avec succès !");
