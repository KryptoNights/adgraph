import functions_framework
import base64
from tempfile import NamedTemporaryFile
from google.cloud import vision

import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "key.json"

@functions_framework.http
def get_labels(request):
    base64_image = None
    if request.content_type == 'application/x-www-form-urlencoded':
        base64_image = request.form.get('base64_image')
    elif request.content_type == 'application/json':
        base64_image = request.get_json().get('base64_image')

    client = vision.ImageAnnotatorClient()

    # Check if data URI with base64 image data
    if base64_image.startswith("data:image/"):
        prefix, encoded_data = base64_image.split(",", 1)
        if not prefix.endswith(";base64"):
            raise ValueError("Invalid data URI format. Must end with ';base64'")
        # Extract the base64 data
        base64_image = encoded_data
    else:
        # Assume it's already base64 encoded data
        pass

    # Decode the base64 image data
    image_data = base64.b64decode(base64_image)

    # Create a temporary file to store the image
    with NamedTemporaryFile(delete=False) as temp_file:
        temp_file.write(image_data)
        image_path = temp_file.name
        # save to actual disk
        with open("test5.jpg", "wb") as f:
            f.write(image_data)

    # Use the temporary file path for detection
    try:
        with open(image_path, "rb") as image_file:
            content = image_file.read()

        image = vision.Image(content=content)

        response = client.label_detection(image=image)
        labels = response.label_annotations
        print("Labels:")

        for label in labels:
            print(label.description)

    finally:
        # Delete the temporary file after processing
        try:
            import os

            os.remove(image_path)
        except FileNotFoundError:
            pass  # Ignore if file is already deleted

    if response.error.message:
        raise Exception(
            "{}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(response.error.message)
        )
    
    return [label.description for label in labels]

