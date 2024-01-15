import pandas as pd
import folium
from folium.plugins import HeatMap

# Correct column names based on your data
latitude_column = 'GPSLATITUDE'
longitude_column = 'GPSLONGITUDE'
timestamp_column = 'DATETIME_STRING'

# Load your data from the CSV file
data = pd.read_csv('your_data.csv')  # Replace 'your_data.csv' with the path to your CSV file

# Convert the 'DATETIME_STRING' column to datetime format
data[timestamp_column] = pd.to_datetime(data[timestamp_column], errors='coerce')

# Create a map for each month
for year in range(2021, 2023):  # Adjust the range to cover the years in your data
    for month in range(1, 13):
        # Filter data for the current month and year
        filtered_data = data[(data[timestamp_column].dt.year == year) & (data[timestamp_column].dt.month == month)]

        # Check if there are any valid GPS coordinates
        if not filtered_data.empty:
            # Initialize the map to the first coordinates in the dataset
            latitude = filtered_data[latitude_column]
            longitude = filtered_data[longitude_column]
            m = folium.Map(location=[latitude.iloc[0], longitude.iloc[0]], zoom_start=12)

            # Create a list of GPS coordinates for the heatmap
            heat_data = [[row[latitude_column], row[longitude_column]] for idx, row in filtered_data.iterrows()]

            # Add a heatmap layer for the current month
            HeatMap(heat_data).add_to(m)

            # Save the heatmap as an HTML file for the current month and year
            filename = f'heatmap_{year}_{month}.html'
            m.save(filename)
