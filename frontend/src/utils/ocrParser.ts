/**
 * Extracts Emirates ID details (ID number & name) from OCR text.
 * @param frontText - OCR extracted text from the front of the ID.
 * @param backText - OCR extracted text from the back of the ID.
 * @returns Object containing `idNumber` and `name`.
 */
export const parseEmiratesId = (frontText: string, backText: string) => {
  const idRegex = /\b784-\d{4}-\d{7}-\d\b/; //  Standard Emirates ID pattern
  const nameRegex =
    /(?:Name|Full Name|Holder Name|Cardholder Name)[\s:]+([A-Za-z\s]+)/i; //  Improved name extraction

  // Extract ID from back text (fallback to front text)
  const idMatch = backText.match(idRegex) || frontText.match(idRegex);
  const idNumber = idMatch?.[0]?.trim() || "";

  // Extract Name from front text
  const nameMatch = frontText.match(nameRegex);
  const name = nameMatch?.[1]?.trim().replace(/\s+/g, " ") || ""; //  Normalize spaces

  // Debugging Logs
  if (!idNumber)
    console.warn("[parseEmiratesId] Warning: Emirates ID number not detected.");
  if (!name) console.warn("[parseEmiratesId] Warning: Name not detected.");

  return { idNumber, name };
};
