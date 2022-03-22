const slugString = (string: string) => {
  return string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/( )+/g, '-')
    .replace(/(_)+/g, '-')
    .toLocaleLowerCase();

  // .replace(/(.)\1+/g, '$1') // remove letras repetidas
};

export { slugString };
