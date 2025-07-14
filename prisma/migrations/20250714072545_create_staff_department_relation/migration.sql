/*
  Warnings:

  - A unique constraint covering the columns `[hod]` on the table `department` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "department_hod_key" ON "department"("hod");

-- AddForeignKey
ALTER TABLE "department" ADD CONSTRAINT "dept_hod_fk" FOREIGN KEY ("hod") REFERENCES "staff"("staff_no") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_dept_code_fk" FOREIGN KEY ("dept_code") REFERENCES "department"("dept_code") ON DELETE NO ACTION ON UPDATE NO ACTION;
