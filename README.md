# Separate Cell for Trip Summary by TRIPID
# Assuming 'data' is your DataFrame and it already has the necessary columns

# Ensure 'DATETIME_STRING' is in datetime format
data['DATETIME_STRING'] = pd.to_datetime(data['DATETIME_STRING'], errors='coerce', utc=True)

# Group by 'TRIPID' and aggregate the min and max of 'DATETIME_STRING'
trip_summary = data.groupby('TRIPID')['DATETIME_STRING'].agg(['min', 'max']).reset_index()

# Rename the columns for clarity
trip_summary.columns = ['TRIPID', 'Start Time', 'Finish Time']

# Display the trip summary
print(trip_summary)
