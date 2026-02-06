import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, ChevronUp, Search, MessageCircle, Heart, Bed, Wind, Stethoscope, MapPin, Phone, Star, Users, Award, Clock } from 'lucide-react';
import { Button } from '../components/Button';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  icon: string;
}

const FAQ_CATEGORIES = [
  { id: 'all', name: 'All Questions', icon: 'HelpCircle', count: 80 },
  { id: 'cpap', name: 'CPAP/BiPAP', icon: 'Wind', count: 8 },
  { id: 'ventilators', name: 'Ventilators', icon: 'Stethoscope', count: 6 },
  { id: 'beds', name: 'Hospital Beds', icon: 'Bed', count: 12 },
  { id: 'oxygen', name: 'Oxygen Equipment', icon: 'Heart', count: 10 },
  { id: 'icu', name: 'ICU Setup', icon: 'Award', count: 8 },
  { id: 'locations', name: 'Locations', icon: 'MapPin', count: 36 }
];

const FAQ_DATA: FAQItem[] = [
  // CPAP/BiPAP Section
  {
    question: "Where can I find a CPAP machine dealer in Borivali?",
    answer: "You can find a CPAP machine dealer in Borivali offering sales, rentals, mask fitting, and home delivery for sleep apnea patients.",
    category: "cpap",
    icon: "Wind"
  },
  {
    question: "Is CPAP machine available on rent in Borivali West?",
    answer: "Yes, CPAP machines are available on rent in Borivali West with flexible daily, weekly, and monthly rental plans.",
    category: "cpap",
    icon: "Wind"
  },
  {
    question: "Who is a reliable CPAP machine supplier in Kandivali?",
    answer: "A reliable CPAP machine supplier in Kandivali provides certified machines, accessories, and after-sales support.",
    category: "cpap",
    icon: "Wind"
  },
  {
    question: "Where can I get a CPAP machine near me in Mumbai?",
    answer: "CPAP machines are available across Mumbai with doorstep delivery and setup services.",
    category: "cpap",
    icon: "Wind"
  },
  {
    question: "Is there a BiPAP machine dealer in Kandivali West?",
    answer: "Yes, BiPAP machine dealers in Kandivali West supply machines for COPD and advanced respiratory care.",
    category: "cpap",
    icon: "Wind"
  },
  {
    question: "Can I rent a BiPAP machine in Malad?",
    answer: "BiPAP machines are available on rent in Malad for short-term and long-term respiratory support.",
    category: "cpap",
    icon: "Wind"
  },
  {
    question: "Who supplies BiPAP machines in Goregaon?",
    answer: "BiPAP machine suppliers in Goregaon provide hospital-grade machines with installation support.",
    category: "cpap",
    icon: "Wind"
  },
  {
    question: "What is the price of BiPAP and CPAP machines in Mumbai?",
    answer: "Prices vary based on model and features, with affordable rental and purchase options available in Mumbai.",
    category: "cpap",
    icon: "Wind"
  },

  // Ventilators Section
  {
    question: "Where can I find a ventilator machine dealer in Andheri?",
    answer: "Ventilator machine dealers in Andheri supply ICU-grade ventilators for hospitals and home ICU use.",
    category: "ventilators",
    icon: "Stethoscope"
  },
  {
    question: "Is ventilator available on rent in Jogeshwari?",
    answer: "Yes, ventilators are available on rent in Jogeshwari with emergency delivery options.",
    category: "ventilators",
    icon: "Stethoscope"
  },
  {
    question: "Who is a ventilator machine supplier in Mumbai?",
    answer: "Mumbai has trusted ventilator suppliers providing ICU and home-care ventilators.",
    category: "ventilators",
    icon: "Stethoscope"
  },
  {
    question: "Who supplies ventilator ICU equipment in Mumbai?",
    answer: "Ventilator ICU equipment suppliers in Mumbai serve hospitals and homes.",
    category: "ventilators",
    icon: "Stethoscope"
  },
  {
    question: "Is emergency ventilator rental available in Mumbai?",
    answer: "Yes, emergency ventilator rental services are available.",
    category: "ventilators",
    icon: "Stethoscope"
  },
  {
    question: "Who is a home ventilator supplier in Mumbai?",
    answer: "Home ventilator suppliers in Mumbai support long-term respiratory care.",
    category: "ventilators",
    icon: "Stethoscope"
  },

  // ICU Setup Section
  {
    question: "Do you provide Home ICU setup service in Andheri West?",
    answer: "Yes, complete Home ICU setup services are available in Andheri West.",
    category: "icu",
    icon: "Award"
  },
  {
    question: "Who provides Home ICU setup in Mumbai?",
    answer: "Professional providers in Mumbai offer end-to-end Home ICU setup with equipment and support.",
    category: "icu",
    icon: "Award"
  },
  {
    question: "Is ICU setup at home available in Borivali?",
    answer: "Yes, ICU setup at home in Borivali includes ICU beds, ventilators, and monitoring systems.",
    category: "icu",
    icon: "Award"
  },
  {
    question: "Is ICU room setup at home available in Mumbai?",
    answer: "Yes, ICU room setup at home is available in Mumbai.",
    category: "icu",
    icon: "Award"
  },
  {
    question: "Do you provide Home ICU setup service in Mumbai?",
    answer: "Yes, complete Home ICU setup services are available across Mumbai.",
    category: "icu",
    icon: "Award"
  },
  {
    question: "Who supplies ICU equipment in Andheri West?",
    answer: "ICU equipment suppliers in Andheri West serve hospitals and homes.",
    category: "icu",
    icon: "Award"
  },
  {
    question: "Who is a critical care equipment dealer in Mumbai?",
    answer: "Critical care equipment dealers in Mumbai supply essential ICU equipment.",
    category: "icu",
    icon: "Award"
  },
  {
    question: "Who supplies critical care equipment in Mumbai?",
    answer: "Critical care equipment suppliers in Mumbai serve hospitals and homes.",
    category: "icu",
    icon: "Award"
  },

  // Hospital Beds Section
  {
    question: "Where can I find a hospital bed dealer in Kandivali?",
    answer: "Hospital bed dealers in Kandivali supply beds for home care and hospitals.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Is hospital bed available on rent in Malad?",
    answer: "Yes, hospital beds are available on rent in Malad with quick delivery.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Who is a hospital bed supplier in Goregaon?",
    answer: "Goregaon has reliable hospital bed suppliers for home and medical use.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Do you provide hospital bed rental in Mumbai?",
    answer: "Yes, hospital bed rental services are available across Mumbai.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Is there an electric hospital bed dealer in Andheri?",
    answer: "Yes, electric hospital bed dealers in Andheri provide advanced adjustable beds.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Can I rent an electric hospital bed in Bandra?",
    answer: "Electric hospital beds are available on rent in Bandra.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Who supplies electric hospital beds in Mumbai?",
    answer: "Electric hospital bed suppliers in Mumbai provide sales and rental services.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Where can I get a patient bed for home care in Mumbai?",
    answer: "Patient beds for home care are available across Mumbai.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Who is a hospital furniture supplier in Mumbai?",
    answer: "Hospital furniture suppliers in Mumbai provide beds and medical furniture.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Who is an ICU bed supplier in Mumbai?",
    answer: "ICU bed suppliers in Mumbai offer sales and rentals.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Is ICU bed available on rent in Mumbai?",
    answer: "Yes, ICU beds are available on rent in Mumbai.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Where can I get an electric patient bed in Mumbai?",
    answer: "Electric patient beds are available across Mumbai.",
    category: "beds",
    icon: "Bed"
  },

  // Oxygen Equipment Section
  {
    question: "Who is an oxygen machine dealer in Borivali?",
    answer: "Oxygen machine dealers in Borivali supply concentrators and portable oxygen machines.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Is oxygen machine available on rent in Kandivali?",
    answer: "Yes, oxygen machines are available on rent in Kandivali.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Who is an oxygen concentrator supplier in Mumbai?",
    answer: "Mumbai has trusted oxygen concentrator suppliers for home care.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Can I rent an oxygen concentrator in Andheri?",
    answer: "Oxygen concentrators are available on rent in Andheri.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Where can I find portable oxygen machines in Mumbai?",
    answer: "Portable oxygen machines are available throughout Mumbai.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Do you provide home oxygen service in Mumbai?",
    answer: "Yes, home oxygen services are available across Mumbai.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Are oxygen cylinders and concentrators available in Mumbai?",
    answer: "Yes, both oxygen cylinders and concentrators are available.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Where can I find a medical oxygen machine near me?",
    answer: "Medical oxygen machines are available locally across Mumbai.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Who supplies oxygen concentrators in Andheri East?",
    answer: "Oxygen concentrator suppliers operate in Andheri East.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Who is an oxygen concentrator dealer in Dahisar?",
    answer: "Oxygen concentrator dealers in Dahisar provide sales and rentals.",
    category: "oxygen",
    icon: "Heart"
  },

  // Locations Section (remaining questions)
  {
    question: "Who is a DVT machine dealer in Mumbai?",
    answer: "DVT machine dealers in Mumbai supply compression therapy equipment.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Is DVT machine available on rent in Bandra?",
    answer: "Yes, DVT machines are available on rent in Bandra.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is a DVT compression machine supplier?",
    answer: "DVT compression machine suppliers provide equipment for clot prevention therapy.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Where can I get a DVT pump machine in Mumbai?",
    answer: "DVT pump machines are available across Mumbai.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Is there a CPM machine dealer in Dadar?",
    answer: "Yes, CPM machine dealers in Dadar supply knee rehabilitation equipment.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Can I rent a CPM machine in Prabhadevi?",
    answer: "CPM machines are available on rent in Prabhadevi.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is a CPM machine supplier in Mumbai?",
    answer: "CPM machine suppliers in Mumbai provide rehab equipment for knee therapy.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Is CPM knee machine rental available?",
    answer: "Yes, CPM knee machine rental is available across Mumbai.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who supplies adjustable hospital beds?",
    answer: "Adjustable hospital bed suppliers serve Mumbai locations.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Where can I find medical bed rental near me?",
    answer: "Medical bed rental services are available locally in Mumbai.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Do you provide oxygen machine emergency service in Mumbai?",
    answer: "Yes, emergency oxygen machine services are available in Mumbai.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Where can I find a CPAP machine medical store in Mumbai?",
    answer: "CPAP machine medical stores operate across Mumbai.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is a BiPAP machine medical supplier in Mumbai?",
    answer: "BiPAP medical suppliers in Mumbai offer advanced respiratory devices.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is a respiratory equipment dealer in Mumbai?",
    answer: "Respiratory equipment dealers supply oxygen and ventilation devices.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Where can I find pulmonary care equipment in Mumbai?",
    answer: "Pulmonary care equipment is available across Mumbai.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Do you provide home medical setup in Mumbai?",
    answer: "Yes, complete home medical setup services are available.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Is post surgery equipment rental available in Mumbai?",
    answer: "Yes, post-surgery equipment rental is widely available.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is a rehabilitation equipment supplier in Mumbai?",
    answer: "Rehabilitation equipment suppliers support recovery therapy.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Is physiotherapy machine rental available in Mumbai?",
    answer: "Yes, physiotherapy machines are available on rent.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Where can I find knee therapy CPM machines in Mumbai?",
    answer: "CPM knee therapy machines are available across Mumbai.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who supplies elderly care equipment in Mumbai?",
    answer: "Elderly care equipment suppliers serve homes and care centers.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is a patient care equipment dealer in Mumbai?",
    answer: "Patient care equipment dealers supply essential medical devices.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Is hospital bed with mattress available in Mumbai?",
    answer: "Yes, hospital beds with mattress are available for rent and sale.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Where can I find a folding hospital bed in Mumbai?",
    answer: "Folding hospital beds are available across Mumbai.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is a wheeled hospital bed supplier?",
    answer: "Wheeled hospital bed suppliers serve hospitals and homes.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is a medical equipment wholesale supplier in Mumbai?",
    answer: "Wholesale medical equipment suppliers serve hospitals and clinics.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Where can I get a CPAP machine in Mira Road?",
    answer: "CPAP machines are available in Mira Road with delivery support.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is a BiPAP machine dealer in Dahisar West?",
    answer: "BiPAP machine dealers in Dahisar West supply respiratory devices.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Where can I find hospital beds in Mira Road?",
    answer: "Hospital beds are available in Mira Road for home care.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who supplies oxygen machines in Mira Road?",
    answer: "Oxygen machine suppliers operate in Mira Road.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is a medical equipment supplier in Borivali?",
    answer: "Medical equipment suppliers in Borivali provide full home-care solutions.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Where can I get hospital beds in Bandra West?",
    answer: "Hospital beds are available in Bandra West.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is a CPAP BiPAP machine supplier in Mumbai?",
    answer: "CPAP and BiPAP machine suppliers in Mumbai provide sales and rentals.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Where can I find a sleep apnea machine dealer in Mumbai?",
    answer: "Sleep apnea machine dealers in Mumbai supply CPAP and BiPAP devices.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Is ICU equipment rental available in Mumbai?",
    answer: "Yes, ICU equipment rental services are available in Mumbai.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Can I rent medical equipment in Mumbai?",
    answer: "Yes, medical equipment rental is available across Mumbai.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is a home care equipment dealer in Mumbai?",
    answer: "Home care equipment dealers in Mumbai supply patient support devices.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Is DVT machine available on rent in Bandra?",
    answer: "Yes, DVT machines are available on rent in Bandra.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is a DVT compression machine supplier?",
    answer: "DVT compression machine suppliers provide equipment for clot prevention therapy.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Where can I get a DVT pump machine in Mumbai?",
    answer: "DVT pump machines are available across Mumbai.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Is there a CPM machine dealer in Dadar?",
    answer: "Yes, CPM machine dealers in Dadar supply knee rehabilitation equipment.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Can I rent a CPM machine in Prabhadevi?",
    answer: "CPM machines are available on rent in Prabhadevi.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is a CPM machine supplier in Mumbai?",
    answer: "CPM machine suppliers in Mumbai provide rehab equipment for knee therapy.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Is CPM knee machine rental available?",
    answer: "Yes, CPM knee machine rental is available across Mumbai.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is an oxygen machine dealer in Borivali?",
    answer: "Oxygen machine dealers in Borivali supply concentrators and portable oxygen machines.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Is oxygen machine available on rent in Kandivali?",
    answer: "Yes, oxygen machines are available on rent in Kandivali.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Who is an oxygen concentrator supplier in Mumbai?",
    answer: "Mumbai has trusted oxygen concentrator suppliers for home care.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Can I rent an oxygen concentrator in Andheri?",
    answer: "Oxygen concentrators are available on rent in Andheri.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Where can I find portable oxygen machines in Mumbai?",
    answer: "Portable oxygen machines are available throughout Mumbai.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Do you provide home oxygen service in Mumbai?",
    answer: "Yes, home oxygen services are available across Mumbai.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Are oxygen cylinders and concentrators available in Mumbai?",
    answer: "Yes, both oxygen cylinders and concentrators are available.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Where can I find a medical oxygen machine near me?",
    answer: "Medical oxygen machines are available locally across Mumbai.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Who is a CPAP BiPAP machine supplier in Mumbai?",
    answer: "CPAP and BiPAP machine suppliers in Mumbai provide sales and rentals.",
    category: "cpap",
    icon: "Wind"
  },
  {
    question: "Where can I find a sleep apnea machine dealer in Mumbai?",
    answer: "Sleep apnea machine dealers in Mumbai supply CPAP and BiPAP devices.",
    category: "cpap",
    icon: "Wind"
  },
  {
    question: "Is ICU equipment rental available in Mumbai?",
    answer: "Yes, ICU equipment rental services are available in Mumbai.",
    category: "icu",
    icon: "Award"
  },
  {
    question: "Who supplies critical care equipment in Mumbai?",
    answer: "Critical care equipment suppliers in Mumbai serve hospitals and homes.",
    category: "icu",
    icon: "Award"
  },
  {
    question: "Can I rent medical equipment in Mumbai?",
    answer: "Yes, medical equipment rental is available across Mumbai.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is a home care equipment dealer in Mumbai?",
    answer: "Home care equipment dealers in Mumbai supply patient support devices.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is a hospital furniture supplier in Mumbai?",
    answer: "Hospital furniture suppliers in Mumbai provide beds and medical furniture.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Who is an ICU bed supplier in Mumbai?",
    answer: "ICU bed suppliers in Mumbai offer sales and rentals.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Is ICU bed available on rent in Mumbai?",
    answer: "Yes, ICU beds are available on rent in Mumbai.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Where can I get an electric patient bed in Mumbai?",
    answer: "Electric patient beds are available across Mumbai.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Who supplies adjustable hospital beds?",
    answer: "Adjustable hospital bed suppliers serve Mumbai locations.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Where can I find medical bed rental near me?",
    answer: "Medical bed rental services are available locally in Mumbai.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Who supplies ventilator ICU equipment in Mumbai?",
    answer: "Ventilator ICU equipment suppliers operate across Mumbai.",
    category: "ventilators",
    icon: "Stethoscope"
  },
  {
    question: "Who is a home ventilator supplier in Mumbai?",
    answer: "Home ventilator suppliers in Mumbai support long-term respiratory care.",
    category: "ventilators",
    icon: "Stethoscope"
  },
  {
    question: "Is emergency ventilator rental available in Mumbai?",
    answer: "Yes, emergency ventilator rental services are available.",
    category: "ventilators",
    icon: "Stethoscope"
  },
  {
    question: "Do you provide oxygen machine emergency service in Mumbai?",
    answer: "Yes, emergency oxygen machine services are available in Mumbai.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Where can I find a CPAP machine medical store in Mumbai?",
    answer: "CPAP machine medical stores operate across Mumbai.",
    category: "cpap",
    icon: "Wind"
  },
  {
    question: "Who is a BiPAP machine medical supplier in Mumbai?",
    answer: "BiPAP medical suppliers in Mumbai offer advanced respiratory devices.",
    category: "cpap",
    icon: "Wind"
  },
  {
    question: "Who is a respiratory equipment dealer in Mumbai?",
    answer: "Respiratory equipment dealers supply oxygen and ventilation devices.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Where can I find pulmonary care equipment in Mumbai?",
    answer: "Pulmonary care equipment is available across Mumbai.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Do you provide home medical setup in Mumbai?",
    answer: "Yes, complete home medical setup services are available.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Is post surgery equipment rental available in Mumbai?",
    answer: "Yes, post-surgery equipment rental is widely available.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is a rehabilitation equipment supplier in Mumbai?",
    answer: "Rehabilitation equipment suppliers support recovery therapy.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Is physiotherapy machine rental available in Mumbai?",
    answer: "Yes, physiotherapy machines are available on rent.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Where can I find knee therapy CPM machines in Mumbai?",
    answer: "CPM knee therapy machines are available across Mumbai.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who supplies elderly care equipment in Mumbai?",
    answer: "Elderly care equipment suppliers serve homes and care centers.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is a patient care equipment dealer in Mumbai?",
    answer: "Patient care equipment dealers supply essential medical devices.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Is hospital bed with mattress available in Mumbai?",
    answer: "Yes, hospital beds with mattress are available for rent and sale.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Where can I get a folding hospital bed in Mumbai?",
    answer: "Folding hospital beds are available across Mumbai.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Who is a wheeled hospital bed supplier?",
    answer: "Wheeled hospital bed suppliers serve hospitals and homes.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Is ICU room setup at home available in Mumbai?",
    answer: "Yes, ICU room setup at home is available in Mumbai.",
    category: "icu",
    icon: "Award"
  },
  {
    question: "Who is a medical equipment wholesale supplier in Mumbai?",
    answer: "Wholesale medical equipment suppliers serve hospitals and clinics.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who is an oxygen concentrator dealer in Dahisar?",
    answer: "Oxygen concentrator dealers in Dahisar provide sales and rentals.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Where can I get a CPAP machine in Mira Road?",
    answer: "CPAP machines are available in Mira Road with delivery support.",
    category: "cpap",
    icon: "Wind"
  },
  {
    question: "Who is a BiPAP machine dealer in Dahisar West?",
    answer: "BiPAP machine dealers in Dahisar West supply respiratory devices.",
    category: "cpap",
    icon: "Wind"
  },
  {
    question: "Where can I find hospital beds in Mira Road?",
    answer: "Hospital beds are available in Mira Road for home care.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Who supplies oxygen machines in Mira Road?",
    answer: "Oxygen machine suppliers operate in Mira Road.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Who is a medical equipment supplier in Borivali?",
    answer: "Medical equipment suppliers in Borivali provide full home-care solutions.",
    category: "locations",
    icon: "MapPin"
  },
  {
    question: "Who supplies ICU equipment in Andheri West?",
    answer: "ICU equipment suppliers in Andheri West serve hospitals and homes.",
    category: "icu",
    icon: "Award"
  },
  {
    question: "Where can I get hospital beds in Bandra West?",
    answer: "Hospital beds are available in Bandra West.",
    category: "beds",
    icon: "Bed"
  },
  {
    question: "Who supplies oxygen concentrators in Andheri East?",
    answer: "Oxygen concentrator suppliers operate in Andheri East.",
    category: "oxygen",
    icon: "Heart"
  },
  {
    question: "Do you provide Home ICU setup service in Mumbai?",
    answer: "Yes, complete Home ICU setup services are available across Mumbai.",
    category: "icu",
    icon: "Award"
  }
];

