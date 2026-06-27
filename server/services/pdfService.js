import pdf from 'pdf-parse';

/**
 * Extracts raw plain text from a PDF buffer.
 * @param {Buffer} buffer - The PDF file buffer.
 * @returns {Promise<string>} Extracted text.
 */
export const extractTextFromPDF = async (buffer) => {
  try {
    if (!buffer || buffer.length === 0) {
      throw new Error('Empty PDF file provided.');
    }
    const data = await pdf(buffer);
    const extractedText = data.text ? data.text.trim() : '';

    if (!extractedText || extractedText.length < 20) {
      throw new Error('Could not extract meaningful text from the PDF. The file may be image-based or protected.');
    }

    return extractedText;
  } catch (error) {
    console.error('PDF Extraction Error:', error);
    throw new Error(error.message || 'Failed to extract text from uploaded PDF file.');
  }
};
