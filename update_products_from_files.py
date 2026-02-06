"""
Update product information from Product info text files
"""
import sys
from pathlib import Path
import os

# Set database path to root directory (same as backend)
import os
os.environ['DATABASE_URL'] = 'sqlite:///./carespace.db'

sys.path.insert(0, str(Path(__file__).parent / "backend"))

from app.core.database import SessionLocal, engine, Base
from app.models.product import Product
from app.models.category import Category

def parse_product_file(file_path):
    """Parse a product text file and extract information."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        # Try with latin-1 encoding for files with special characters
        with open(file_path, 'r', encoding='latin-1') as f:
            content = f.read()

    lines = content.split('\n')
    product_info = {}

    current_section = None
    section_content = []

    for line in lines:
        line = line.strip()
        if not line:
            continue

        # Check for section headers
        if line in ['Customer-Friendly Short Description', 'Detailed Product Information', 'Key Features:', 'SEO Meta Title', 'SEO Meta Description', 'Categories', 'SEO Tags (80-90)', 'Mumbai Posh-Area Keywords (80-90)']:
            # Save previous section
            if current_section and section_content:
                if current_section == 'Key Features:':
                    # Convert to bullet points
                    product_info['key_features'] = '\n'.join(f'• {item.strip("- •")}' for item in section_content if item.strip())
                elif current_section == 'SEO Tags (80-90)':
                    product_info['seo_tags'] = ', '.join(item.strip() for item in section_content if item.strip())
                elif current_section == 'Mumbai Posh-Area Keywords (80-90)':
                    product_info['mumbai_keywords'] = ', '.join(item.strip() for item in section_content if item.strip())
                else:
                    product_info[current_section.lower().replace(' ', '_').replace('-', '_')] = '\n'.join(section_content).strip()

            current_section = line
            section_content = []
        elif current_section:
            section_content.append(line)
        elif not product_info.get('name'):
            # First line is the product name
            product_info['name'] = line

    # Save the last section
    if current_section and section_content:
        if current_section == 'Key Features:':
            product_info['key_features'] = '\n'.join(f'• {item.strip("- •")}' for item in section_content if item.strip())
        elif current_section == 'SEO Tags (80-90)':
            product_info['seo_tags'] = ', '.join(item.strip() for item in section_content if item.strip())
        elif current_section == 'Mumbai Posh-Area Keywords (80-90)':
            product_info['mumbai_keywords'] = ', '.join(item.strip() for item in section_content if item.strip())
        else:
            product_info[current_section.lower().replace(' ', '_').replace('-', '_')] = '\n'.join(section_content).strip()

    return product_info

def update_products_from_files():
    """Update products in database with information from text files."""

    # Ensure tables exist
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Mapping of product names to file numbers (based on the database order)
        product_mapping = {
            "Bubble Air Bed Mattress": "Product 7.txt",
            "Nayome SWDN Premium Air Bed Mattress": "Product 8.txt",
            "Tubular Air Bed Mattress": "Product 9.txt",
            "BMC Auto CPAP Machine": "Product 15.txt",
            "Philips DreamStation Auto CPAP": "Product 16.txt",
            "ResMed AirSense 10 AutoSet CPAP": "Product 17.txt",
            "BiPAP A40 Pro Machine": "Product 18.txt",
            "BMC BiPAP YT30 Machine": "Product 19.txt",
            "Philips DreamStation Auto BiPAP": "Product 20.txt",
            "Philips DreamStation BiPAP AVAPS": "Product 21.txt",
            "Philips DreamStation BiPAP ST": "Product 22.txt",
            "ResMed Lumis 100": "Product 23.txt",
            "ResMed Lumis 150": "Product 24.txt",
            "ResMed Stellar 150": "Product 25.txt",
            "DVT Pump": "Product 35.txt",
            "Feeding Pump": "Product 37.txt",
            "Infusion Pump": "Product 36.txt",
            "Lymph Pump": "Product 38.txt",
            "Exclusive 5-Function Automatic Bed": "Product 6.txt",
            "Exclusive Automatic Bed 4-Section": "Product 5.txt",
            "Exclusive Full Fowler Bed": "Product 1.txt",
            "Motor Recliner Hospital Bed Black": "Product 3.txt",
            "Motor Recliner Hospital Bed Blue": "Product 4.txt",
            "Premium 5-Function Patient Bed": "Product 2.txt",
            "JAY 10-10 B 10 LPM Oxygen Concentrator": "Product 11.txt",
            "Oxy Med Portable Oxygen Concentrator": "Product 14.txt",
            "Philips Everflo 5 LPM Oxygen Concentrator": "Product 10.txt",
            "Portable Oxygen Concentrator Philips Simply Go Mini": "Product 13.txt",
            "Portable Oxygen Concentrator Philips Simply Go": "Product 12.txt",
            "Multi-Para Five-Para Patient Monitor": "Product 31.txt",
            "Three-Para Patient Monitor": "Product 32.txt",
            "Manual Suction Machine": "Product 43.txt",
            "Suction Machine Double Jar": "Product 41.txt",
            "Suction Machine Single Jar": "Product 40.txt",
            "Suction Machine Single Jar with Battery Backup": "Product 42.txt",
            "Syringe Pump": "Product 39.txt",
            "Phillips Trilogy 100 Ventilator": "Product 29.txt",
            "Phillips Trilogy EVO Ventilator": "Product 26.txt",
            "ResMed Astral 150 Ventilator": "Product 27.txt",
            "RV-200 Ventilator": "Product 28.txt",
            "Shorya Ventilator": "Product 30.txt",
        }

        product_info_dir = Path(__file__).parent / "Product info"

        for product_name, file_name in product_mapping.items():
            file_path = product_info_dir / file_name

            if file_path.exists():
                print(f"Processing {file_name} for {product_name}")

                # Parse the product file
                product_data = parse_product_file(file_path)

                # Find the product in database
                product = db.query(Product).filter(Product.name == product_name).first()

                if product:
                    # Update product with detailed information
                    if 'customer_friendly_short_description' in product_data:
                        product.description = product_data['customer_friendly_short_description']

                    # Create comprehensive specifications
                    specs_parts = []

                    if 'detailed_product_information' in product_data:
                        specs_parts.append(f"**Detailed Information:**\n{product_data['detailed_product_information']}")

                    if 'key_features' in product_data:
                        specs_parts.append(f"**Key Features:**\n{product_data['key_features']}")

                    if 'categories' in product_data:
                        specs_parts.append(f"**Categories:** {product_data['categories']}")

                    if specs_parts:
                        product.specifications = '\n\n'.join(specs_parts)
                    else:
                        product.specifications = "Contact for detailed specifications"

                    # Store SEO information as additional metadata (could be used for meta tags)
                    if 'seo_meta_title' in product_data:
                        product.seo_meta_title = product_data['seo_meta_title']
                        print(f"    SEO Title: {product_data['seo_meta_title']}")

                    if 'seo_meta_description' in product_data:
                        product.seo_meta_description = product_data['seo_meta_description']
                        print(f"    SEO Description: {product_data['seo_meta_description'][:100]}...")

                    print(f"  ✓ Updated {product_name}")
                else:
                    print(f"  ✗ Product not found: {product_name}")
            else:
                print(f"  ✗ File not found: {file_path}")

        db.commit()
        print("\n✓ All products updated successfully!")

        # Verify update
        total_products = db.query(Product).count()
        products_with_specs = db.query(Product).filter(Product.specifications != "Contact for detailed specifications").count()

        print(f"\nUpdate Summary:")
        print(f"  - Total products: {total_products}")
        print(f"  - Products with detailed specs: {products_with_specs}")

    except Exception as e:
        print(f"✗ Error updating products: {str(e)}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    update_products_from_files()