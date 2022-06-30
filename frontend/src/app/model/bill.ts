export class Bill {
  [key: string]: any;
  _id: string = 'new';
  orderId: {_id: string} = {_id: ''};
  price: number = 0;
  date: string = new Date().toLocaleDateString('hu-HU');
  status: "új" | "teljesítve" | "stornózott" = "új";
}
