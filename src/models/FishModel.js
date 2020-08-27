const Base = (areaList, isLoading) => ({
  Komoditas: {
    type: 'text',
    required: true,
    placeholder: 'Komoditas'
  },
  Area: {
    type: 'select',
    required: true,
    placeholder: 'Pilih Area',
    defaultValue: '2',
    options: areaList
  },
  Ukuran: {
    type: 'number',
    required: true,
    placeholder: 'Ukuran'
  },
  Harga: {
    type: 'currency',
    required: true,
    placeholder: 'Harga'
  },
  [isLoading ? 'Tunggu Sebentar' : 'Simpan']: {
    type: 'submit',
    disabled: isLoading
  }
});

export default { Base };
