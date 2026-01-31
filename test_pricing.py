import requests
import json

base = 'http://127.0.0.1:8002'

print("Testing Hospital Beds by Duration\n" + "="*50)

# 1 Month
r = requests.get(f'{base}/api/products/category/hospitalbed?duration=1month')
prods = r.json()
print("\n1 MONTH PRICING:")
for p in prods[:2]:
    print(f"  {p['name']}: Rs {p['price']}")

# 2 Months
r = requests.get(f'{base}/api/products/category/hospitalbed?duration=2month')
prods = r.json()
print("\n2 MONTHS PRICING:")
for p in prods[:2]:
    print(f"  {p['name']}: Rs {p['price']}")

# 3 Months
r = requests.get(f'{base}/api/products/category/hospitalbed?duration=3month')
prods = r.json()
print("\n3 MONTHS PRICING:")
for p in prods[:2]:
    print(f"  {p['name']}: Rs {p['price']}")

print("\n" + "="*50)
print("\nTesting BiPAP Category\n" + "="*50)

# BiPAP 1 Month
r = requests.get(f'{base}/api/products/category/bipap?duration=1month')
prods = r.json()
print("\n1 MONTH PRICING:")
print(f"  Total BiPAP products: {len(prods)}")
for p in prods[:2]:
    print(f"  {p['name']}: Rs {p['price']}")

# BiPAP 3 Months
r = requests.get(f'{base}/api/products/category/bipap?duration=3month')
prods = r.json()
print("\n3 MONTHS PRICING (same products, different price):")
for p in prods[:2]:
    print(f"  {p['name']}: Rs {p['price']}")

print("\nDone!")
