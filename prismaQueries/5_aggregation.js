const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const util = require('util');


function getMeanCourseFee() {
    return prisma.course.aggregate({
        _avg: {
            crseFee: true,
        }
    })
}


/** Section A */

function getNumberOfFullTimeStaff() {
    return prisma.staff.aggregate({
        //TODO: Implement the query
        _count: {
            staffNo: true,
        },
        where: {
            typeOfEmployment: 'FT',
        }
    })
}

/** Section B */

function getTotalAllowanceOfStaffByGrade() {
  return prisma.staff.groupBy({
    by: ['grade'],
    where: {
      grade: {
        not: {
          startsWith: 'S',
        },
      },
      allowance: {
        not: null,
      },
    },
    _sum: {
      allowance: true,
    },
    orderBy: {
      grade: 'desc',
    },
  });
}


async function getTotalPayAndNoOfStaffByDeptWithHighTotal() {
  const result = await prisma.staff.groupBy({
    by: ['deptCode'],
    where: {
      deptCode: {
        not: 'DPO',
      },
    },
    _sum: {
      pay: true,
    },
    _count: {
      staffNo: true,
    },
  });

  // Filter and sort as Prisma cannot do aggregation filtering
  return result
    // eslint-disable-next-line no-underscore-dangle
    .filter(r => r._sum.pay > 20000)
    // eslint-disable-next-line no-underscore-dangle
    .sort((a, b) => b._sum.pay - a._sum.pay);
}


/** Using Raw Query */


function getAvgLabFeeWithRawQuery() {
    return prisma.$queryRaw`SELECT AVG(COALESCE(lab_fee, 0)) AS "Mean Lab Fee" FROM course;`
}


async function main(argument) {
    let results;
    switch (argument) {
        case 'getMeanCourseFee':
            results = await getMeanCourseFee();
            break;
        case 'getNumberOfFullTimeStaff':
            results = await getNumberOfFullTimeStaff();
            break;
        case 'getTotalAllowanceOfStaffByGrade':
            results = await getTotalAllowanceOfStaffByGrade();
            break;                        
        case 'getTotalPayAndNoOfStaffByDeptWithHighTotal':
            results = await getTotalPayAndNoOfStaffByDeptWithHighTotal();
            break;            
        case 'getAvgLabFeeWithRawQuery':
            results = await getAvgLabFeeWithRawQuery()
            break;            
        default:
            console.log('Invalid argument');
    }
    results && console.log(util.inspect(results, { showHidden: false, depth: null, colors: true }));
}

main(process.argv[2]);
