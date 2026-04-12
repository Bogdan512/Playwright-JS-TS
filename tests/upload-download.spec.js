const ExcelJS = require("exceljs");
const { test, expect } = require('@playwright/test');

async function writeExcelTest(searchText, replaceText, change, filePath) 
{
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet("Sheet1");
    const output = await readExcel(worksheet, searchText);
    const cell =worksheet.getCell(output.row, output.column+change.colChange);
    console.log("Current cell value => " + cell.value);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
    console.log("Updated cell value => " + cell.value);
}

async function readExcel(worksheet, searchText)
{
    let output = {row:-1, column:-1}
    worksheet.eachRow((row, rowNumber) =>
    {
        row.eachCell((cell, colNumber) =>
        {
            if (cell.value === searchText)
            {
                output.row = rowNumber;
                output.column = colNumber;
                console.log("rowNumber => " + rowNumber);
                console.log("colNumber => " + colNumber);
            }
        });
    });
    return output;
}
//update Airplane price to 350
//writeExcelTest("Airplane", 350, {rowChange:0, colChange:2}, "C:\\Users\\ciurt\\Downloads\\exceldownloadTest.xlsx");

test('Upload download excel validation', async({browser}) =>
{
    const context = await browser.newContext
    ({
        acceptDownloads: true
    });
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;
    const filePath = "C:\\Users\\ciurt\\Downloads\\download.xlsx";
    await download.saveAs(filePath);
    writeExcelTest("Banana", 350, {rowChange:0, colChange:2}, "C:\\Users\\ciurt\\Downloads\\download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:\\Users\\ciurt\\Downloads\\download.xlsx");
});