async function mergePDFs() {
    // Get both pdf
    const mainFile = document.getElementById("mainPdf").files[0];
    const watermarkFile = document.getElementById("watermarkPdf").files[0];
  
    // Check if both files are selected
    if (!mainFile || !watermarkFile) {
      alert("Please upload both PDFs.");
      return;
    }
  
    // Read both files into memory as array buffers
    const mainBytes = await mainFile.arrayBuffer();
    const watermarkBytes = await watermarkFile.arrayBuffer();
  
    // Load the PDFs using PDF-lib
    const mainPdfDoc = await PDFLib.PDFDocument.load(mainBytes);
    const watermarkPdfDoc = await PDFLib.PDFDocument.load(watermarkBytes);
  
    // Embed the first page of the watermark PDF into the main PDF
    const watermarkPage = await mainPdfDoc.embedPage(watermarkPdfDoc.getPage(0));
    const { width, height } = watermarkPage.size; // Get watermark size (optional)
  
    // Get all pages from the main PDF
    const pages = mainPdfDoc.getPages();
  
    // Adding watermark to each PDF
    for (const page of pages) {
      const pageSize = page.getSize();
      page.drawPage(watermarkPage, {
        x: 0,
        y: 0,
        width: pageSize.width,
        height: pageSize.height,
      });
    }
  
    // Save
    const mergedPdfBytes = await mainPdfDoc.save();
  
    // fro download
    const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "merged.pdf";
    link.click(); 
  }
  






































































// async function mergePDFs() {
//   const mainFile = document.getElementById("mainPdf").files[0];
//   const watermarkFile = document.getElementById("watermarkPdf").files[0];

//   if (!mainFile || !watermarkFile) {
//     alert("Please upload both PDFs.");
//     return;
//   }
//   const mainBytes = await mainFile.arrayBuffer();
//   const watermarkBytes = await watermarkFile.arrayBuffer();

//   const mainPdfDoc = await PDFLib.PDFDocument.load(mainBytes);
//   const watermarkPdfDoc = await PDFLib.PDFDocument.load(watermarkBytes);

//   const watermarkPage = await mainPdfDoc.embedPage(watermarkPdfDoc.getPage(0));
//   const { width, height } = watermarkPage.size;

//   const pages = mainPdfDoc.getPages();
//   for (const page of pages) {
//     const pageSize = page.getSize();
//     page.drawPage(watermarkPage, {
//       x: 0,
//       y: 0,
//       width: pageSize.width,
//       height: pageSize.height,
//     });
//   }

//   const mergedPdfBytes = await mainPdfDoc.save();
//   const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
//   const link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.download = "merged.pdf";
//   link.click();
// }
