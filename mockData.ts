
import { Item, User, Transaction, TransactionStatus } from './types';

export const MOCK_CURRENT_USER: User = {
  id: 'user-1',
  name: 'R G',
  avatar: 'https://picsum.photos/seed/alex/200',
  trustScore: 99,
  isVerified: true,
  kycStatus: 'VERIFIED',
  location: { lat: 40.7128, lng: -74.0060 }
};

export const MOCK_ITEMS: Item[] = [
  {
    id: 'item-1',
    ownerId: 'owner-1',
    ownerName: 'Sarah Miller',
    ownerTrustScore: 98,
    title: 'Sony A7III Professional Camera',
    description: 'Barely used mirrorless camera with 24-70mm lens. Great for high-end photography.',
    category: 'Electronics',
    pricePerDay: 45,
    depositAmount: 200,
    insuranceFee: 15,
    imageUrl: 'https://picsum.photos/seed/camera/600/400',
    location: { lat: 40.7150, lng: -74.0080, address: 'Tribeca, New York' },
    distance: 0.4
  },
  {
    id: 'item-2',
    ownerId: 'owner-2',
    ownerName: 'Marcus Chen',
    ownerTrustScore: 85,
    title: 'Heavy Duty Power Drill Set',
    description: 'DeWalt brushless drill with 2 batteries and charger. Powerful and reliable.',
    category: 'Tools',
    pricePerDay: 15,
    depositAmount: 50,
    insuranceFee: 5,
    imageUrl: 'https://picsum.photos/seed/drill/600/400',
    location: { lat: 40.7110, lng: -74.0100, address: 'Financial District, New York' },
    distance: 0.8
  },
  {
    id: 'item-3',
    ownerId: 'owner-3',
    ownerName: 'Elena Rodriguez',
    ownerTrustScore: 96,
    title: '4-Person Waterproof Tent',
    description: 'High-quality camping tent, easy setup, used only once. Perfect for weekend trips.',
    category: 'Camping',
    pricePerDay: 25,
    depositAmount: 100,
    insuranceFee: 10,
    imageUrl: 'https://picsum.photos/seed/tent/600/400',
    location: { lat: 40.7180, lng: -74.0000, address: 'Chinatown, New York' },
    distance: 1.2
  },
  {
    id: 'item-4',
    ownerId: 'user-1',
    ownerName: 'R G',
    ownerTrustScore: 99,
    title: 'Mountain Bike X-200',
    description: 'Perfect for local trails. Well maintained, includes helmet and lock.',
    category: 'Vehicle',
    pricePerDay: 35,
    depositAmount: 150,
    insuranceFee: 12,
    imageUrl: 'https://picsum.photos/seed/bike/600/400',
    location: { lat: 40.7130, lng: -74.0050, address: 'SoHo, New York' },
    distance: 0.2
  },
  {
    id: 'item-5',
    ownerId: 'owner-5',
    ownerName: 'James Wilson',
    ownerTrustScore: 92,
    title: 'DJI Mavic Air 2 Drone',
    description: '4K camera drone with fly more combo. Excellent for aerial cinematography.',
    category: 'Media',
    pricePerDay: 55,
    depositAmount: 300,
    insuranceFee: 20,
    imageUrl: 'https://picsum.photos/seed/drone/600/400',
    location: { lat: 40.7200, lng: -74.0020, address: 'Greenwich Village, NY' },
    distance: 0.9
  },
  {
    id: 'item-6',
    ownerId: 'owner-6',
    ownerName: 'Sophia Kim',
    ownerTrustScore: 97,
    title: 'KitchenAid Artisan Mixer',
    description: '5-quart stand mixer with all attachments. Perfect for baking enthusiasts.',
    category: 'Home',
    pricePerDay: 18,
    depositAmount: 80,
    insuranceFee: 6,
    imageUrl: 'https://picsum.photos/seed/mixer/600/400',
    location: { lat: 40.7140, lng: -74.0120, address: 'Battery Park, New York' },
    distance: 1.1
  },
  {
    id: 'item-7',
    ownerId: 'owner-7',
    ownerName: 'Liam O’Brien',
    ownerTrustScore: 89,
    title: 'Professional Steam Cleaner',
    description: 'Multi-purpose steam cleaner for deep cleaning carpets and upholstery.',
    category: 'Tools',
    pricePerDay: 30,
    depositAmount: 120,
    insuranceFee: 8,
    imageUrl: 'https://picsum.photos/seed/cleaner/600/400',
    location: { lat: 40.7105, lng: -74.0040, address: 'Two Bridges, New York' },
    distance: 0.7
  },
  {
    id: 'item-8',
    ownerId: 'owner-8',
    ownerName: 'Isabella Silva',
    ownerTrustScore: 94,
    title: 'Nintendo Switch OLED',
    description: 'Latest model with 3 popular games included. Perfect for travel or parties.',
    category: 'Electronics',
    pricePerDay: 20,
    depositAmount: 100,
    insuranceFee: 7,
    imageUrl: 'https://picsum.photos/seed/switch/600/400',
    location: { lat: 40.7220, lng: -74.0100, address: 'Hudson Square, NY' },
    distance: 1.5
  },
  {
    id: 'item-9',
    ownerId: 'owner-9',
    ownerName: 'David Zhang',
    ownerTrustScore: 82,
    title: 'Electric Pressure Washer',
    description: '2000 PSI pressure washer. Great for cleaning patios, cars, and siding.',
    category: 'Tools',
    pricePerDay: 22,
    depositAmount: 70,
    insuranceFee: 6,
    imageUrl: 'https://picsum.photos/seed/washer/600/400',
    location: { lat: 40.7160, lng: -73.9980, address: 'Lower East Side, NY' },
    distance: 1.8
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    itemId: 'item-1',
    itemTitle: 'Sony A7III Professional Camera',
    renterId: 'user-1',
    ownerId: 'owner-1',
    startDate: '2023-10-25',
    endDate: '2023-10-27',
    totalAmount: 105,
    status: TransactionStatus.HANDOVER_IN_PROGRESS,
    otpCode: '8824'
  },
  {
    id: 'tx-2',
    itemId: 'item-2',
    itemTitle: 'Heavy Duty Power Drill Set',
    renterId: 'user-1',
    ownerId: 'owner-2',
    startDate: '2023-10-20',
    endDate: '2023-10-22',
    totalAmount: 35,
    status: TransactionStatus.ACTIVE,
    otpCode: '1234'
  },
  {
    id: 'tx-3',
    itemId: 'item-4',
    itemTitle: 'Mountain Bike X-200',
    renterId: 'renter-2',
    ownerId: 'user-1',
    startDate: '2023-11-01',
    endDate: '2023-11-03',
    totalAmount: 82,
    status: TransactionStatus.REQUESTED,
    otpCode: '9981'
  }
];
