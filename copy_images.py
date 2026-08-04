import shutil
import os

source_dir = r"C:\Users\Amzad\.gemini\antigravity-ide\brain\64220523-f27d-46d5-8a6b-4ddec9a6f5f9"
dest_dir = r"c:\Users\Amzad\Desktop\DIGITAL-LANGUAGE-CENTER\images"

files = {
    "arabic_banner_1785861769401.png": "arabic.png",
    "english_banner_1785861780284.png": "english.png",
    "korean_banner_1785861792839.png": "korean.png",
    "japanese_banner_1785861804371.png": "japanese.png",
    "chinese_banner_1785861815115.png": "chinese.png",
    "spanish_banner_1785861826774.png": "spanish.png",
    "malay_banner_1785861837088.png": "malay.png"
}

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

for src, dest in files.items():
    src_path = os.path.join(source_dir, src)
    dest_path = os.path.join(dest_dir, dest)
    try:
        shutil.copy(src_path, dest_path)
        print(f"Copied {src} to {dest}")
    except Exception as e:
        print(f"Error copying {src}: {e}")

print("All done!")
