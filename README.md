import geopy.distance

# Function to calculate distance between two GPS coordinates
def calculate_distance(coord1, coord2):
    return geopy.distance.distance(coord1, coord2).km

# Thresholds
distance_threshold = 0.1  # in kilometers, adjust as needed
time_threshold = 300  # in seconds, adjust as needed

# Adding new columns for shifted latitude and longitude
data['prev_latitude'] = data[latitude_column].shift(1)
data['prev_longitude'] = data[longitude_column].shift(1)

# Calculate time difference in seconds
data['time_diff'] = pd.to_datetime(data[timestamp_column]).diff().dt.total_seconds().fillna(0)

# Calculate distance between consecutive points
data['distance_diff'] = data.apply(lambda row: calculate_distance(
    (row[latitude_column], row[longitude_column]),
    (row['prev_latitude'], row['prev_longitude'])
), axis=1)

# Identify stops
data['is_stop'] = (data['distance_diff'] <= distance_threshold) & (data['time_diff'] >= time_threshold)

# Filter stops
stops = data[data['is_stop']]

