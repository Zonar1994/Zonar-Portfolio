import pandas as pd
import geopy.distance

# Function to calculate distance between two GPS coordinates
def calculate_distance(coord1, coord2):
    return geopy.distance.distance(coord1, coord2).km

# Load your data from the CSV file
data = pd.read_csv('path_to_your_file.csv')  # Replace with your file path

# Assuming these are your column names
latitude_column = 'GPSLATITUDE'
longitude_column = 'GPSLONGITUDE'
timestamp_column = 'DATETIME_STRING'

# Replace periods with colons in the time portion of the datetime string
data['DATETIME_STRING'] = data['DATETIME_STRING'].str.replace(r'(\d{2})\.(\d{2})\.(\d{2})', r'\1:\2:\3', regex=True)

# Convert the 'DATETIME_STRING' column to datetime format
data['DATETIME_STRING'] = pd.to_datetime(data['DATETIME_STRING'], errors='coerce', utc=True)

# Thresholds for stops
distance_threshold = 0.1  # in kilometers, adjust as needed
time_threshold = 300  # in seconds, adjust as needed

# Adding new columns for shifted latitude and longitude
data['prev_latitude'] = data[latitude_column].shift(1)
data['prev_longitude'] = data[longitude_column].shift(1)

# Calculate time difference in seconds
data['time_diff'] = data['DATETIME_STRING'].diff().dt.total_seconds().fillna(0)

# Calculate distance between consecutive points
data['distance_diff'] = data.apply(lambda row: calculate_distance(
    (row[latitude_column], row[longitude_column]),
    (row['prev_latitude'], row['prev_longitude'])
), axis=1)

# Identify stops
data['is_stop'] = (data['distance_diff'] <= distance_threshold) & (data['time_diff'] >= time_threshold)

# Filter stops
stops = data[data['is_stop']]

