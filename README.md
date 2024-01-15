import pandas as pd
import geopy.distance
import folium
from folium.plugins import HeatMap
import numpy as np

# Function to calculate distance between two GPS coordinates
def calculate_distance(coord1, coord2):
    return geopy.distance.distance(coord1, coord2).km

# Load your data from the CSV file
# Replace 'path_to_your_file.csv' with the actual path to your CSV file
data = pd.read_csv('path_to_your_file.csv')

# Assuming these are your column names
latitude_column = 'GPSLATITUDE'
longitude_column = 'GPSLONGITUDE'
timestamp_column = 'DATETIME_STRING'

# Replace periods with colons in the time portion of the datetime string
data[timestamp_column] = data[timestamp_column].str.replace(r'(\\d{2})\\.(\\d{2})\\.(\\d{2})', r'\\1:\\2:\\3', regex=True)

# Convert the 'DATETIME_STRING' column to datetime format
data[timestamp_column] = pd.to_datetime(data[timestamp_column], errors='coerce', utc=True)

# Convert GPS coordinates to numeric and handle errors
data[latitude_column] = pd.to_numeric(data[latitude_column], errors='coerce')
data[longitude_column] = pd.to_numeric(data[longitude_column], errors='coerce')

# Drop rows where GPS coordinates are NaN
data = data.dropna(subset=[latitude_column, longitude_column])

# Thresholds for stops
distance_threshold = 0.1  # in kilometers, adjust as needed
time_threshold = 300  # in seconds, adjust as needed

# Adding new columns for shifted latitude and longitude
data['prev_latitude'] = data[latitude_column].shift(1)
data['prev_longitude'] = data[longitude_column].shift(1)

# Calculate time difference in seconds
data['time_diff'] = data[timestamp_column].diff().dt.total_seconds().fillna(0)

# Calculate distance between consecutive points
data['distance_diff'] = data.apply(lambda row: calculate_distance(
    (row[latitude_column], row[longitude_column]),
    (row['prev_latitude'], row['prev_longitude'])
), axis=1)

# Calculate speed (in km/h)
# Note: time_diff is in seconds, so it's converted to hours for speed calculation
data['speed'] = data['distance_diff'] / (data['time_diff'] / 3600)

# Replace infinite speeds (due to division by zero) with NaN or an appropriate value
data['speed'].replace([float('inf'), -float('inf')], np.nan, inplace=True)

# Identify stops
data['is_stop'] = (data['distance_diff'] <= distance_threshold) & (data['time_diff'] >= time_threshold)

# Filter stops
stops = data[data['is_stop']]

# Preparing data for the heatmap
heatmap_data = data[[latitude_column, longitude_column, 'speed']].dropna()

# Creating the heatmap
map = folium.Map(location=[heatmap_data[latitude_column].mean(), heatmap_data[longitude_column].mean()], zoom_start=10)
HeatMap(data=heatmap_data[['GPSLATITUDE', 'GPSLONGITUDE', 'speed']].values, radius=10).add_to(map)

# Save or show the map
map.save('heatmap.html')  # Saves the map to an HTML file
"""

# Save the code to a Python file
file_path = '/mnt/data/truck_data
