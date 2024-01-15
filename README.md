import pandas as pd
import matplotlib.pyplot as plt

# Load your data
data = pd.read_csv('your_data.csv')  # replace with your file path

# Convert TOTALDISTANCE to numeric, if not already
data['TOTALDISTANCE'] = pd.to_numeric(data['TOTALDISTANCE'], errors='coerce')

# Define distance bins (adjust the bins according to your data's range and distribution)
bins = pd.interval_range(start=0, end=60000, freq=6000)  # Creates 10 bins from 0 to 60,000
data['Distance_Category'] = pd.cut(data['TOTALDISTANCE'], bins=bins)

# Group by Distance_Category and VID, then count unique VIDs
distance_truck_counts = data.groupby('Distance_Category')['VID'].nunique().reset_index()

# Rename columns for clarity
distance_truck_counts.columns = ['Distance_Category', 'Number_of_Trucks']


# Plotting
plt.figure(figsize=(10, 6))
plt.bar(distance_truck_counts['Distance_Category'].astype(str), distance_truck_counts['Number_of_Trucks'])

plt.xlabel('Total Distance Categories')
plt.ylabel('Number of Trucks')
plt.title('Distribution of Trucks Across Distance Categories')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
