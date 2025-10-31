// scripts/seed.ts
require('dotenv').config() // Add this line at the top

const { faker } = require('@faker-js/faker')
const { MongoClient } = require('mongodb')

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/medflow-ai'
const client = new MongoClient(uri)

async function seed() {
  try {
    console.log('Connecting to MongoDB Atlas...')
    await client.connect()
    console.log('Connected successfully!')
    
    const db = client.db()

    // Seed staff
    const staff = Array.from({ length: 30 }, () => ({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      role: faker.helpers.arrayElement(['clinician', 'admin', 'nurse']),
      department: faker.helpers.arrayElement(['ED', 'ICU', 'Radiology', 'Lab']),
    }))
    await db.collection('staff').deleteMany({})
    await db.collection('staff').insertMany(staff)
    console.log('✓ Seeded 30 staff')

    // Seed patients
    const complaints = [
      "Chest pain", "Shortness of breath", "Headache", "Abdominal pain", "Fever", "Cough", "Back pain", "Dizziness", "Nausea", "Vomiting", "Weakness", "Confusion", "Leg pain", "Arm pain", "Palpitations", "Syncope", "Diarrhea", "Rash", "Sore throat", "Fatigue"
    ]
    const patients = Array.from({ length: 100 }, () => {
      const age = faker.number.int({ min: 1, max: 99 })
      const gender = faker.helpers.arrayElement(['M', 'F'])
      return {
        name: faker.person.fullName(),
        dob: faker.date.birthdate(),
        age,
        gender,
        mrn: faker.string.uuid(),
        status: faker.helpers.arrayElement(['admitted', 'discharged', 'waiting']),
        triageState: "pending",
        triageLevel: faker.helpers.arrayElement(["low", "medium", "high"]),
        arrivalTime: faker.date.recent().toISOString().slice(11, 16),
        chiefComplaint: faker.helpers.arrayElement(complaints),
        vitals: {
          bp: `${faker.number.int({ min: 90, max: 180 })}/${faker.number.int({ min: 60, max: 100 })}`,
          hr: faker.number.int({ min: 50, max: 120 }),
          temp: faker.number.float({ min: 95, max: 104, precision: 0.1 }),
          o2: faker.number.int({ min: 85, max: 100 })
        }
      }
    })
    await db.collection('patients').deleteMany({})
    await db.collection('patients').insertMany(patients)
    console.log('✓ Seeded 100 patients')

    // Seed patient_flow
    const patientFlow = Array.from({ length: 100 }, () => ({
      lwbs: faker.number.int({ min: 0, max: 10 }),
      timestamp: faker.date.recent(),
    }))
    await db.collection('patient_flow').deleteMany({})
    await db.collection('patient_flow').insertMany(patientFlow)
    console.log('✓ Seeded 100 patient_flow records')

    console.log('\n✅ Seeding completed successfully!')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
  } finally {
    await client.close()
  }
}

seed().catch(console.error)