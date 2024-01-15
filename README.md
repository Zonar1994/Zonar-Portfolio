Data Preparation and Cleaning:
My approach to handling the DAF trucks' data began with meticulous data preparation and cleaning. This involved importing data from a CSV file and carefully converting crucial columns, ensuring that 'DATETIME_STRING' was correctly formatted as datetime and 'TOTALDISTANCE' as numeric. This step was critical to establish a reliable foundation for accurate analysis.

Mapping and Visualization:
Using Folium, I developed interactive maps to visually represent the trucks' routes. This process was not just about plotting points; it involved a detailed examination of the spatial patterns of the trucks' movements, providing valuable insights into their operational routes.

Analysis (Enhanced)
Trip Summary and Distance Analysis:
In my analysis, I focused on compiling a comprehensive trip summary, grouping the data by 'TRIPID' and 'VID'. This allowed me to extract important details like trip start and finish times and to calculate the distances traveled. Understanding these aspects was crucial in identifying the most and least efficient routes.

Heatmaps and Route Visualization:
The creation of heatmaps was a significant part of my analysis, offering a clear visualization of truck location density and movement patterns. These heatmaps, when overlaid with traffic data, provided a unique perspective on the correlation between truck routes and traffic congestion.



  import pandas as pd
import matplotlib.pyplot as plt

# Load your data
data = pd.read_csv(r'your_data_file_path.csv')

# Convert 'DATETIME_STRING' to datetime and 'TOTALDISTANCE_1', 'ENGINEOILLEVEL_1' to numeric
data['DATETIME_STRING'] = pd.to_datetime(data['DATETIME_STRING'], errors='coerce')
data['TOTALDISTANCE_1'] = pd.to_numeric(data['TOTALDISTANCE_1'], errors='coerce')
data['ENGINEOILLEVEL_1'] = pd.to_numeric(data['ENGINEOILLEVEL_1'], errors='coerce')

# Filter out rows with missing values in these columns
data = data.dropna(subset=['TOTALDISTANCE_1', 'ENGINEOILLEVEL_1'])

# Group by 'YEAR', 'MONTH', and 'VID' and calculate mean oil level and total distance
monthly_summary = data.groupby(['YEAR', 'MONTH', 'VID']).agg({'ENGINEOILLEVEL_1': 'mean', 'TOTALDISTANCE_1': 'sum'}).reset_index()

# Plotting
for vid, group_data in monthly_summary.groupby('VID'):
    fig, ax1 = plt.subplots(figsize=(10, 6))

    ax1.set_xlabel('Month')
    ax1.set_ylabel('Total Distance', color='tab:blue')
    ax1.plot(group_data['MONTH'], group_data['TOTALDISTANCE_1'], color='tab:blue')
    ax1.tick_params(axis='y', labelcolor='tab:blue')

    ax2 = ax1.twinx()  
    ax2.set_ylabel('Engine Oil Level', color='tab:red')
    ax2.plot(group_data['MONTH'], group_data['ENGINEOILLEVEL_1'], color='tab:red')
    ax2.tick_params(axis='y', labelcolor='tab:red')

    plt.title(f'Health vs Distance for Truck {vid} in {group_data["YEAR"].iloc[0]}')
    plt.show()
