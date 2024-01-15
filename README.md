import pandas as pd
import folium
from folium.plugins import HeatMap
import calendar
from IPython.display import display

# Correct column names based on the previous data snippet you provided
latitude_column = 'GPSLATITUDE'
longitude_column = 'GPSLONGITUDE'
timestamp_column = 'DATETIME_STRING'

# Load your data from the CSV file
data = pd.read_csv('your_data.csv')  # Replace 'your_data.csv' with the path to your CSV file

# Convert the 'DATETIME_STRING' column to datetime format
data[timestamp_column] = pd.to_datetime(data[timestamp_column], errors='coerce')

# Filter out rows with missing or invalid GPS coordinates
data = data.dropna(subset=[latitude_column, longitude_column])

# Create a map centered around the mean coordinates of the dataset
m = folium.Map(location=[data[latitude_column].mean(), data[longitude_column].mean()], zoom_start=10)

# Extract month and year from the timestamp
data['Month'] = data[timestamp_column].dt.month
data['Year'] = data[timestamp_column].dt.year

# Loop through unique months and years to create and display heatmaps
unique_months_years = data[['Month', 'Year']].drop_duplicates()
for idx, row in unique_months_years.iterrows():
    month_data = data[(data['Month'] == row['Month']) & (data['Year'] == row['Year'])]

    # Create a heatmap layer for the current month
    heatmap_data = month_data[[latitude_column, longitude_column]].values.tolist()
    HeatMap(heatmap_data).add_to(m)
    
    # Display the map for the current month
    display(m)
    
    # Create a new map for the next month
    m = folium.Map(location=[data[latitude_column].mean(), data[longitude_column].mean()], zoom_start=10)
