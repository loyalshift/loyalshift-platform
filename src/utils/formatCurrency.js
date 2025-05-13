/**
 * Formats a numerical value as currency, defaulting to Costa Rican Colón (CRC).
 *
 * @param {number|string} value - The numerical value to format.
 * @param {string} [currency="CRC"] - The currency code (e.g., "CRC", "USD").
 * @returns {string} - The formatted currency string (e.g., "₡150,000,000"),
 * or an empty string if the input value is not a valid number.
 */
export function formatCurrency(value, currency = "CRC") {
  // Ensure the value is a number before formatting
  const numberValue = Number(value);
  if (isNaN(numberValue)) {
    console.warn(`formatCurrency: Invalid value provided: ${value}`);
    return ""; // Return empty string or some placeholder for invalid input
  }

  // Use Intl.NumberFormat for locale-specific currency formatting
  return new Intl.NumberFormat("es-CR", {
    // Use 'es-CR' locale for Costa Rica
    style: "currency",
    currency: currency, // Use the provided currency code
    minimumFractionDigits: currency === "USD" ? 2 : 0, // USD usually has 2 decimals, CRC 0
    maximumFractionDigits: currency === "USD" ? 2 : 0,
  }).format(numberValue);
}

// Example Usage:
// const priceCRC = 150000000;
// console.log(formatCurrency(priceCRC)); // Output: "₡150,000,000"

// const priceUSD = 75000.50;
// console.log(formatCurrency(priceUSD, "USD")); // Output: "$75,000.50" (depending on es-CR locale for USD symbol)
// For explicit USD symbol regardless of locale, you might need a different locale for formatting USD,
// or ensure your 'es-CR' system settings render USD as '$'.
// Typically, for USD, 'en-US' locale is used:
// new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
