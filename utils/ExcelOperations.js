import ExcelJS from 'exceljs';


class ExcelOperations {


    constructor(filePath) {
        this.filePath = filePath;
    }
    /**
     * Finds the row and column number of the cell in the worksheet that matches the given searchText.
     * @param {Worksheet} worksheet - The ExcelJS worksheet to search in.
     * @param {string} searchText - The text to search for in the worksheet.
     * @returns {Promise<{row: number, column: number}>} - The coordinates of the found cell, or -1 for both if not found.
     */

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

    /**
     * Reads the Excel file at this.filePath (or provided filePath), searches for searchText in "Sheet1",
     * and returns the coordinates {row, column} of the found cell, or -1 for both if not found.
     * @param {string} searchText - The text to search for in the worksheet.
     * @param {string} [filePath] - Optional path to the Excel file. Defaults to this.filePath.
     * @returns {Promise<{row: number, column: number}>}
     */
    async readExcelFromFile(searchText, filePath) {
        const workbook = new ExcelJS.Workbook();
        const path = filePath || this.filePath;
        await workbook.xlsx.readFile(path);
        const worksheet = workbook.getWorksheet("Sheet1");
        return await this.readExcel(worksheet, searchText);
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