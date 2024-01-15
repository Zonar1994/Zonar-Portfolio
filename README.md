# Ensure 'DATETIME_STRING' is in datetime format
data['DATETIME_STRING'] = pd.to_datetime(data['DATETIME_STRING'], errors='coerce', utc=True)

# Group by 'VID' and 'TRIPID', and aggregate the min and max of 'DATETIME_STRING'
trip_summary = data.groupby(['VID', 'TRIPID'])['DATETIME_STRING'].agg(['min', 'max']).reset_index()

# Rename the columns for clarity
trip_summary.columns = ['VID', 'TRIPID', 'Start Time', 'Finish Time']

# Calculate trip duration in a human-readable format (e.g., hours:minutes:seconds)
trip_summary['Duration'] = trip_summary['Finish Time'] - trip_summary['Start Time']

# Display the trip summary
print(trip_summary)
