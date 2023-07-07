
'''
/home/alex5/Jello/zPillow.py
requires pip install pillow

You can run the below code to scale down an image and save it in specified location.
'''
from PIL import Image

def scale_image(image_path, output_path, size):
    with Image.open(image_path) as image:
        image.thumbnail(size)
        image.save(output_path)

# Usage example
input_image_path = "/home/alex5/Jello/react-app/src/assets/image4.jpg"

output_image_path = "/home/alex5/Jello/react-app/src/assets/image_4_icon.jpg"

desired_size = (150, 150)

scale_image(input_image_path, output_image_path, desired_size)
