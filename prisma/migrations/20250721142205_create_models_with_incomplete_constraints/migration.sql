-- DropForeignKey
ALTER TABLE "module" DROP CONSTRAINT "mod_mod_coord_fk";

-- DropIndex
DROP INDEX "department_hod_key";

-- AlterTable
ALTER TABLE "stud_mod_performance" ALTER COLUMN "mark" DROP NOT NULL,
ALTER COLUMN "grade" DROP NOT NULL;

-- AlterTable
ALTER TABLE "student" ALTER COLUMN "mobile_phone" DROP NOT NULL,
ALTER COLUMN "home_phone" DROP NOT NULL,
ALTER COLUMN "dob" SET DATA TYPE DATE;

-- RenameForeignKey
ALTER TABLE "course" RENAME CONSTRAINT "fk_course_offered_by" TO "course_offered_by_fk";

-- RenameForeignKey
ALTER TABLE "stud_mod_performance" RENAME CONSTRAINT "stud_mod_performance_adm_no_fk" TO "stud_mod_performance_adm_no_fkey";

-- RenameForeignKey
ALTER TABLE "stud_mod_performance" RENAME CONSTRAINT "stud_mod_performance_mod_registered_fk" TO "stud_mod_performance_mod_registered_fkey";

-- AddForeignKey
ALTER TABLE "module" ADD CONSTRAINT "mod_mod_coord_fk" FOREIGN KEY ("mod_coord") REFERENCES "staff"("staff_no") ON DELETE NO ACTION ON UPDATE NO ACTION;
