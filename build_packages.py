import os
import shutil
import zipfile

BASE_DIR = '/root/OneBlock-Void-Survival'
WORLD_DIR = os.path.join(BASE_DIR, 'world')
BP_DIR = os.path.join(BASE_DIR, 'behavior_pack')

def zip_directory(source_dir, output_zip, file_replacements=None):
    if file_replacements is None:
        file_replacements = {}
    
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                abs_path = os.path.join(root, file)
                rel_path = os.path.relpath(abs_path, source_dir)
                if rel_path in file_replacements:
                    zipf.writestr(rel_path, file_replacements[rel_path])
                else:
                    zipf.write(abs_path, rel_path)
    print(f"Created: {output_zip} ({os.path.getsize(output_zip)} bytes)")

def build_all():
    # 1. Build OneBlock_Void_Survival.mcpack
    mcpack_out = os.path.join(BASE_DIR, 'OneBlock_Void_Survival.mcpack')
    zip_directory(BP_DIR, mcpack_out)

    # 2. Build OneBlock_Void_Survival.mcworld (Survival)
    mcworld_out = os.path.join(BASE_DIR, 'OneBlock_Void_Survival.mcworld')
    zip_directory(WORLD_DIR, mcworld_out)

    # 3. Build OneBlock_Void_Survival_Admin.mcworld (Admin)
    admin_main_path = os.path.join(WORLD_DIR, 'behavior_packs', 'OneBlockVoid', 'scripts', 'main.js')
    with open(admin_main_path, 'r', encoding='utf-8') as f:
        main_content = f.read()
    admin_main_content = main_content.replace('const IS_ADMIN_BUILD = false;', 'const IS_ADMIN_BUILD = true;')
    
    admin_mcworld_out = os.path.join(BASE_DIR, 'OneBlock_Void_Survival_Admin.mcworld')
    admin_replacements = {
        os.path.join('behavior_packs', 'OneBlockVoid', 'scripts', 'main.js'): admin_main_content
    }
    zip_directory(WORLD_DIR, admin_mcworld_out, admin_replacements)

    # 4. Copy to releases
    releases_dir = os.path.join(BASE_DIR, 'releases')
    os.makedirs(releases_dir, exist_ok=True)
    shutil.copy2(mcpack_out, os.path.join(releases_dir, 'OneBlock_Void_Survival.mcpack'))
    shutil.copy2(mcworld_out, os.path.join(releases_dir, 'OneBlock_Void_Survival.mcworld'))

    # 5. Copy to /root/Downloads
    downloads_dir = '/root/Downloads'
    if os.path.exists(downloads_dir):
        shutil.copy2(mcpack_out, os.path.join(downloads_dir, 'OneBlock_Void_Survival.mcpack'))
        shutil.copy2(mcworld_out, os.path.join(downloads_dir, 'OneBlock_Void_Survival.mcworld'))
        shutil.copy2(admin_mcworld_out, os.path.join(downloads_dir, 'OneBlock_Void_Survival_Admin.mcworld'))
        print("Copied to /root/Downloads/")

    # 6. Copy to /sdcard/Download if exists
    sdcard_dir = '/sdcard/Download'
    if os.path.exists(sdcard_dir):
        shutil.copy2(mcpack_out, os.path.join(sdcard_dir, 'OneBlock_Void_Survival.mcpack'))
        shutil.copy2(mcworld_out, os.path.join(sdcard_dir, 'OneBlock_Void_Survival.mcworld'))
        shutil.copy2(admin_mcworld_out, os.path.join(sdcard_dir, 'OneBlock_Void_Survival_Admin.mcworld'))
        print("Copied to /sdcard/Download/")

if __name__ == '__main__':
    build_all()
