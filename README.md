import folium

# Function to create a map for a given category of trips
def create_trip_map(category):
    # Filter trips in the selected category
    category_trips = trip_summary[trip_summary['Distance_Category'] == category]

    # Create a map centered around the average coordinates
    m = folium.Map(location=[category_trips['Start_Lat'].mean(), category_trips['Start_Lng'].mean()], zoom_start=6)

    # Add start and end points for each trip
    for _, trip in category_trips.iterrows():
        folium.Marker(location=[trip['Start_Lat'], trip['Start_Lng']], icon=folium.Icon(color='green')).add_to(m)
        folium.Marker(location=[trip['End_Lat'], trip['End_Lng']], icon=folium.Icon(color='red')).add_to(m)
    
    # Save the map to an HTML file
    m.save(f'map_category_{category}.html')

# Create and save maps for each category
for category in range(10):
    create_trip_map(category)
