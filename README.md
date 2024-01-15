Filter out rows with empty values in critical columns like TRIPID, VID, and TOTALDISTANCE.
Assuming TOTALDISTANCE is the cumulative distance traveled by each truck, calculate the distance traveled for each trip by comparing the TOTALDISTANCE at the start and end of each trip.
Perform these calculations for each truck (VID) in chronological order.


import pandas as pd

# Load your data from the CSV file
# Replace 'path_to_your_file.csv' with the actual path to your CSV file
data = pd.read_csv('path_to_your_file.csv')

# Convert relevant columns
data['DATETIME_STRING'] = pd.to_datetime(data['DATETIME_STRING'], errors='coerce')
data['TOTALDISTANCE_1'] = pd.to_numeric(data['TOTALDISTANCE_1'], errors='coerce')

# Filter out rows with empty values in 'TRIPID', 'VID', or 'TOTALDISTANCE_1'
data = data.dropna(subset=['TRIPID', 'VID', 'TOTALDISTANCE_1'])

# Sort the data by 'VID', 'TRIPID', and 'DATETIME_STRING' to ensure chronological order
data = data.sort_values(by=['VID', 'TRIPID', 'DATETIME_STRING'])

# Group by 'VID' and 'TRIPID' and get the first and last value of 'TOTALDISTANCE_1' for each group
grouped = data.groupby(['VID', 'TRIPID'])['TOTALDISTANCE_1']
trip_summary = grouped.agg(Start_Distance='first', End_Distance='last').reset_index()

# Calculate the distance traveled for each trip
trip_summary['Trip_Distance'] = trip_summary['End_Distance'] - trip_summary['Start_Distance']

# Add start and finish times for each trip
trip_times = data.groupby(['VID', 'TRIPID'])['DATETIME_STRING'].agg(Start_Time='min', Finish_Time='max').reset_index()
trip_summary = pd.merge(trip_summary, trip_times, on=['VID', 'TRIPID'])

# Display the trip summary
print(trip_summary)

