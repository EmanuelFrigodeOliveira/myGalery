import os, glob

directory = '/home/emanuel/Documents/myGalleryProject/photos'

my_files = glob.glob(os.path.join(directory, '*jpg'))
my_files.sort(key=os.path.getctime)

for index, file_path in enumerate(my_files):
    new_name = f"Foto_{str(index + 1)}.jpg"
    new_file_path = os.path.join(directory, new_name)

    os.rename(file_path, new_file_path)

print('Files renamed.')