export const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const filteredFAQs = FAQ_DATA.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Wind, Heart, Bed, Stethoscope, MapPin, Award
    };
    return icons[iconName] || Search;
  };

  return (
    <div className="min-h-screen pt-12 md:pt-14 lg:pt-16 xl:pt-20">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0891b2] via-[#0ea5e9] to-[#14b8a6]">
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
            >
              <MessageCircle className="w-10 h-10" />
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Frequently Asked
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Questions
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Find comprehensive answers to all your medical equipment questions across Mumbai
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">80+</div>
                <div className="text-white/80 text-sm">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">7</div>
                <div className="text-white/80 text-sm">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">24/7</div>
                <div className="text-white/80 text-sm">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">100%</div>
                <div className="text-white/80 text-sm">Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search through 80+ questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#0891b2]/20 focus:border-[#0891b2] text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {FAQ_CATEGORIES.map((category) => {
              const IconComponent = getIcon(category.icon);
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-[#0891b2] text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-6">
          {filteredFAQs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">No questions found</h3>
              <p className="text-gray-500 text-lg">Try adjusting your search or category filter</p>
            </motion.div>
          ) : (
            filteredFAQs.map((faq, index) => {
              const IconComponent = getIcon(faq.icon);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#0891b2]/20">
                    <button
                      onClick={() => toggleExpanded(index)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-[#0891b2]/5 hover:to-[#14b8a6]/5 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`p-3 rounded-xl transition-all duration-300 ${
                          expandedItems.has(index)
                            ? 'bg-[#0891b2] text-white'
                            : 'bg-gray-100 text-[#0891b2] group-hover:bg-[#0891b2] group-hover:text-white'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg lg:text-xl font-semibold text-[#1a2332] pr-4 leading-relaxed">
                          {faq.question}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedItems.has(index) ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className={`w-6 h-6 transition-colors duration-300 ${
                          expandedItems.has(index) ? 'text-[#0891b2]' : 'text-gray-400'
                        }`} />
                      </motion.div>
                    </button>

                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedItems.has(index) ? 'auto' : 0,
                        opacity: expandedItems.has(index) ? 1 : 0
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2">
                        <div className="w-1 bg-gradient-to-b from-[#0891b2] to-[#14b8a6] h-1 rounded-full mb-4 ml-16"></div>
                        <p className="text-[#64748b] leading-relaxed text-base lg:text-lg pl-16">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Enhanced Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0891b2] to-[#14b8a6] rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative glass-card rounded-3xl p-8 lg:p-12 text-center border-2 border-white/20">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#0891b2] to-[#14b8a6] rounded-full mb-6"
              >
                <Phone className="w-8 h-8 text-white" />
              </motion.div>

              <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2332] mb-4">
                Still have questions?
              </h2>

              <p className="text-[#64748b] text-lg lg:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                Our expert team is ready to help you find the perfect medical equipment solution for your needs across Mumbai
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  variant="primary"
                  className="flex items-center gap-3 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact Us on WhatsApp
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center gap-3 px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </Button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Expert Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>5-Star Service</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};