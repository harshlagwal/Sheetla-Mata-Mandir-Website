export interface TempleEvent {
  id: string;
  titleEn: string;
  titleHi: string;
  type: 'katha' | 'jagran' | 'bhandara' | 'mela' | 'festival' | 'notice';
  date?: string;
  endDate?: string;
  time?: string;
  locationEn: string;
  locationHi: string;
  descriptionEn: string;
  descriptionHi: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'date-pending';
  featured?: boolean;
  isNew?: boolean;
}

// =====================================================
// UPDATE TEMPLE EVENTS HERE
// Add confirmed dates/timings only when officially known.
// =====================================================
export const templeEvents: TempleEvent[] = [
  {
    id: 'upcoming-programme-1',
    titleEn: 'Upcoming Temple Programme',
    titleHi: 'आगामी मंदिर कार्यक्रम',
    type: 'festival',
    locationEn: 'Sheetla Mata Mandir, Lagdevi',
    locationHi: 'शीतला माता मंदिर, लगदेवी',
    descriptionEn: 'Details of the next sacred programme at Sheetla Mata Mandir, Lagdevi will be announced here.',
    descriptionHi: 'श्री शीतला माता मंदिर, लगदेवी के आगामी धार्मिक कार्यक्रम की जानकारी यहाँ प्रकाशित की जाएगी।',
    status: 'date-pending',
    featured: true,
  }
];
