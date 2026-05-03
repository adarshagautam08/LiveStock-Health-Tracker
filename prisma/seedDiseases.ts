import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const animalIds = {
  Cow: "cmnh1aygj000090vlhivaea51",
  Buffalo: "cmnijvipb0000dcvlc2z7e98c",
  Goat: "cmnijvy4k0001dcvlxxk5ied5",
  Pig: "cmnijw6yb0002dcvlh0btobih",
  Chicken: "cmnijwmgt0003dcvl7b3odvwt",
};

const diseases = [
  // COW
  {
    name: "Foot and Mouth Disease",
    description: "A highly contagious viral disease causing blisters on mouth, feet and teats.",
    treatment: "Isolate the animal immediately. Clean and disinfect blisters. Call a vet for antiviral treatment. Vaccinate healthy animals.",
    severity: "High",
    animalId: animalIds.Cow,
  },
  {
    name: "Bovine Respiratory Disease",
    description: "A bacterial or viral lung infection common in cold and wet conditions.",
    treatment: "Antibiotics (oxytetracycline), anti-inflammatory drugs, keep animal warm and dry. Call vet if breathing is severely labored.",
    severity: "Medium",
    animalId: animalIds.Cow,
  },
  {
    name: "Hemorrhagic Septicemia",
    description: "A fatal bacterial disease caused by Pasteurella multocida, common in Nepal during monsoon.",
    treatment: "Immediate antibiotics (penicillin or oxytetracycline). Vaccinate healthy animals. Isolate sick animals. Call vet immediately.",
    severity: "High",
    animalId: animalIds.Cow,
  },
  {
    name: "Anthrax",
    description: "A deadly bacterial disease caused by Bacillus anthracis. Can spread to humans.",
    treatment: "No home treatment. Call vet immediately. Do not open carcass. Burn or bury dead animals. Vaccinate surviving animals.",
    severity: "High",
    animalId: animalIds.Cow,
  },
  {
    name: "Mastitis",
    description: "Bacterial infection of the udder causing swelling, pain and abnormal milk.",
    treatment: "Antibiotics (intramammary and systemic), anti-inflammatory drugs, frequent milking of affected quarters.",
    severity: "Medium",
    animalId: animalIds.Cow,
  },
  {
    name: "Bovine Tuberculosis",
    description: "A chronic bacterial disease caused by Mycobacterium bovis. Can spread to humans through milk.",
    treatment: "No effective treatment. Infected animals should be culled. Pasteurize all milk. Regular TB testing recommended.",
    severity: "High",
    animalId: animalIds.Cow,
  },
  {
    name: "Bovine Fasciolosis",
    description: "A parasitic disease caused by liver flukes, common in wet marshy areas of Nepal.",
    treatment: "Anthelmintic drugs (triclabendazole or albendazole). Drain marshy areas. Regular deworming every 6 months.",
    severity: "Medium",
    animalId: animalIds.Cow,
  },

  // BUFFALO
  {
    name: "Foot and Mouth Disease",
    description: "A highly contagious viral disease causing blisters on mouth, feet and teats.",
    treatment: "Isolate the animal immediately. Clean and disinfect blisters. Call a vet for antiviral treatment. Vaccinate healthy animals.",
    severity: "High",
    animalId: animalIds.Buffalo,
  },
  {
    name: "Lumpy Skin Disease",
    description: "A viral disease causing nodular skin lesions, fever and reduced milk production.",
    treatment: "No specific treatment. Supportive care, antibiotics to prevent secondary infections. Vaccinate healthy animals. Control insects.",
    severity: "Medium",
    animalId: animalIds.Buffalo,
  },
  {
    name: "Bovine Respiratory Disease",
    description: "A bacterial or viral lung infection common in cold and wet conditions.",
    treatment: "Antibiotics (oxytetracycline), anti-inflammatory drugs, keep animal warm and dry. Call vet if breathing is severely labored.",
    severity: "Medium",
    animalId: animalIds.Buffalo,
  },
  {
    name: "Hemorrhagic Septicemia",
    description: "A fatal bacterial disease caused by Pasteurella multocida, common in Nepal during monsoon.",
    treatment: "Immediate antibiotics (penicillin or oxytetracycline). Vaccinate healthy animals. Isolate sick animals. Call vet immediately.",
    severity: "High",
    animalId: animalIds.Buffalo,
  },
  {
    name: "Mastitis",
    description: "Bacterial infection of the udder causing swelling, pain and abnormal milk.",
    treatment: "Antibiotics (intramammary and systemic), anti-inflammatory drugs, frequent milking of affected quarters.",
    severity: "Medium",
    animalId: animalIds.Buffalo,
  },
  {
    name: "Bovine Tuberculosis",
    description: "A chronic bacterial disease caused by Mycobacterium bovis. Can spread to humans through milk.",
    treatment: "No effective treatment. Infected animals should be culled. Pasteurize all milk. Regular TB testing recommended.",
    severity: "High",
    animalId: animalIds.Buffalo,
  },
  {
    name: "Bovine Fasciolosis",
    description: "A parasitic disease caused by liver flukes, common in wet marshy areas of Nepal.",
    treatment: "Anthelmintic drugs (triclabendazole or albendazole). Drain marshy areas. Regular deworming every 6 months.",
    severity: "Medium",
    animalId: animalIds.Buffalo,
  },

  // GOAT
  {
    name: "Peste des Petits Ruminants",
    description: "A highly contagious viral disease also known as Goat Plague, common in Nepal.",
    treatment: "No specific treatment. Supportive care, antibiotics for secondary infections. Vaccinate all healthy goats immediately.",
    severity: "High",
    animalId: animalIds.Goat,
  },
  {
    name: "Foot and Mouth Disease",
    description: "A highly contagious viral disease causing blisters on mouth and hooves.",
    treatment: "Isolate the animal. Clean blisters with antiseptic. Call vet for treatment. Vaccinate healthy animals.",
    severity: "High",
    animalId: animalIds.Goat,
  },
  {
    name: "Caprine Enterotoxemia",
    description: "A bacterial disease caused by Clostridium perfringens, often triggered by sudden feed changes.",
    treatment: "Antitoxin injection, antibiotics (penicillin). Vaccinate regularly. Avoid sudden changes in diet.",
    severity: "High",
    animalId: animalIds.Goat,
  },
  {
    name: "Caprine Respiratory Disease",
    description: "Bacterial or viral lung infection common in overcrowded or poorly ventilated housing.",
    treatment: "Antibiotics (oxytetracycline or penicillin), anti-inflammatory drugs. Improve ventilation. Keep animals dry.",
    severity: "Medium",
    animalId: animalIds.Goat,
  },
  {
    name: "Goat Pox",
    description: "A highly contagious viral disease causing pox lesions on skin, mouth and lungs.",
    treatment: "No specific treatment. Isolate infected animals. Supportive care. Vaccinate healthy goats. Call vet.",
    severity: "High",
    animalId: animalIds.Goat,
  },
  {
    name: "Bloat",
    description: "Excessive gas buildup in the rumen from wet legumes or grain overload.",
    treatment: "Stomach tube to release gas, bloat drench (turpentine + oil), keep animal walking. Call vet if severe.",
    severity: "High",
    animalId: animalIds.Goat,
  },
  {
    name: "Haemonchosis",
    description: "A parasitic disease caused by Haemonchus contortus bloodworm, very common in Nepal.",
    treatment: "Anthelmintic drugs (albendazole or levamisole). Regular deworming. Iron supplementation for anemic animals.",
    severity: "Medium",
    animalId: animalIds.Goat,
  },

  // PIG
  {
    name: "African Swine Fever",
    description: "A highly contagious and fatal viral disease in pigs. No vaccine available.",
    treatment: "No treatment or vaccine available. Cull all infected pigs. Strict biosecurity measures. Notify government authorities immediately.",
    severity: "High",
    animalId: animalIds.Pig,
  },
  {
    name: "Foot and Mouth Disease",
    description: "A highly contagious viral disease causing blisters on snout, mouth and hooves.",
    treatment: "Isolate infected pigs. Clean and disinfect blisters. Call vet immediately. Vaccinate healthy pigs.",
    severity: "High",
    animalId: animalIds.Pig,
  },
  {
    name: "Swine Influenza",
    description: "A respiratory viral disease caused by influenza A virus, can spread to humans.",
    treatment: "Supportive care, antipyretics for fever, antibiotics for secondary infections. Improve ventilation. Call vet.",
    severity: "Medium",
    animalId: animalIds.Pig,
  },
  {
    name: "Swine Dysentery",
    description: "A bacterial intestinal disease caused by Brachyspira hyodysenteriae.",
    treatment: "Antibiotics (tiamulin or lincomycin) in feed or water. Improve sanitation. Provide electrolytes for dehydration.",
    severity: "Medium",
    animalId: animalIds.Pig,
  },
  {
    name: "Swine Erysipelas",
    description: "A bacterial disease caused by Erysipelothrix rhusiopathiae causing skin lesions and joint swelling.",
    treatment: "Penicillin antibiotics are very effective. Anti-inflammatory drugs for joint pain. Vaccinate regularly.",
    severity: "Medium",
    animalId: animalIds.Pig,
  },

  // CHICKEN
  {
    name: "Newcastle Disease",
    description: "A highly contagious viral disease affecting the respiratory, nervous and digestive systems.",
    treatment: "No specific treatment. Vaccinate all healthy birds immediately. Cull severely affected birds. Improve biosecurity.",
    severity: "High",
    animalId: animalIds.Chicken,
  },
  {
    name: "Avian Influenza",
    description: "A highly contagious viral disease also known as Bird Flu. Can spread to humans.",
    treatment: "No treatment. Cull all infected flocks. Notify authorities immediately. Strict biosecurity. Do not consume infected birds.",
    severity: "High",
    animalId: animalIds.Chicken,
  },
  {
    name: "Infectious Bronchitis",
    description: "A viral respiratory disease causing coughing, sneezing and drop in egg production.",
    treatment: "No specific treatment. Supportive care, antibiotics for secondary infections. Vaccinate flock. Improve ventilation.",
    severity: "Medium",
    animalId: animalIds.Chicken,
  },
  {
    name: "Salmonellosis",
    description: "A bacterial disease caused by Salmonella, common in chicks and can spread to humans.",
    treatment: "Antibiotics (enrofloxacin or ampicillin). Clean and disinfect housing. Provide clean water. Isolate infected birds.",
    severity: "Medium",
    animalId: animalIds.Chicken,
  },
  {
    name: "Coccidiosis",
    description: "A parasitic disease caused by Eimeria species, common in young chickens.",
    treatment: "Anticoccidial drugs (amprolium or sulfadimethoxine). Clean litter regularly. Provide electrolytes. Improve sanitation.",
    severity: "Medium",
    animalId: animalIds.Chicken,
  },
];

async function main() {
  console.log("Seeding diseases...");

  // Clear existing diseases and symptoms
  await prisma.symptom.deleteMany();
  await prisma.disease.deleteMany();

  for (const disease of diseases) {
    await prisma.disease.create({
      data: disease,
    });
  }

  console.log(`✅ Seeded ${diseases.length} diseases`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());