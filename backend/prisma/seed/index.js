const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

async function main() {
  // Create sample patients
  const patient1 = await prisma.patient.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      address: '123 Main St',
      history: 'No significant medical history',
      healthCardNumber: 'H987',
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '987-654-3210',
      address: '456 Elm St',
      history: 'Allergic to penicillin',
      healthCardNumber: 'H123',
    },
  });

  // Create sample doctors
  const doctor1 = await prisma.doctor.create({
    data: {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      phoneNumber: '555-123-4567',
    },
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      firstName: 'Bob',
      lastName: 'Williams',
      email: 'bob.williams@example.com',
      phoneNumber: '555-987-6543',
    },
  });

  // Create sample appointments
  await prisma.appointment.create({
    data: {
      dateTime: new Date('2023-11-01T10:00:00Z'),
      reason: 'Routine check-up',
      notes: 'Patient is in good health',
      appointmentStatus: 'Scheduled',
      doctorId: doctor1.id,
      patientId: patient1.id,
    },
  });

  await prisma.appointment.create({
    data: {
      dateTime: new Date('2023-11-02T14:00:00Z'),
      reason: 'Follow-up visit',
      notes: 'Patient reports mild headaches',
      appointmentStatus: 'Scheduled',
      doctorId: doctor2.id,
      patientId: patient2.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
