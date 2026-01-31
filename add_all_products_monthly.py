import requests
import time

base = 'http://127.0.0.1:8002'

# Categories
categories = [
    {'name': 'Hospital Bed', 'slug': 'hospitalbed', 'description': 'Medical grade hospital beds'},
    {'name': 'Air Mattress', 'slug': 'airmattress', 'description': 'Pressure relief air mattresses'},
    {'name': 'Oxygen Concentrators', 'slug': 'oxygenconcentrator', 'description': 'Oxygen concentration devices'},
    {'name': 'CPAP Machines', 'slug': 'cpap', 'description': 'Continuous Positive Airway Pressure machines'},
    {'name': 'BiPAP Machines', 'slug': 'bipap', 'description': 'Bilevel Positive Airway Pressure machines'},
    {'name': 'Ventilators', 'slug': 'ventilator', 'description': 'Mechanical ventilation devices'},
    {'name': 'Patient Monitors', 'slug': 'patientmonitor', 'description': 'Patient vital signs monitors'},
    {'name': 'DVT & Lymph Pumps', 'slug': 'dvtlymphpump', 'description': 'DVT and lymphatic pumps'},
    {'name': 'Infusion & Feeding Pumps', 'slug': 'feedinginfusionsyringe', 'description': 'Infusion and feeding pumps'},
    {'name': 'Suction Machines', 'slug': 'suctionmachine', 'description': 'Medical suction devices'},
]

cat_ids = {}

print('Creating Categories...')
print('='*60)

for cat in categories:
    try:
        r = requests.post(base + '/api/categories', json=cat, timeout=5)
        if r.status_code == 201:
            cat_data = r.json()
            cat_ids[cat['slug']] = cat_data['id']
            print('✓ ' + cat['name'])
        elif r.status_code == 400 and 'already exists' in r.text:
            r_get = requests.get(base + f'/api/categories/{cat["slug"]}', timeout=5)
            if r_get.status_code == 200:
                cat_data = r_get.json()
                cat_ids[cat['slug']] = cat_data['id']
                print('✓ ' + cat['name'] + ' (existing)')
        else:
            print('✗ ' + cat['name'] + ' - ' + str(r.status_code))
    except Exception as e:
        print('✗ ' + cat['name'] + ' - ' + str(e))
    time.sleep(0.5)

print('='*60)
print('Total Categories: ' + str(len(cat_ids)))
print('')

