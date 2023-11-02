import accounting from 'accounting';

const formatTable = (input, columnName) => {
  if (typeof input === 'number') {
    return accounting.formatMoney(input, '$', 0, ',', '.');
  }

  if (columnName === 'asOfDate') {
    const date = new Date(input);
    if (!isNaN(date.getTime())) {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    }
  }

  return input;
};

export default formatTable;
