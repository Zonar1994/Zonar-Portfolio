Filter out rows with empty values in critical columns like TRIPID, VID, and TOTALDISTANCE.
Assuming TOTALDISTANCE is the cumulative distance traveled by each truck, calculate the distance traveled for each trip by comparing the TOTALDISTANCE at the start and end of each trip.
Perform these calculations for each truck (VID) in chronological order.


import pandas as pd

# Load your data from the CSV file
# Replace 'path_to_your_file.csv' with the actual path to your CSV file
data = pd.read_csv('path_to_your_file.csv')

# Convert relevant columns
data['DATETIME_STRING'] = pd.to_datetime(data['DATETIME_STRING'], errors='coerce', utc=True)
data['TOTALDISTANCE'] = pd.to_numeric(data['TOTALDISTANCE'], errors='coerce')

# Filter out rows with empty values in 'TRIPID', 'VID', or 'TOTALDISTANCE'
data = data.dropna(subset=['TRIPID', 'VID', 'TOTALDISTANCE'])

# Sort the data by 'VID' and 'DATETIME_STRING' to ensure chronological order
data = data.sort_values(by=['VID', 'DATETIME_STRING'])

# Calculate the difference in 'TOTALDISTANCE' for each trip
data['Trip_Distance_Change'] = data.groupby(['VID', 'TRIPID'])['TOTALDISTANCE'].diff()

# For the start of each trip, the diff will be NaN, so we fill it with the original TOTALDISTANCE
data['Trip_Distance_Change'] = data.groupby(['VID', 'TRIPID'])['Trip_Distance_Change'].apply(lambda x: x.fillna(x.iloc[0]))

# Sum these differences for each trip to get the total trip distance
trip_summary = data.groupby(['VID', 'TRIPID']).agg(
    Start_Time=('DATETIME_STRING', 'first'),
    Finish_Time=('DATETIME_STRING', 'last'),
    Trip_Distance=('Trip_Distance_Change', 'sum')
).reset_index()

# Display the trip summary
print(trip_summary)
