/*
  Warnings:

  - The primary key for the `module` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `mod_coord` on the `module` table. All the data in the column will be lost.
  - You are about to drop the `country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pre_requisite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `staff_dependent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stud_mod_performance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `mod_code` on the `module` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `password` on table `user_account` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_offered_by_fk";

-- DropForeignKey
ALTER TABLE "department" DROP CONSTRAINT "dept_hod_fk";

-- DropForeignKey
ALTER TABLE "module" DROP CONSTRAINT "mod_mod_coord_fk";

-- DropForeignKey
ALTER TABLE "pre_requisite" DROP CONSTRAINT "pre_requisite_mod_code_fk";

-- DropForeignKey
ALTER TABLE "pre_requisite" DROP CONSTRAINT "pre_requisite_requisite_fk";

-- DropForeignKey
ALTER TABLE "staff" DROP CONSTRAINT "staff_dept_code_fk";

-- DropForeignKey
ALTER TABLE "staff_dependent" DROP CONSTRAINT "staff_dependent_staff_no_fk";

-- DropForeignKey
ALTER TABLE "stud_mod_performance" DROP CONSTRAINT "stud_mod_performance_adm_no_fkey";

-- DropForeignKey
ALTER TABLE "stud_mod_performance" DROP CONSTRAINT "stud_mod_performance_mod_registered_fkey";

-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_crse_code_fk";

-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_nationality_fk";

-- DropForeignKey
ALTER TABLE "user_account" DROP CONSTRAINT "fk_account_no";

-- DropForeignKey
ALTER TABLE "user_account" DROP CONSTRAINT "fk_role";

-- AlterTable
ALTER TABLE "module" DROP CONSTRAINT "module_pkey",
DROP COLUMN "mod_coord",
DROP COLUMN "mod_code",
ADD COLUMN     "mod_code" INTEGER NOT NULL,
ADD CONSTRAINT "module_pkey" PRIMARY KEY ("mod_code");

-- AlterTable
ALTER TABLE "user_account" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "password" SET NOT NULL;
DROP SEQUENCE "user_account_id_seq";

-- AlterTable
ALTER TABLE "user_role" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "user_role_id_seq";

-- DropTable
DROP TABLE "country";

-- DropTable
DROP TABLE "pre_requisite";

-- DropTable
DROP TABLE "staff_dependent";

-- DropTable
DROP TABLE "stud_mod_performance";

-- DropTable
DROP TABLE "student";
