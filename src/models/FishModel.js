const Base = areaList => ({
  Komoditas: {
    type: 'text',
    required: true,
    placeholder: 'Komoditas',
    defaultValue: 'Komoditas'
  },
  Area: {
    type: 'select',
    required: true,
    placeholder: 'Pilih item',
    defaultValue: '2',
    options: areaList
  },
  Size: {
    type: 'number',
    required: true,
    placeholder: 'Jumlah',
    defaultValue: '10'
  },
  Harga: {
    type: 'currency',
    required: true,
    placeholder: 'Harga anu',
    defaultValue: '50000'
  },
  Save: {
    type: 'submit'
  }
});

export default { Base };
