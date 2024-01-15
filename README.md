import pandas as pd
import folium
from folium import PolyLine

# Correct column names based on your data
latitude_column = 'GPSLATITUDE'
longitude_column = 'GPSLONGITUDE'
timestamp_column = 'DATETIME_STRING'
trip_id_column = 'TRIPID'

# Load your data from the CSV file
data = pd.read_csv('your_data.csv')  # Replace 'your_data.csv' with the path to your CSV file

# Convert the 'DATETIME_STRING' column to datetime format
data[timestamp_column] = pd.to_datetime(data[timestamp_column], errors='coerce')

# Create a map for each month
for year in range(2021, 2023):  # Adjust the range to cover the years in your data
    for month in range(1, 13):
        # Filter data for the current month and year
        filtered_data = data[(data[timestamp_column].dt.year == year) & (data[timestamp_column].dt.month == month)]

        # Check if there are any valid GPS coordinates and trip IDs
        if not filtered_data.empty and trip_id_column in filtered_data.columns:
            # Initialize the map to the first coordinates in the dataset
            latitude = filtered_data[latitude_column]
            longitude = filtered_data[longitude_column]
            m = folium.Map(location=[latitude.iloc[0], longitude.iloc[0]], zoom_start=12)

            # Group data by trip ID and plot routes with different colors
            for trip_id, trip_data in filtered_data.groupby(trip_id_column):
                route_coordinates = list(zip(trip_data[latitude_column], trip_data[longitude_column]))
                line_color = '#' + trip_id[-6:]  # Use the last 6 characters of the trip ID as a color
                PolyLine(route_coordinates, color=line_color).add_to(m)

            # Display the map in the notebook
            display(m)
