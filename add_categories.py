import requests
import time

base = 'http://127.0.0.1:8002'

categories = [
    {'name': 'Air Mattress', 'slug': 'airmattress', 'description': 'Pressure relief air mattresses'},
    {'name': 'Auto CPAP', 'slug': 'autocpap', 'description': 'Automatic CPAP devices'},
    {'name': 'BiPAP', 'slug': 'bipap', 'description': 'BiPAP devices'},
    {'name': 'DVT Lymph Pump', 'slug': 'dvtlymphpump', 'description': 'DVT pumps'},
    {'name': 'Feeding Infusion Syringe', 'slug': 'feedinginfusionsyringe', 'description': 'Feeding syringes'},
    {'name': 'Hospital Bed', 'slug': 'hospitalbed', 'description': 'Hospital beds'},
    {'name': 'Oxygen Concentrator', 'slug': 'oxygenconcentrator', 'description': 'Oxygen devices'},
    {'name': 'Patient Monitor', 'slug': 'patientmonitor', 'description': 'Patient monitors'},
    {'name': 'Suction Machine', 'slug': 'suctionmachine', 'description': 'Suction devices'},
    {'name': 'Ventilator', 'slug': 'ventilator', 'description': 'Ventilators'},
]

print('Creating 10 Medical Equipment Categories...')
print('='*60)

time.sleep(2)

for cat in categories:
    r = requests.post(base + '/api/categories', json=cat)
    if r.status_code == 201:
        print('✓ ' + cat['name'].ljust(30) + ' → Created')

print('='*60)
r = requests.get(base + '/api/categories')
print('Total Categories: ' + str(len(r.json())))
for cat in r.json():
    print('  • ' + cat['name'] + ' (' + cat['slug'] + ')')
