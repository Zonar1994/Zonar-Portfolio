import pandas as pd
import folium

# Correct column names based on the previous data snippet you provided
latitude_column = 'GPSLATITUDE'
longitude_column = 'GPSLONGITUDE'
timestamp_column = 'DATETIME_STRING'

# Load your data from the Excel file
data = pd.read_excel('zonar.xlsx', engine='openpyxl')  # Make sure the file path is correct

# Now we filter out the header rows
data = data.iloc[4:]  # Adjust the row number to skip headers accordingly

# Convert the GPS coordinate columns to float and handle NaN values
data[latitude_column] = pd.to_numeric(data[latitude_column], errors='coerce')
data[longitude_column] = pd.to_numeric(data[longitude_column], errors='coerce')

# Remove rows with missing latitude or longitude values
data = data.dropna(subset=[latitude_column, longitude_column])

# Check if there are any valid GPS coordinates
if not data.empty:
    # Initialize the map to the first coordinates in the dataset
    latitude = data[latitude_column]
    longitude = data[longitude_column]
    m = folium.Map(location=[latitude.iloc[0], longitude.iloc[0]], zoom_start=12)

    # Add markers to the map for each GPS coordinate
    for idx, row in data.iterrows():
        folium.Marker(location=[row[latitude_column], row[longitude_column]]).add_to(m)
else:
    print("No valid GPS coordinates available to plot.")

# Display the map
m
