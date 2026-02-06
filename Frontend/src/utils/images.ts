// Image utilities for handling product and slide images

const IMAGE_BASE_PATH = '/images';

// Map product names/slugs to image filenames
const productImageMap: Record<string, string> = {
  'exclusive-full-fowler-bed': '1 exclusive full fowler bed with standard 4 section mattress.jpg',
  'motor-recliner-bed-blue': '2 motor recliner hospital bed with blue mattress.jpg',
  'motor-recliner-bed-black': '3 motor recliner hospital bed with black mattress.jpg',
  'exclusive-automatic-bed': '4 exclusive automatic bed with 4 section mattress.jpg',
  'exclusive-5-function-bed': '5 exclusive 5 function automatic bed with exclusive mattress.jpg',
  'premium-5-function-bed': '6 premium 5 function patient bed with premium mattress.jpg',
  'nayome-premium-air-bed': '7 nayome swdn premium air bed mattress.jpg',
  'tubular-air-bed': '8 tubular air bed mattress.jpg',
  'bubble-air-bed': '9 bubble air bed mattress.jpg',
  'philips-everflo-5lpm': '10 philips everflo 5 lpm oxygen concentrator (1).jpg',
  'jay-10-oxygen-concentrator': '11 jay – 10 (10-b), 10 lpm oxygen concentrator.jpg',
  'oxy-med-portable': '12 oxy-med portable oxygen concentrator.jpg',
  'philips-simplygo-mini': '13 portable oxygen concentrator philips simply go mini.jpg',
  'philips-simplygo': '14 portable oxygen concentrator philips simply go.jpg',
  'philips-simplygo-mini-rent': '15 portable oxygen concentrator philips simply go mini on rent.jpg',
  'bmc-auto-cpap': '16 bmc auto cpap (cpap machine on rent).jpg',
  'philips-dreamstation-cpap': '17 philips dream station auto cpap (cpap machine on rent).jpg',
  'resmed-airsense-10': '18 resmed airsense 10 autoset (cpap machine on rent).jpg',
  'philips-dreamstation-bipap': '19 philips dream station auto bipap.jpg',
  'philips-dreamstation-bipap-st': '20 philips dream station bipap st.jpg',
  'philips-dreamstation-bipap-avaps': '21 philips dream station bipap avaps.jpg',
  'bipap-a40-pro': '22 bipap a40 pro machine.jpg',
  'resmed-lumis-100': '23 resmed lumis 100.jpg',
  'resmed-lumis-150': '24 resmed lumis 150.jpg',
  'resmed-stellar-150': '25 resmed stellar 150.jpg',
  'bmc-bipap-yt30': '26 bmc bipap yt30 machine.jpg',
  'philips-trilogy-evo': '27 phillips trilogy evo ventilator.jpg',
  'resmed-astral-150': '28 resmed astral 150 ventilator.jpg',
  'philips-trilogy-100': '29 phillips trilogy 100 ventilator.jpg',
  'rv-200-ventilator': '30 rv 200 ventilator.jpg',
  'shorya-ventilator': '31 shorya ventilator.jpg',
  'three-para-monitor': '32 three para patient monitor.jpg',
  'multi-para-monitor': '33 multi para five para patient monitor.jpg',
  'dvt-pump': '35 dvt pump.jpg',
  'infusion-pump': '36 infusion pump.jpg',
  'feeding-pump': '37 feeding pump.jpg',
  'lymph-pump': '38 lymph pump.jpg',
  'syringe-pump': '39 syringe pump.jpg',
  'suction-machine-single': '40 suction machine (single jar).jpg',
  'suction-machine-double': '41 suction machine (double jar).jpg',
  'suction-machine-battery': '42 suction machine (single jar) with battery backup.jpg',
  'manual-suction-machine': '43 manual suction machine.jpg',
};

// Slide images
const slideImages = [
  '1.png',
  '2.png', 
  '3.png',
  '4.jpg',
];

// Fallback placeholder image
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80';

/**
 * Get product image URL by slug or id
 */
export function getProductImage(slug: string): string {
  const filename = productImageMap[slug];
  if (filename) {
    return `${IMAGE_BASE_PATH}/products/${encodeURIComponent(filename)}`;
  }
  return PLACEHOLDER_IMAGE;
}

/**
 * Get product image URL from database image_url or fallback
 */
export function getProductImageUrl(imageUrl: string | null, slug?: string): string {
  if (imageUrl) {
    // If it's a full URL, return as is
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    // If it's a relative path, prepend base path
    if (imageUrl.startsWith('/')) {
      return imageUrl;
    }
    return `${IMAGE_BASE_PATH}/products/${encodeURIComponent(imageUrl)}`;
  }
  
  // Try to get from slug mapping
  if (slug) {
    return getProductImage(slug);
  }
  
  return PLACEHOLDER_IMAGE;
}

/**
 * Get slide image URL by index (1-based)
 */
export function getSlideImage(index: number): string {
  if (index >= 1 && index <= slideImages.length) {
    return `${IMAGE_BASE_PATH}/slides/${slideImages[index - 1]}`;
  }
  return PLACEHOLDER_IMAGE;
}

/**
 * Get all slide images
 */
export function getAllSlideImages(): string[] {
  return slideImages.map((filename) => `${IMAGE_BASE_PATH}/slides/${filename}`);
}

/**
 * Image component with fallback handling
 */
export function handleImageError(event: React.SyntheticEvent<HTMLImageElement>): void {
  const target = event.target as HTMLImageElement;
  target.src = PLACEHOLDER_IMAGE;
  target.onerror = null; // Prevent infinite loop
}

export { PLACEHOLDER_IMAGE };
