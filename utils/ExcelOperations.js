import ExcelJS from 'exceljs';


class ExcelOperations {


    constructor(filePath) {
        this.filePath = filePath;
    }

    async readExcel(worksheet, searchText) {
        let output = { row: -1, column: -1 };
        await worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {

                if (cell.value === searchText) {

                    output.row = rowNumber;
                    output.column = colNumber;
                }
            });
        });
        return output;
    }

    async writeExcel(searchText, replaceText, change, filePath) {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet("Sheet1");
        const output = await this.readExcel(worksheet, searchText);
        console.log("coordinates ", output.row, output.column + change.columnchange);
        const cell = worksheet.getCell(output.row, output.column + change.columnchange);
        cell.value = replaceText;
        await workbook.xlsx.writeFile(filePath);
    }

}
export default ExcelOperations;