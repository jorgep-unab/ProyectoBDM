import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  public exportExcel(jsonData: any[], fileName: string): void {

    var wSheets =[];

    jsonData.forEach(data => {
      if (data!=null) {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        wSheets.push(ws);
      }else{
        wSheets.push(null);
      }
    });


    const wb: XLSX.WorkBook = {
      SheetNames: ['Purin','Mojado fardos','Estacionado fardos','Piscina humectación',
      'Armado cordón', 'Día 1 cordón','Día 2 cordón','Día 3 cordón','Día 4 cordón',
      'Día 5 FB','Heap'],
      Sheets: {
        'Purin': wSheets[0],
        'Mojado fardos':wSheets[1],
        'Estacionado fardos': wSheets[2],
        'Piscina humectación': wSheets[3],
        'Armado cordón': wSheets[4],
        'Día 1 cordón': wSheets[5],
        'Día 2 cordón': wSheets[6],
        'Día 3 cordón': wSheets[7],
        'Día 4 cordón': wSheets[8],
        'Día 5 FB': wSheets[9],
        'Heap':wSheets[10]
      }
    };


    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }
}