# Products with monthly pricing (1 month, 2 months, 3 months)
# Pricing: 1 month = base, 2 months = base × 2 × 0.95 (5% discount), 3 months = base × 3 × 0.90 (10% discount)
products = [
    # Hospital Beds (5)
    {'name': 'Exclusive Full Fowler Bed with Standard 4 Section Mattress', 'slug': 'full-fowler-bed', 'category': 'hospitalbed', '1month': 12000, '2month': 22800, '3month': 32400},
    {'name': 'Motor Recliner Hospital Bed with Blue Mattress', 'slug': 'motor-recliner-blue', 'category': 'hospitalbed', '1month': 13500, '2month': 25650, '3month': 36450},
    {'name': 'Motor Recliner Hospital Bed with Black Mattress', 'slug': 'motor-recliner-black', 'category': 'hospitalbed', '1month': 13500, '2month': 25650, '3month': 36450},
    {'name': 'Exclusive Automatic Bed with 4 Section Mattress', 'slug': 'automatic-bed-4-section', 'category': 'hospitalbed', '1month': 15000, '2month': 28500, '3month': 40500},
    {'name': 'Exclusive 5 Function Automatic Bed with Exclusive Mattress', 'slug': 'automatic-bed-5-function', 'category': 'hospitalbed', '1month': 16500, '2month': 31350, '3month': 44550},
    
    # Air Mattress (3)
    {'name': 'Bubble Air Bed Mattress', 'slug': 'bubble-air-mattress', 'category': 'airmattress', '1month': 4500, '2month': 8550, '3month': 12150},
    {'name': 'Tubular Air Bed Mattress', 'slug': 'tubular-air-mattress', 'category': 'airmattress', '1month': 5400, '2month': 10260, '3month': 14580},
    {'name': 'Nayome SWDN Premium Air Bed Mattress', 'slug': 'nayome-premium-air-mattress', 'category': 'airmattress', '1month': 6000, '2month': 11400, '3month': 16200},
    
    # Oxygen Concentrators (6)
    {'name': 'Philips EverFlo 5 LPM Oxygen Concentrator', 'slug': 'philips-everflow-5', 'category': 'oxygenconcentrator', '1month': 9000, '2month': 17100, '3month': 24300},
    {'name': 'Jay-10 (10-b) 10 LPM Oxygen Concentrator', 'slug': 'jay-10-10lpm', 'category': 'oxygenconcentrator', '1month': 10500, '2month': 19950, '3month': 28350},
    {'name': 'Oxy-Med Portable Oxygen Concentrator', 'slug': 'oxy-med-portable', 'category': 'oxygenconcentrator', '1month': 12000, '2month': 22800, '3month': 32400},
    {'name': 'Philips SimplyGo Mini - Portable Oxygen Concentrator', 'slug': 'philips-simplygo-mini', 'category': 'oxygenconcentrator', '1month': 13500, '2month': 25650, '3month': 36450},
    {'name': 'Portable Oxygen Concentrator - Philips SimplyGo', 'slug': 'portable-simplygo', 'category': 'oxygenconcentrator', '1month': 15000, '2month': 28500, '3month': 40500},
    {'name': 'Philips SimplyGo - Portable Oxygen Concentrator', 'slug': 'philips-simplygo-portable', 'category': 'oxygenconcentrator', '1month': 15000, '2month': 28500, '3month': 40500},
    
    # CPAP Machines (3)
    {'name': 'BMC Auto CPAP', 'slug': 'bmc-auto-cpap', 'category': 'cpap', '1month': 12000, '2month': 22800, '3month': 32400},
    {'name': 'Philips DreamStation Auto CPAP', 'slug': 'philips-dreamstation-cpap', 'category': 'cpap', '1month': 13500, '2month': 25650, '3month': 36450},
    {'name': 'ResMed AirSense 10 AutoSet', 'slug': 'resmed-airsense-10', 'category': 'cpap', '1month': 15000, '2month': 28500, '3month': 40500},
    
    # BiPAP Machines (8)
    {'name': 'Philips Dream Station Auto BiPAP', 'slug': 'philips-dreamstation-bipap', 'category': 'bipap', '1month': 12000, '2month': 22800, '3month': 32400},
    {'name': 'Philips Dream Station BiPAP ST', 'slug': 'philips-bipap-st', 'category': 'bipap', '1month': 12600, '2month': 23940, '3month': 34020},
    {'name': 'Philips Dream Station BiPAP AVAPS', 'slug': 'philips-bipap-avaps', 'category': 'bipap', '1month': 13500, '2month': 25650, '3month': 36450},
    {'name': 'BiPAP A40 Pro Machine', 'slug': 'bipap-a40-pro', 'category': 'bipap', '1month': 12000, '2month': 22800, '3month': 32400},
    {'name': 'ResMed Lumis 100', 'slug': 'resmed-lumis-100', 'category': 'bipap', '1month': 14400, '2month': 27360, '3month': 38880},
    {'name': 'ResMed Lumis 150', 'slug': 'resmed-lumis-150', 'category': 'bipap', '1month': 15000, '2month': 28500, '3month': 40500},
    {'name': 'ResMed Stellar 150', 'slug': 'resmed-stellar-150', 'category': 'bipap', '1month': 15000, '2month': 28500, '3month': 40500},
    {'name': 'BMC BiPAP YT30 Machine', 'slug': 'bmc-bipap-yt30', 'category': 'bipap', '1month': 12000, '2month': 22800, '3month': 32400},
    
    # Ventilators (5)
    {'name': 'Philips Trilogy Evo Ventilator', 'slug': 'philips-trilogy-evo', 'category': 'ventilator', '1month': 18000, '2month': 34200, '3month': 48600},
    {'name': 'ResMed Astral 150 Ventilator', 'slug': 'resmed-astral-150', 'category': 'ventilator', '1month': 21000, '2month': 39900, '3month': 56700},
    {'name': 'Philips Trilogy 100 Ventilator', 'slug': 'philips-trilogy-100', 'category': 'ventilator', '1month': 18000, '2month': 34200, '3month': 48600},
    {'name': 'RV 200 Ventilator', 'slug': 'rv-200-ventilator', 'category': 'ventilator', '1month': 15000, '2month': 28500, '3month': 40500},
    {'name': 'Shorya Ventilator', 'slug': 'shorya-ventilator', 'category': 'ventilator', '1month': 12000, '2month': 22800, '3month': 32400},
    
    # Patient Monitors (3)
    {'name': 'Three Para Patient Monitor', 'slug': 'three-para-monitor', 'category': 'patientmonitor', '1month': 6000, '2month': 11400, '3month': 16200},
    {'name': 'Multi Para / Five Para Patient Monitor', 'slug': 'five-para-monitor', 'category': 'patientmonitor', '1month': 9000, '2month': 17100, '3month': 24300},
    {'name': 'ETCO2 Monitor', 'slug': 'etco2-monitor', 'category': 'patientmonitor', '1month': 7500, '2month': 14250, '3month': 20250},
    
    # DVT & Lymph Pumps (2)
    {'name': 'DVT Pump', 'slug': 'dvt-pump', 'category': 'dvtlymphpump', '1month': 6000, '2month': 11400, '3month': 16200},
    {'name': 'Lymph Pump', 'slug': 'lymph-pump', 'category': 'dvtlymphpump', '1month': 6000, '2month': 11400, '3month': 16200},
    
    # Infusion & Feeding Pumps (3)
    {'name': 'Infusion Pump', 'slug': 'infusion-pump', 'category': 'feedinginfusionsyringe', '1month': 4500, '2month': 8550, '3month': 12150},
    {'name': 'Feeding Pump', 'slug': 'feeding-pump', 'category': 'feedinginfusionsyringe', '1month': 4500, '2month': 8550, '3month': 12150},
    {'name': 'Syringe Pump', 'slug': 'syringe-pump', 'category': 'feedinginfusionsyringe', '1month': 3000, '2month': 5700, '3month': 8100},
]

