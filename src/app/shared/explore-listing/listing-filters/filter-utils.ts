export type InitialStateType = {
  search: string;
  for_sale: string;
  pricing: string;
  price: number[] | string;
  bed_and_baths: string[] | string;
  home_type: string[] | string;
  maxHoA: string;
  listing_type: string;
  property_status: string[] | string;
  parking_spots: string;
  garages: string;
  square_feet_min: string;
  square_feet_max: string;
  lot_size_min: string;
  lot_size_max: string;
  built_year_min: string;
  built_year_max: string;
  basement: string;
  number_of_stories: string;
  senior_living: string;
  other_amenities: string;
  view: string;
  sold_in_last: string;
  keywords: string;
  tour_status: string[] | string;
};

export const initialState: InitialStateType = {
  search: '',
  for_sale: '',
  pricing: '',
  price: [0, 0],
  bed_and_baths: [],
  home_type: [],
  maxHoA: '',
  listing_type: '',
  property_status: [],
  parking_spots: '',
  garages: '',
  square_feet_min: '',
  square_feet_max: '',
  lot_size_min: '',
  lot_size_max: '',
  built_year_min: '',
  built_year_max: '',
  basement: '',
  number_of_stories: '',
  senior_living: '',
  other_amenities: '',
  view: '',
  sold_in_last: '',
  keywords: '',
  tour_status: [],
};

// Options
export const homeTypes = [
  {
    id: 1,
    name: 'خانه‌ها',
    value: 'houses',
    selected: false,
  },
  {
    id: 2,
    name: 'خانه‌های شهری',
    value: 'townhomes',
    selected: false,
  },
  {
    id: 3,
    name: 'منازل چند خانواده‌ای',
    value: 'multi-family',
    selected: false,
  },
  {
    id: 4,
    name: 'واحدهای مسکونی/تعاونی‌ها',
    value: 'condor-coOps',
    selected: false,
  },
  {
    id: 5,
    name: 'زمین‌ها/قطعات',
    value: 'lots-lands',
    selected: false,
  },
  {
    id: 6,
    name: 'آپارتمان‌ها',
    value: 'apartments',
    selected: false,
  },
  {
    id: 7,
    name: 'مسکونی ساخته شده',
    value: 'manufactured',
    selected: false,
  },
];

export const forsaleData = [
  {
    id: 1,
    name: 'برای فروش',
    value: 'for-sale',
  },
  {
    id: 2,
    name: 'برای اجاره',
    value: 'for-rent',
  },
  {
    id: 3,
    name: 'فروحته شده',
    value: 'sold',
  },
];

export const maxHOAOptions = [
  { name: 'هر چیزی', value: 'any' },
  { name: 'بدون هزینه', value: '0' },
  { name: 'تومان50/ماهیانه', value: '50' },
  { name: 'تومان100/ماهیانه', value: '100' },
  { name: 'تومان200/ماهیانه', value: '200' },
  { name: 'تومان500/ماهیانه', value: '500' },
];

export const propertyStatusOptions = [
  {
    name: 'به زودی',
    value: 'coming_soon',
  },
  {
    name: 'قبول کردن پیشنهاد اضافی',
    value: 'accepting_backup_offer',
  },
  {
    name: 'در حال انتظار و تحت قرارداد',
    value: 'pending_under_contract',
  },
];

export const amenitiesOptions = [
  {
    name: 'باید دارای سیستم تهویه مطبوع باشد.',
    value: 'must-have-ac',
  },
  {
    name: 'باید استخر داشته باشد',
    value: 'must-have-pool',
  },
];

export const viewOptions = [
  {
    name: 'شهر',
    value: 'city',
  },
  {
    name: 'کوه',
    value: 'mountain',
  },
  {
    name: 'پارک',
    value: 'park',
  },
  {
    name: 'آب',
    value: 'water',
  },
];

export const tourOptions = [
  {
    name: 'باید فضای باز داشته باشد',
    value: 'have_open_house',
  },
  {
    name: 'باید طرح سه بعدی داشته باشد',
    value: 'have_3d_tour',
  },
];

export const parkingSpotsData = [
  { name: 'هر چیزی', value: 'any' },
  { name: '1+', value: '1+' },
  { name: '2+', value: '2+' },
  { name: '3+', value: '3+' },
  { name: '4+', value: '4+' },
  { name: '5+', value: '5+' },
];

export const squareFeetOptions = [
  { name: '500 فوت مربع', value: '500' },
  { name: '750 فوت مربع', value: '750' },
  { name: '1000 فوت مربع', value: '1000' },
  { name: '1250 فوت مربع', value: '1250' },
  { name: '1500 فوت مربع', value: '1500' },
  { name: '1750 فوت مربع', value: '1750' },
  { name: '2000 فوت مربع', value: '2000' },
  { name: '2250 فوت مربع', value: '2250' },
];

export const lotSizeOptions = [
  { name: '500 فوت مربع', value: '500' },
  { name: '750 فوت مربع', value: '750' },
  { name: '1000 فوت مربع', value: '1000' },
  { name: '1250 فوت مربع', value: '1250' },
  { name: '1500 فوت مربع', value: '1500' },
  { name: '1750 فوت مربع', value: '1750' },
  { name: '2000 فوت مربع', value: '2000' },
  { name: '2250 فوت مربع', value: '2250' },
];

export const soldInLastOptions = [
  { name: 'هر چیزی', value: 'any' },
  { name: '1 روز', value: '1_day' },
  { name: '7 روز', value: '7_days' },
  { name: '14 روز', value: '14_days' },
  { name: '30 روز', value: '30_days' },
  { name: '90 روز', value: '90_days' },
  { name: '6 ماه', value: '6 months' },
  { name: '1 سال', value: '1 year' },
];

export const noMinimumData = [
  { name: 'تومان0', value: 0 },
  { name: 'تومان10000', value: 10000 },
  { name: 'تومان20000', value: 20000 },
  { name: 'تومان30000', value: 30000 },
  { name: 'تومان40000', value: 40000 },
  { name: 'تومان50000', value: 50000 },
];

export const noMaximumData = [
  { name: 'تومان0', value: 0 },
  { name: 'تومان100000', value: 100000 },
  { name: 'تومان200000', value: 200000 },
  { name: 'تومان300000', value: 300000 },
  { name: 'تومان400000', value: 400000 },
  { name: 'تومان500000', value: 500000 },
];
