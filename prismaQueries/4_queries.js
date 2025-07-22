const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()
const util = require('util');

function getAllStaff() {
	return prisma.staff.findMany({		
	})
}

/** Section A: Basic Queries */


function getHodInfo() {
  return prisma.department.findMany({
    select: {
      deptName: true,           // this matches the "name" column in the DB
      hodApptDate: true,    // this maps to `hod_appt_date` in the DB
    },
  });
}


function getDeptStaffingInfo() {
	return prisma.department.findMany({
		select: {
			deptCode: true,
			noOfStaff: true,
		}

	});
}


/** Section B: Filtering Queries */


function getStaffofSpecificCitizenships() {
  return prisma.staff.findMany({
    where: {
      citizenship: {
        in: ['Hong Kong', 'Korea', 'Malaysia', 'Thailand'],
      },
    },
    select: {
      citizenship: true,
      staffName: true,
    },
  }).then(staffList => {
    const order = ['Hong Kong', 'Korea', 'Malaysia', 'Thailand'];
    return staffList.sort((a, b) => order.indexOf(a.citizenship) - order.indexOf(b.citizenship));
  });
}


function getStaffByCriteria1() {
  return prisma.staff.findMany({
    where: {
      maritalStatus: 'M',
      gender: 'M',
      pay: {
        gte: 2000,
        lte: 7000,
      },
    },
    select: {
      gender: true,
      pay: true,
      maritalStatus: true,
      staffName: true,
    },
    orderBy: [
      { gender: 'asc' },
      { pay: 'asc' },
    ],
  });
}



/** Section C: Relation Queries */

async function getDepartmentCourses() {
  return prisma.department.findMany({
    select: {
      deptName: true,
      course: {
        select: {
          crseName: true,
          crseFee: true,
          labFee: true,
        },
      },
    },
    orderBy: {
      deptName: 'asc',
    },
  });
}



const getStaffAndDependents = () => prisma.staff.findMany({
    where: {
      staffDependent: {
        some: {}, // ensures only staff with at least 1 dependent
      },
    },
    select: {
      staffName: true,
      staffDependent: {
        select: {
          dependentName: true,
          relationship: true,
        },
      },
    },
    orderBy: {
      staffName: 'asc',
    },
  });

const getDepartmentCourseStudentDob = () => prisma.department.findMany({
    where: {
      course: {
        some: {
          student: {
            some: {}, // course must have at least one student
          },
        },
      },
    },
    select: {
      deptName: true,
      course: {
        where: {
          student: {
            some: {}, // again, only include courses with students
          },
        },
        orderBy: {
          crseName: 'asc',
        },
        select: {
          crseName: true,
          student: {
            orderBy: {
              dob: 'desc',
            },
            select: {
              studName: true,
              dob: true,
            },
          },
        },
      },
    },
    orderBy: {
      deptName: 'asc',
    },
  });


async function main(argument) {
	let results;
	switch (argument) {
		case 'getAllStaff':
			results = await getAllStaff();
			break;
		case 'getHodInfo':
			results = await getHodInfo();
			break;
		case 'getDeptStaffingInfo':
			results = await getDeptStaffingInfo();
			break;
		case 'getStaffofSpecificCitizenships':
			results = await getStaffofSpecificCitizenships();
			break;
		case 'getStaffByCriteria1':
			results = await getStaffByCriteria1();
			break;
		case 'getDepartmentCourses':
			results = await getDepartmentCourses();
			break;
		case 'getStaffAndDependents':
			results = await getStaffAndDependents();
			break;
		case 'getDepartmentCourseStudentDob':
			results = await getDepartmentCourseStudentDob();
			break;
		default:
			console.log('Invalid argument');
			break;
	}
	results && console.log(util.inspect(results, { showHidden: false, depth: null, colors: true }));
}

main(process.argv[2]);
