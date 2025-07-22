const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports.create = function create(code, name, credit) {
  return prisma.module.create({
    data: {
      modCode: code,
      modName: name,
      creditUnit: parseInt(credit, 10),
    },
  })
    .then(function (module) {
      // Return the created module object
      return module;
    })
    .catch(function (error) {
      // Handle specific Prisma error for unique constraint violation
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Module already exists with this code');
        }
      }
      // Handle any other errors
      throw error;
    });
};

module.exports.updateByCode = function updateByCode(code, credit) {
  return prisma.module.update({
    where: {
      modCode: code,
    },
    data: {
      creditUnit: parseInt(credit), // ensure it's an integer
    },
  })
    .then(function (module) {
      return module; // optional, can be used to confirm update
    })
    .catch(function (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          // P2025 = Record to update not found
          throw new Error('Module not found. Update failed.');
        }
      }
      throw error;
    });
};

module.exports.deleteByCode = function deleteByCode(code) {
  return prisma.module.delete({
    where: {
      modCode: code,
    },
  })
    .then(function (module) {
      return module; // optional: useful if you want to confirm deletion
    })
    .catch(function (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Module not found. Deletion failed.');
        }
      }
      throw error;
    });
};

module.exports.retrieveAll = function retrieveAll() {
  return prisma.module.findMany();
};

module.exports.retrieveByCode = function retrieveByCode(code) {
  return prisma.module.findUnique({
    where: {
      modCode: code,
    },
  })
    .then(function (module) {
      if (!module) {
        throw new Error('Module not found.');
      }
      return module;
    })
    .catch(function (error) {
      // Handle Prisma error codes if needed
      throw error;
    });
};