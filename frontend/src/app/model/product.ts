export class Product {
  [key: string]: any;
  _id: string = 'new';
  "Ár": number = 0;
  "Elérhető": boolean = true;
  'Magyar név': string | null = '';
  'Latin név'?: string | null = '';
  'Fényigény'?: string | null = '';
  'Tenyészidő'?: '1 nyári' | 'évelő' | null = '1 nyári';
  'Talajigény'?: string | null = '';
  'Habitus'?: string | null = '';
  'Teljes magasság'?: string | null = '';
  'Kiszerelés'?: string | null = '';
  'Virágzás ideje'?: string | null = '';
  'Virág színe'?: string | null = '';
  'Egyéb'?: string | null = '';
}
