    import ExcelJS from 'exceljs';
    import { test, expect } from '@playwright/test';
    import ExcelOperations from '../utils/ExcelOperations.js';


    test("upload and download", async ({ page }) => {

        const searchText = "Mango";
        const updatedValue = '350';
        const excelOperations = new ExcelOperations("C:/Users/XW334BQ/Downloads/download.xlsx");

        await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
        const downloadpromise = page.waitForEvent('download');
        await page.getByRole('button', { name: 'Download' }).click();
        await downloadpromise;
        await excelOperations.writeExcel(searchText, 350, { rowchange: 0, columnchange: 2 }, "C:/Users/XW334BQ/Downloads/download.xlsx");
        await page.locator("#fileinput").click();
        await page.locator("#fileinput").setInputFiles("C:/Users/XW334BQ/Downloads/download.xlsx");
        const searchtextloc = page.getByText(searchText);

        const desiredrow = page.getByRole('row').filter({ has: searchtextloc });

        await expect(desiredrow.locator('#cell-4-undefined')).toContainText(updatedValue);
    });
