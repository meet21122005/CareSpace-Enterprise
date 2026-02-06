"""Update product images in database"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent / "backend"))

from app.core.database import SessionLocal
from app.models.category import Category
from app.models.product import Product

# Image mapping: slug -> filename
image_map = {
    "bubble-air-bed-mattress-rent": "9 bubble air bed mattress.jpg",
    "nayome-swdn-premium-air-bed-mattress-rent": "7 nayome swdn premium air bed mattress.jpg",
    "tubular-air-bed-mattress-rent": "8 tubular air bed mattress.jpg",
    "bmc-auto-cpap-cpap-machine-on-rent-rent": "16 bmc auto cpap (cpap machine on rent).jpg",
    "philips-dream-station-auto-cpap-cpap-machine-on-rent-rent": "17 philips dream station auto cpap (cpap machine on rent).jpg",
    "resmed-airsense-10-autoset-cpap-machine-on-rent-rent": "18 resmed airsense 10 autoset (cpap machine on rent).jpg",
    "bipap-a40-pro-machine-rent": "22 bipap a40 pro machine.jpg",
    "bmc-bipap-yt30-machine-rent": "26 bmc bipap yt30 machine.jpg",
    "philips-dream-station-auto-bipap-rent": "19 philips dream station auto bipap.jpg",
    "philips-dream-station-bipap-avaps-rent": "21 philips dream station bipap avaps.jpg",
    "philips-dream-station-bipap-st-rent": "20 philips dream station bipap st.jpg",
    "resmed-lumis-100-rent": "23 resmed lumis 100.jpg",
    "resmed-lumis-150-rent": "24 resmed lumis 150.jpg",
    "resmed-stellar-150-rent": "25 resmed stellar 150.jpg",
    "dvt-pump-rent": "35 dvt pump.jpg",
    "feeding-pump-rent": "37 feeding pump.jpg",
    "infusion-pump-rent": "36 infusion pump.jpg",
    "lymph-pump-rent": "38 lymph pump.jpg",
    "exclusive-5-function-automatic-bed-with-exclusive-mattress-rent": "5 exclusive 5 function automatic bed with exclusive mattress.jpg",
    "exclusive-automatic-bed-with-4-section-mattress-rent": "4 exclusive automatic bed with 4 section mattress.jpg",
    "exclusive-full-fowler-bed-with-standard-4-section-mattress-rent": "1 exclusive full fowler bed with standard 4 section mattress.jpg",
    "motor-recliner-hospital-bed-with-black-mattress-rent": "3 motor recliner hospital bed with black mattress.jpg",
    "motor-recliner-hospital-bed-with-blue-mattress-rent": "2 motor recliner hospital bed with blue mattress.jpg",
    "premium-5-function-patient-bed-with-premium-mattress-rent": "6 premium 5 function patient bed with premium mattress.jpg",
    "jay-10-10-b-10-lpm-oxygen-concentrator-rent": "11 jay – 10 (10-b), 10 lpm oxygen concentrator.jpg",
    "oxy-med-portable-oxygen-concentrator-rent": "12 oxy-med portable oxygen concentrator.jpg",
    "philips-everflo-5-lpm-oxygen-concentrator-rent": "10 philips everflo 5 lpm oxygen concentrator (1).jpg",
    "portable-oxygen-concentrator-philips-simply-go-mini-rent": "13 portable oxygen concentrator philips simply go mini.jpg",
    "portable-oxygen-concentrator-philips-simply-go-rent": "14 portable oxygen concentrator philips simply go.jpg",
    "multi-para-five-para-patient-monitor-rent": "33 multi para five para patient monitor.jpg",
    "three-para-patient-monitor-rent": "32 three para patient monitor.jpg",
    "manual-suction-machine-rent": "43 manual suction machine.jpg",
    "suction-machine-double-jar-rent": "41 suction machine (double jar).jpg",
    "suction-machine-single-jar-rent": "40 suction machine (single jar).jpg",
    "suction-machine-single-jar-with-battery-backup-rent": "42 suction machine (single jar) with battery backup.jpg",
    "syringe-pump-rent": "39 syringe pump.jpg",
    "phillips-trilogy-100-ventilator-rent": "29 phillips trilogy 100 ventilator.jpg",
    "phillips-trilogy-evo-ventilator-rent": "27 phillips trilogy evo ventilator.jpg",
    "resmed-astral-150-ventilator-rent": "28 resmed astral 150 ventilator.jpg",
    "rv-200-ventilator-rent": "30 rv 200 ventilator.jpg",
    "shorya-ventilator-rent": "31 shorya ventilator.jpg",
}

def update_images():
    db = SessionLocal()
    try:
        updated = 0
        for slug, image_file in image_map.items():
            product = db.query(Product).filter(Product.slug == slug).first()
            if product:
                product.image_url = image_file
                updated += 1
                print(f"✓ Updated: {product.name}")
        
        db.commit()
        print(f"\n✅ Updated {updated} product images!")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    update_images()
