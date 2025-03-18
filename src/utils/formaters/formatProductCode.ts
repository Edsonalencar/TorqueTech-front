export const formatProductCode = (value?: string) => {
  if (!value || value === "") return "";

  try {
    let replacedValue = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase(); // Converte letras minúsculas para maiúsculas

    // Limita o tamanho máximo a 20 caracteres
    if (replacedValue.length > 20) {
      replacedValue = replacedValue.slice(0, 20);
    }

    if (replacedValue.length <= 3) {
      return replacedValue;
    }

    if (replacedValue.length >= 4 && replacedValue.length < 8) {
      // Transição gradual para AAA-XXXX
      return replacedValue.slice(0, 3) + "-" + replacedValue.slice(3);
    }

    if (replacedValue.length >= 8 && replacedValue.length < 12) {
      // Formatação gradual para NCM (8 dígitos)
      return replacedValue.replace(/(\d{4})(\d{1,4})/, "$1.$2");
    }

    if (replacedValue.length >= 12 && replacedValue.length <= 14) {
      // Transição gradual para EAN/GTIN
      return replacedValue
        .replace(/(\d{3})(\d{3})(\d{3})(\d{1,5})?/, "$1.$2.$3.$4")
        .replace(/\.$/, "");
    }

    if (replacedValue.length >= 13) {
      // Transição gradual para Código ANVISA
      return replacedValue
        .replace(/(\d{5})(\d{1,4})?(\d{0,4})/, "$1.$2.$3")
        .replace(/\.$/, "");
    }

    if (replacedValue.length >= 6 && replacedValue.length <= 20) {
      // SKU pode ser alfanumérico, manter apenas letras e números sem formatação extra
      return replacedValue;
    }

    // Caso geral: formato padrão AAA-XXXXX
    const letters = replacedValue.slice(0, 3);
    const numbers = replacedValue.slice(3);

    return numbers ? `${letters}-${numbers}` : letters;
  } catch (error: any) {
    console.warn("formatProductCode:", error?.message);
    return "";
  }
};
