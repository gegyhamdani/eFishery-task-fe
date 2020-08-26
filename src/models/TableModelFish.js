const Base = () => [
  { id: 'komoditas', label: 'Komoditas', width: 160 },
  {
    id: 'price',
    label: 'Harga',
    width: 100,
    align: 'right'
  },
  {
    id: 'size',
    label: 'Ukuran',
    numeric: true,
    width: 50,
    align: 'right'
  },
  { id: 'area_provinsi', label: 'Provinsi', width: 160 },
  { id: 'area_kota', label: 'Kota', width: 160 }
];

export default { Base };
