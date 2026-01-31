import requests
import time

base = 'http://127.0.0.1:8002'

# First, create all categories
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

# Create categories and get their IDs
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
            # Category already exists, try to fetch it
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

# Now add all products
products = [
    # Hospital Beds (5)
    {'name': 'Exclusive Full Fowler Bed with Standard 4 Section Mattress', 'slug': 'full-fowler-bed', 'category': 'hospitalbed', 'daily': 400, 'weekly': 2400, 'monthly': 8000},
    {'name': 'Motor Recliner Hospital Bed with Blue Mattress', 'slug': 'motor-recliner-blue', 'category': 'hospitalbed', 'daily': 450, 'weekly': 2700, 'monthly': 9000},
    {'name': 'Motor Recliner Hospital Bed with Black Mattress', 'slug': 'motor-recliner-black', 'category': 'hospitalbed', 'daily': 450, 'weekly': 2700, 'monthly': 9000},
    {'name': 'Exclusive Automatic Bed with 4 Section Mattress', 'slug': 'automatic-bed-4-section', 'category': 'hospitalbed', 'daily': 500, 'weekly': 3000, 'monthly': 10000},
    {'name': 'Exclusive 5 Function Automatic Bed with Exclusive Mattress', 'slug': 'automatic-bed-5-function', 'category': 'hospitalbed', 'daily': 550, 'weekly': 3300, 'monthly': 11000},
    
    # Air Mattress (3)
    {'name': 'Bubble Air Bed Mattress', 'slug': 'bubble-air-mattress', 'category': 'airmattress', 'daily': 150, 'weekly': 900, 'monthly': 3000},
    {'name': 'Tubular Air Bed Mattress', 'slug': 'tubular-air-mattress', 'category': 'airmattress', 'daily': 180, 'weekly': 1100, 'monthly': 3500},
    {'name': 'Nayome SWDN Premium Air Bed Mattress', 'slug': 'nayome-premium-mattress', 'category': 'airmattress', 'daily': 250, 'weekly': 1500, 'monthly': 5000},
    
    # Oxygen Concentrators (6)
    {'name': 'Philips EverFlo 5 LPM Oxygen Concentrator', 'slug': 'philips-everflo-5lpm', 'category': 'oxygenconcentrator', 'daily': 300, 'weekly': 1800, 'monthly': 6000},
    {'name': 'Jay-10 (10-b) 10 LPM Oxygen Concentrator', 'slug': 'jay-10-10lpm', 'category': 'oxygenconcentrator', 'daily': 350, 'weekly': 2100, 'monthly': 7000},
    {'name': 'Oxy-Med Portable Oxygen Concentrator', 'slug': 'oxy-med-portable', 'category': 'oxygenconcentrator', 'daily': 280, 'weekly': 1680, 'monthly': 5600},
    {'name': 'Philips SimplyGo Mini - Portable Oxygen Concentrator', 'slug': 'philips-simplygo-mini', 'category': 'oxygenconcentrator', 'daily': 400, 'weekly': 2400, 'monthly': 8000},
    {'name': 'Portable Oxygen Concentrator - Philips SimplyGo', 'slug': 'philips-simplygo-portable', 'category': 'oxygenconcentrator', 'daily': 420, 'weekly': 2520, 'monthly': 8400},
    {'name': 'Philips SimplyGo - Portable Oxygen Concentrator', 'slug': 'philips-simplygo-standard', 'category': 'oxygenconcentrator', 'daily': 450, 'weekly': 2700, 'monthly': 9000},
    
    # CPAP Machines (3)
    {'name': 'BMC Auto CPAP', 'slug': 'bmc-auto-cpap', 'category': 'cpap', 'daily': 300, 'weekly': 1800, 'monthly': 6000},
    {'name': 'Philips DreamStation Auto CPAP', 'slug': 'philips-dreamstation-cpap', 'category': 'cpap', 'daily': 350, 'weekly': 2100, 'monthly': 7000},
    {'name': 'ResMed AirSense 10 AutoSet', 'slug': 'resmed-airsense-10', 'category': 'cpap', 'daily': 380, 'weekly': 2280, 'monthly': 7600},
    
    # BiPAP Machines (8)
    {'name': 'Philips Dream Station Auto BiPAP', 'slug': 'philips-auto-bipap', 'category': 'bipap', 'daily': 400, 'weekly': 2400, 'monthly': 8000},
    {'name': 'Philips Dream Station BiPAP ST', 'slug': 'philips-bipap-st', 'category': 'bipap', 'daily': 420, 'weekly': 2520, 'monthly': 8400},
    {'name': 'Philips Dream Station BiPAP AVAPS', 'slug': 'philips-bipap-avaps', 'category': 'bipap', 'daily': 450, 'weekly': 2700, 'monthly': 9000},
    {'name': 'BiPAP A40 Pro Machine', 'slug': 'bipap-a40-pro', 'category': 'bipap', 'daily': 300, 'weekly': 1800, 'monthly': 6000},
    {'name': 'ResMed Lumis 100', 'slug': 'resmed-lumis-100', 'category': 'bipap', 'daily': 380, 'weekly': 2280, 'monthly': 7600},
    {'name': 'ResMed Lumis 150', 'slug': 'resmed-lumis-150', 'category': 'bipap', 'daily': 420, 'weekly': 2520, 'monthly': 8400},
    {'name': 'ResMed Stellar 150', 'slug': 'resmed-stellar-150', 'category': 'bipap', 'daily': 500, 'weekly': 3000, 'monthly': 10000},
    {'name': 'BMC BiPAP YT30 Machine', 'slug': 'bmc-bipap-yt30', 'category': 'bipap', 'daily': 350, 'weekly': 2100, 'monthly': 7000},
    
    # Ventilators (5)
    {'name': 'Philips Trilogy Evo Ventilator', 'slug': 'philips-trilogy-evo', 'category': 'ventilator', 'daily': 800, 'weekly': 4800, 'monthly': 16000},
    {'name': 'ResMed Astral 150 Ventilator', 'slug': 'resmed-astral-150', 'category': 'ventilator', 'daily': 850, 'weekly': 5100, 'monthly': 17000},
    {'name': 'Philips Trilogy 100 Ventilator', 'slug': 'philips-trilogy-100', 'category': 'ventilator', 'daily': 700, 'weekly': 4200, 'monthly': 14000},
    {'name': 'RV 200 Ventilator', 'slug': 'rv-200-ventilator', 'category': 'ventilator', 'daily': 600, 'weekly': 3600, 'monthly': 12000},
    {'name': 'Shorya Ventilator', 'slug': 'shorya-ventilator', 'category': 'ventilator', 'daily': 650, 'weekly': 3900, 'monthly': 13000},
    
    # Patient Monitors (3)
    {'name': 'Three Para Patient Monitor', 'slug': 'three-para-monitor', 'category': 'patientmonitor', 'daily': 200, 'weekly': 1200, 'monthly': 4000},
    {'name': 'Multi Para / Five Para Patient Monitor', 'slug': 'five-para-monitor', 'category': 'patientmonitor', 'daily': 300, 'weekly': 1800, 'monthly': 6000},
    {'name': 'ETCO2 Monitor', 'slug': 'etco2-monitor', 'category': 'patientmonitor', 'daily': 250, 'weekly': 1500, 'monthly': 5000},
    
    # DVT & Lymph Pumps (2)
    {'name': 'DVT Pump', 'slug': 'dvt-pump', 'category': 'dvtlymphpump', 'daily': 200, 'weekly': 1200, 'monthly': 4000},
    {'name': 'Lymph Pump', 'slug': 'lymph-pump', 'category': 'dvtlymphpump', 'daily': 200, 'weekly': 1200, 'monthly': 4000},
    
    # Infusion & Feeding Pumps (3)
    {'name': 'Infusion Pump', 'slug': 'infusion-pump', 'category': 'feedinginfusionsyringe', 'daily': 150, 'weekly': 900, 'monthly': 3000},
    {'name': 'Feeding Pump', 'slug': 'feeding-pump', 'category': 'feedinginfusionsyringe', 'daily': 150, 'weekly': 900, 'monthly': 3000},
    {'name': 'Syringe Pump', 'slug': 'syringe-pump', 'category': 'feedinginfusionsyringe', 'daily': 100, 'weekly': 600, 'monthly': 2000},
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
        'daily_price': prod['daily'],
        'weekly_price': prod['weekly'],
        'monthly_price': prod['monthly']
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
