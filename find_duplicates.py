import requests
from collections import defaultdict

base = 'http://127.0.0.1:8002'

# Get all products
r = requests.get(f'{base}/api/products?duration=1month')
products = r.json()

# Group by name
by_name = defaultdict(list)
for p in products:
    by_name[p['name']].append(p)

print("PRODUCTS WITH SAME NAME (Duplicates)\n" + "="*70)
for name, prods in sorted(by_name.items()):
    if len(prods) > 1:
        print(f"\n❌ DUPLICATE: {name} ({len(prods)} copies)")
        for i, p in enumerate(prods, 1):
            print(f"   {i}. slug: {p['slug']} | price: {p['price']} | id: {p['id']}")

print("\n" + "="*70)
print(f"Total products: {len(products)}")
print(f"Unique names: {len(by_name)}")
print(f"Duplicates found: {sum(1 for p in by_name.values() if len(p) > 1)}")
