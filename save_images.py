import os
from PIL import Image
import shutil

# Create images directory if it doesn't exist
if not os.path.exists('images'):
    os.makedirs('images')

# Define the source images and their destinations
image_mapping = {
    'image1.jpg': 'students in uniform',  # First image of students in uniform
    'image2.jpg': 'women celebrating',    # Image of women celebrating
    'image3.jpg': 'team photo',          # Group photo at the building
    'image4.jpg': 'students playground'   # Students sitting in playground
}

# Function to save an image
def save_image(source_path, dest_path):
    try:
        # Copy the image file
        shutil.copy2(source_path, dest_path)
        print(f"Successfully saved {dest_path}")
    except Exception as e:
        print(f"Error saving {dest_path}: {str(e)}")

# Save each image
for dest_name, description in image_mapping.items():
    source_path = f"{dest_name}"  # The original image file
    dest_path = os.path.join('images', dest_name)
    save_image(source_path, dest_path) 