#!/usr/bin/env python3
"""
Dynamic Sitemap Generator for Carespace India
Generates sitemap.xml with all products, categories, and static pages
"""
import sys
from pathlib import Path
from datetime import datetime
import os

# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv(dotenv_path=Path(__file__).parent.parent / ".env")

# No need to modify sys.path since we're already in the backend directory

from app.core.database import SessionLocal
from app.models.product import Product
from app.models.category import Category

def generate_sitemap():
    """Generate sitemap.xml with all content"""
    db = SessionLocal()

    try:
        # Get all products (without SEO columns for now)
        products = db.query(Product.id, Product.name, Product.slug, Product.category_id).all()

        # Get all categories
        categories = db.query(Category.id, Category.name, Category.slug).all()

        # Base URL
        base_url = "https://carespace.in"

        # Current date for lastmod
        current_date = datetime.now().strftime("%Y-%m-%d")

        # Start sitemap
        sitemap_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
        sitemap_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

        # Static pages
        static_pages = [
            {"loc": "/", "priority": "1.0", "changefreq": "weekly"},
            {"loc": "/rent", "priority": "0.8", "changefreq": "monthly"},
            {"loc": "/about", "priority": "0.7", "changefreq": "monthly"},
            {"loc": "/contact", "priority": "0.7", "changefreq": "monthly"},
            {"loc": "/blog", "priority": "0.6", "changefreq": "weekly"},
            {"loc": "/faq", "priority": "0.6", "changefreq": "monthly"},
        ]

        for page in static_pages:
            sitemap_content += f'''  <url>
    <loc>{base_url}{page["loc"]}</loc>
    <lastmod>{current_date}</lastmod>
    <changefreq>{page["changefreq"]}</changefreq>
    <priority>{page["priority"]}</priority>
  </url>\n'''

        # Category pages
        for category in categories:
            category_id, category_name, category_slug = category
            sitemap_content += f'''  <url>
    <loc>{base_url}/category/{category_slug}</loc>
    <lastmod>{current_date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n'''

        # Product pages
        for product in products:
            product_id, product_name, product_slug, category_id = product
            sitemap_content += f'''  <url>
    <loc>{base_url}/product/{product_slug}</loc>
    <lastmod>{current_date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>\n'''

        # Close sitemap
        sitemap_content += '</urlset>\n'

        # Write to file
        sitemap_path = Path(__file__).parent.parent / "Frontend" / "public" / "sitemap.xml"
        with open(sitemap_path, 'w', encoding='utf-8') as f:
            f.write(sitemap_content)

        print(f"Sitemap generated successfully with:")
        print(f"   - {len(static_pages)} static pages")
        print(f"   - {len(categories)} category pages")
        print(f"   - {len(products)} product pages")
        print(f"   - Total: {len(static_pages) + len(categories) + len(products)} URLs")
        print(f"   - Saved to: {sitemap_path}")

    except Exception as e:
        print(f"Error generating sitemap: {str(e)}")
        return False
    finally:
        db.close()

    return True

if __name__ == "__main__":
    generate_sitemap()