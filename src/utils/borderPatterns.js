// Padrões de bordas temáticas que vão intercalar
export const borderPatterns = [
  'portal',    // Azul portal do Rick
  'slime',     // Verde slime/alien
  'space',     // Roxo espacial
  'laser',     // Vermelho laser
  'circuit',   // Amarelo tech/circuito
];

// Função para obter o padrão baseado no índice
export const getBorderPattern = (index) => {
  return borderPatterns[index % borderPatterns.length];
};

// Função para obter padrão baseado no ID do personagem
export const getBorderPatternById = (id) => {
  return borderPatterns[(id - 1) % borderPatterns.length];
};