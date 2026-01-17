
import { Item, User, Transaction, TransactionStatus } from './types';

export const MOCK_CURRENT_USER: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  avatar: 'https://picsum.photos/seed/alex/200',
  trustScore: 92,
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
    ownerName: 'Bob Builder',
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
    ownerName: 'Jake Outdoors',
    ownerTrustScore: 95,
    title: '4-Person Waterproof Tent',
    description: 'High-quality camping tent, easy setup, used only once. Perfect for weekend trips.',
    category: 'Camping',
    pricePerDay: 25,
    depositAmount: 100,
    insuranceFee: 10,
    imageUrl: 'https://picsum.photos/seed/tent/600/400',
    location: { lat: 40.7180, lng: -74.0000, address: 'Chinatown, New York' },
    distance: 1.2
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
  }
];