print('Adding Products...')
print('='*60)

product_count = 0
for prod in products:
    if prod['category'] not in cat_ids:
        print('✗ ' + prod['name'][:50].ljust(50) + ' - Category not found: ' + prod['category'])
        continue
    
    payload = {
        'name': prod['name'],
        'slug': prod['slug'],
        'category_id': cat_ids[prod['category']],
        'price_1month': prod['1month'],
        'price_2month': prod['2month'],
        'price_3month': prod['3month']
    }
    try:
        r = requests.post(base + '/api/products', json=payload, timeout=5)
        if r.status_code == 201:
            print('✓ ' + prod['name'][:50].ljust(50))
            product_count += 1
        elif r.status_code == 400:
            print('✗ ' + prod['name'][:50].ljust(50) + ' - ' + str(r.status_code))
        else:
            print('✗ ' + prod['name'][:50].ljust(50) + ' - ' + str(r.status_code))
    except Exception as e:
        print('✗ ' + prod['name'][:50].ljust(50) + ' - ' + str(e))
    time.sleep(0.3)

print('='*60)
try:
    r = requests.get(base + '/api/products', timeout=5)
    total = len(r.json()) if r.status_code == 200 else 0
    print('Total Products Added: ' + str(product_count))
    print('Total Products in DB: ' + str(total))
except:
    print('Total Products Added: ' + str(product_count))
