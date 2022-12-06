import java.io.File;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

// Credit: https://gist.github.com/Munawwar/924389/adec31107f16e3938806e25c6ea2f6a15007d79b

public class ExcelToCSV {

	public static void writeAsCSV(Sheet sheet, String output) throws IOException {
		File fout = new File(output);
		FileOutputStream fos = new FileOutputStream(fout);
	 
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fos));

	    Row row = null;
	    for (int i = 0; i < sheet.getLastRowNum(); i++) {
	        row = sheet.getRow(i);
	        for (int j = 0; j < row.getLastCellNum(); j++) {
				bw.write("\"" + row.getCell(j) + "\",");
	        }
			bw.newLine();
	    }
	 
		bw.close();
	}
    
    public static void main(String[] args) {
        if (args.length != 2) {
            Logger.getLogger(ExcelToCSV.class.getName()).log(Level.SEVERE, "Two arguments expected: Input file and output file.");
        }
        InputStream inp = null;
        try {
            inp = new FileInputStream(args[0]);
            Workbook wb = WorkbookFactory.create(inp);

            for(int i=0;i<wb.getNumberOfSheets();i++) {
                System.out.println(wb.getSheetAt(i).getSheetName());
                writeAsCSV(wb.getSheetAt(i), args[1]);
            }
        } catch (FileNotFoundException ex) {
            Logger.getLogger(ExcelToCSV.class.getName()).log(Level.SEVERE, "File not found, please check if the input is correct.", ex);
        } catch (IOException ex) {
            Logger.getLogger(ExcelToCSV.class.getName()).log(Level.SEVERE, "I/O error occurred while writing to the file.", ex);
        } finally {
            try {
                inp.close();
	            System.out.println("File outputted succesfully.");
            } catch (IOException ex) {
                Logger.getLogger(ExcelToCSV.class.getName()).log(Level.SEVERE, "I/O error occurred during closing the file.", ex);
            }
        }
    }
}